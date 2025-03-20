import { Word } from "../shared/word";
import { Phoneme } from "./Phoneme";
import { Selector } from "./Selector";
import { SELECTORS } from "./SelectorsService";

export class PhoneMap {

  constructor(
    public id: number,
    public environment: string,
    public targetPhoneme: string,
    public mapToPhoneme: string,
  ) {}

  clone():PhoneMap {
    return new PhoneMap(
      this.id,
      this.environment, 
      this.targetPhoneme, 
      this.mapToPhoneme,
    );
  }

  mutate(input: Phoneme, validOutputs:Phoneme[]):Phoneme {
    const target = validOutputs.find(p => p.ipa === this.targetPhoneme);
    const mapTo = validOutputs.find(p => p.ipa === this.mapToPhoneme);
    if(!target || !mapTo) {
      return input;
    }
    const output = mapTo.clone();
    return output;
  }


  apply(input: Word, allPhonemes:Phoneme[]):Word {
    const output = input.clone();
    const outputIpaParts:string[] = [];
    for(let i = 0; i < input.ipaParts.length; i++) {
      const currentIpaPart = allPhonemes.find(p => p.ipa === input.ipaParts[i]);
      if(!currentIpaPart) continue;
      if(this.matchesEnvironment(input, i, allPhonemes)) {
        const mutated = this.mutate(currentIpaPart, allPhonemes);

        outputIpaParts.push( mutated.ipa );
      } else {
        outputIpaParts.push(currentIpaPart.ipa);
      }
    }
    output.ipaParts = outputIpaParts;

    return output;
  }

  toLine():string {
    return `${this.environment} -> ${this.targetPhoneme} : ${this.mapToPhoneme}`;
  }


  matchesEnvironment(input:Word, index:number, validPhonemes:Phoneme[]):boolean {
    const [envLeft, envRight] = this.environment.split('_').map(s => s.trim());

    if(envLeft && envRight) {
      const inputLeft = validPhonemes.filter(p => p.ipa === input.ipaParts[index-1])[0] || '#';
      const inputCenter = validPhonemes.filter(p => p.ipa === input.ipaParts[index])[0] || '#';
      const inputRight = validPhonemes.filter(p => p.ipa === input.ipaParts[index+1])[0] || '#';

      let matchLeft = inputLeft.ipa === envLeft;
      let matchRight = inputRight.ipa === envRight;
      let matchEnv = inputCenter.ipa === this.targetPhoneme;
      const selectorMatchesVector = (selector:Selector) => {
        if(selector.token === envLeft ) matchLeft = true;
        if(selector.token === envRight) matchRight = true;
        if(selector.token === this.targetPhoneme) matchEnv = true;
      }
      
      selectorMatchesVector(SELECTORS.all);
      selectorMatchesVector(SELECTORS.vowel);
      selectorMatchesVector(SELECTORS.consonant);
      selectorMatchesVector(SELECTORS.fricative);
      selectorMatchesVector(SELECTORS.plosive);
      selectorMatchesVector(SELECTORS.approximant);
      selectorMatchesVector(SELECTORS.nasal);
      selectorMatchesVector(SELECTORS.bilabial);
      selectorMatchesVector(SELECTORS.labiodental);
      selectorMatchesVector(SELECTORS.pharyngeal);
      selectorMatchesVector(SELECTORS.uvular);
      selectorMatchesVector(SELECTORS.velar);
      selectorMatchesVector(SELECTORS.palatal);
      selectorMatchesVector(SELECTORS.retroflex);
      selectorMatchesVector(SELECTORS.alveolar);
      selectorMatchesVector(SELECTORS.voiced);
      selectorMatchesVector(SELECTORS.voiceless);
      selectorMatchesVector(SELECTORS.open);
      selectorMatchesVector(SELECTORS.midOpen);
      selectorMatchesVector(SELECTORS.mid);
      selectorMatchesVector(SELECTORS.midClose);
      selectorMatchesVector(SELECTORS.close);
      selectorMatchesVector(SELECTORS.front);
      selectorMatchesVector(SELECTORS.central);
      selectorMatchesVector(SELECTORS.back);
      selectorMatchesVector(SELECTORS.rounded);
      selectorMatchesVector(SELECTORS.unrounded);
      selectorMatchesVector(SELECTORS.diphthong);
      selectorMatchesVector(SELECTORS.trill);
      selectorMatchesVector(SELECTORS.tap);
      selectorMatchesVector(SELECTORS.lateral);
      selectorMatchesVector(SELECTORS.dental);
      selectorMatchesVector(SELECTORS.postalveolar);
      selectorMatchesVector(SELECTORS.glottal);
      
      return matchLeft && matchRight && matchEnv;
    }

    // default to false
    return false;
  }
} 