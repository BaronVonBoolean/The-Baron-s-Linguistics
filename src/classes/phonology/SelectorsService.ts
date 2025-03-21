import { Phoneme } from "./Phoneme"
import { Selector } from "./Selector"

export class SELECTORS {
  constructor() {
    throw new Error("Do not instantiate the SELECTOR class.")
  }

  static all = new Selector('*', (vectors:string[], phoneme:Phoneme) => {
    return phoneme.ipa !== undefined;
  })
      
  static vowel = new Selector('[vowel]', 
    (vectors:string[], phoneme:Phoneme) => phoneme.category === 'vowel'
  )
  static consonant = new Selector('[consonant]', 
    (vectors:string[], phoneme:Phoneme) => phoneme.category === 'consonant'
  )
  static fricative = new Selector('[fricative]', 
    (vectors:string[]) => vectors.includes('fricative')
  
  )
  static plosive = new Selector('[plosive]', 
    (vectors:string[]) => vectors.includes('plosive')
  )
  static approximant = new Selector('[approximant]', 
    (vectors:string[]) => vectors.includes('approximant')
  )
  static trill = new Selector('[trill]', 
    (vectors:string[]) => vectors.includes('trill')
  )
  static tap = new Selector('[tap]', 
    (vectors:string[]) => vectors.includes('tap')
  )
  static nasal = new Selector('[nasal]', 
    (vectors:string[]) => vectors.includes('nasal')
  )
  static lateral = new Selector('[lateral]', 
    (vectors:string[]) => vectors.includes('lateral')
  )
  
  static bilabial = new Selector('[bilabial]', 
    (vectors:string[]) => vectors.includes('bilabial')
  )
  
  static labiodental = new Selector('[labiodental]', 
    (vectors:string[]) => vectors.includes('labiodental')
  )

  static dental = new Selector('[dental]', 
    (vectors:string[]) => vectors.includes('dental')
  )

  static postalveolar = new Selector('[postalveolar]', 
    (vectors:string[]) => vectors.includes('postalveolar')
  )

  static pharyngeal = new Selector('[pharyngeal]', 
    (vectors:string[]) => vectors.includes('pharyngeal')
  )

  static uvular = new Selector('[uvular]', 
    (vectors:string[]) => vectors.includes('uvular')
  )

  static velar = new Selector('[velar]', 
    (vectors:string[]) => vectors.includes('velar')
  )

  static palatal = new Selector('[palatal]', 
    (vectors:string[]) => vectors.includes('palatal')
  )

  static retroflex = new Selector('[retroflex]', 
    (vectors:string[]) => vectors.includes('retroflex')
  )

  static alveolar = new Selector('[alveolar]', 
    (vectors:string[]) => vectors.includes('alveolar')
  )

  static glottal = new Selector('[glottal]', 
    (vectors:string[]) => vectors.includes('glottal')
  )
 // stopping point.

  static voiced = new Selector('[voiced]', 
    (vectors:string[]) => vectors.includes('voiced')
  )
  static voiceless = new Selector('[voiceless]', 
    (vectors:string[]) => vectors.includes('voiceless')
  )
  static open = new Selector('[open]', 
    (vectors:string[]) => vectors.includes('open')
  )
  static midOpen = new Selector('[openMid]', 
    (vectors:string[]) => vectors.includes('openMid')
  )
  static mid = new Selector('[mid]', 
    (vectors:string[]) => vectors.includes('mid')
  )
  static midClose = new Selector('[closeMid]', 
    (vectors:string[]) => vectors.includes('closeMid')
  )
  static close = new Selector('[close]', 
    (vectors:string[]) => vectors.includes('close')
  )
  static front = new Selector('[front]', 
    (vectors:string[]) => vectors.includes('front')
  )
  static central = new Selector('[central]', 
    (vectors:string[]) => vectors.includes('central')
  )
  static back = new Selector('[back]', 
    (vectors:string[]) => vectors.includes('back')
  )
  static rounded = new Selector('[rounded]', 
    (vectors:string[]) => vectors.includes('rounded')
  )
  static unrounded = new Selector('[unrounded]', 
    (vectors:string[]) => vectors.includes('unrounded')
  )
  static diphthong = new Selector('[diphthong]', 
    (vectors:string[]) => vectors.includes('diphthong')
  )

  static wordBoundary = new Selector('#', 
    (vectors:string[], phoneme:Phoneme) => !phoneme
  )
}