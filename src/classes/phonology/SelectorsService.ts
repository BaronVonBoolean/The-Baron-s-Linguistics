import { GenericVectors } from "./Phoneme"
import { Selector } from "./Selector"

export class SELECTORS {
  constructor() {
    throw new Error("Do not instantiate the SELECTOR class.")
  }

  static all = new Selector('*', (vectors:GenericVectors) => true)
      
  static vowel = new Selector('[vowel]', 
    (vectors:GenericVectors) => vectors[0] === 'vocalic'
  )
  static consonant = new Selector('[consonant]', 
    (vectors:GenericVectors) => vectors[0] === 'pulmonic'
  )
  static fricative = new Selector('[fricative]', 
    (vectors:GenericVectors) => vectors[1] === 'fricative'
  
  )
  static plosive = new Selector('[plosive]', 
    (vectors:GenericVectors) => vectors[1] === 'plosive'
  )
  static approximant = new Selector('[approximant]', 
    (vectors:GenericVectors) => vectors[1] === 'approximant'
  )
  
  static nasal = new Selector('[nasal]', 
    (vectors:GenericVectors) => vectors[1] === 'nasal'
  )
  
  static bilabial = new Selector('[bilabial]', 
    (vectors:GenericVectors) => vectors[2] === 'bilabial'
  )
  
  static labiodental = new Selector('[labiodental]', 
    (vectors:GenericVectors) => vectors[2] === 'labiodental'
  )

  static glottal = new Selector('[glottal]', 
    (vectors:GenericVectors) => vectors[2] === 'glottal'
  )

  static pharyngeal = new Selector('[pharyngeal]', 
    (vectors:GenericVectors) => vectors[2] === 'pharyngeal'
  )

  static uvular = new Selector('[uvular]', 
    (vectors:GenericVectors) => vectors[2] === 'uvular'
  )

  static velar = new Selector('[velar]', 
    (vectors:GenericVectors) => vectors[2] === 'velar'
  )

  static palatal = new Selector('[palatal]', 
    (vectors:GenericVectors) => vectors[2] === 'palatal'
  )

  static retroflex = new Selector('[retroflex]', 
    (vectors:GenericVectors) => vectors[2] === 'retroflex'
  )

  static alveolar = new Selector('[alveolar]', 
    (vectors:GenericVectors) => vectors[2] === 'alveolar'
  )
 // stopping point.

  static voiced = new Selector('[voiced]', 
    (vectors:GenericVectors) => vectors[3] === 'voiced'
  )
  static voiceless = new Selector('[voiceless]', 
    (vectors:GenericVectors) => vectors[3] === 'voiceless'
  )
  static open = new Selector('[open]', 
    (vectors:GenericVectors) => vectors[1] === 'open'
  )
  static midOpen = new Selector('[mid-open]', 
    (vectors:GenericVectors) => vectors[1] === 'open-mid'
  )
  static mid = new Selector('[mid]', 
    (vectors:GenericVectors) => vectors[1] === 'mid'
  )
  static midClose = new Selector('[mid-close]', 
    (vectors:GenericVectors) => vectors[1] === 'close-mid'
  )
  static close = new Selector('[close]', 
    (vectors:GenericVectors) => vectors[1] === 'close'
  )
  static front = new Selector('[front]', 
    (vectors:GenericVectors) => vectors[2] === 'front'
  )
  static central = new Selector('[central]', 
    (vectors:GenericVectors) => vectors[2] === 'central'
  )
  static back = new Selector('[back]', 
    (vectors:GenericVectors) => vectors[2] === 'back'
  )
  static rounded = new Selector('[rounded]', 
    (vectors:GenericVectors) => vectors[3] === 'rounded'
  )
  static unrounded = new Selector('[unrounded]', 
    (vectors:GenericVectors) => vectors[3] === 'unrounded'
  )
}