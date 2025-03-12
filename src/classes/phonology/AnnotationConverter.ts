import fs from 'fs/promises'
import { PhoneticAnnotation } from '../../types'
import { CMUDict } from './CMUDict'
import { Util } from './Util'
import { Word } from '../word'

export class AnnotationConverter {
  arpaToIpa: {[x:string]: string} = { }
  ipaToArpa: {[x:string]: string} = { }

  asciiToIpa: {[x:string]: string} = { }
  ipaToAscii: {[x:string]: string} = { }

  // NOT IMPLEMENTED YET!
  // asciiToArpa: {[x:string]: string} = { }
  // arpaToAscii: {[x:string]: string} = { } 

  loaded: boolean = false;
  onLoad: Promise<boolean>;

  constructor(arpa2ipaDict:string, ipa2asciiDict: string) {

    const arpaLoaded = fs.readFile(arpa2ipaDict, 'utf8')
    .then(raw => raw.split('\n'))
    .then(lines => {
      for(let line of lines) {
        const [arpa, ipa] = line.split(':');
        this.arpaToIpa[arpa] = ipa;
        this.ipaToArpa[ipa] = arpa;
      }
      this.loaded = true;
    })

    const asciiLoaded = fs.readFile(ipa2asciiDict, 'utf8')
    .then(raw => raw.split('\n'))
    .then(lines => {
      for(let line of lines) {
        let [ascii, ipa] = line.split(':');
        this.asciiToIpa[ipa] = ascii;
        this.ipaToAscii[ascii] = ipa;
      }
      this.loaded = true;
    })

    this.onLoad = Promise.all([arpaLoaded, asciiLoaded])
    .then(() => this.loaded)
    .catch(() => false);

  }

  makeAnnotation(dictionary: CMUDict, input: string):PhoneticAnnotation {
    let cleanInput = Util.removePunctuationAndNumbers(input).toLowerCase();
    let arpified;
    let word:Word
    try {
      arpified = dictionary.convert(cleanInput);
    } catch(e) {
      const blanketyblank = new Array(input.length).fill('_');
      return {
        text: blanketyblank.join(''),
        arpa: blanketyblank,
        ipa: blanketyblank,
        ascii: blanketyblank
      }
    }

    const ipaish = this.arpa2ipa(arpified);
    const ascii = this.ipa2ascii(ipaish);
    return {
      text: cleanInput,
      arpa: arpified,
      ipa: ipaish,
      ascii
    }
}
  
  arpa2ipa(arpaWord: string[]):string[] {
    return arpaWord.map(sym => {
      return this.arpaToIpa[sym];
    })
  }

  ipa2arpa(ipaWord: string[]):string[] {
    return ipaWord.map(sym => {
      return this.ipaToArpa[sym];
    })
  }

  ipa2ascii(ipaWord: string[]):string[] {
    const ipaWordWithoutStress = ipaWord.map((ipaChar) => {
      if(ipaChar[0] === 'ˈ' || ipaChar[0] === 'ˌ') {
        return ipaChar.substring(1, ipaChar.length);
      }
      return ipaChar;
    });
    return ipaWordWithoutStress.filter(s => s !== '').map(sym => {
      const mappedSymbol = this.ipaToAscii[sym];
      if(!mappedSymbol && sym !== '_') console.warn(`cannot map IPA symbol /${sym}/ : ${sym} is not in the specified IPA dictionary.`)
      if(!mappedSymbol) return '_'
      return mappedSymbol;
    })
  }

  syncToIpa(unsynced: Word):void {
    // unsynced.arpa = this.ipa2arpa(unsynced.ipa);
    unsynced.ascii = this.ipa2ascii(unsynced.ipaParts).join('');
  }
}