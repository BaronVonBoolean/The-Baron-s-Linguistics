import { Phoneme } from "../classes/phonology/Phoneme";


export type WordCategory = 'verb' | 'noun' | 'determiner' | 'none'

export type WordOptions = {ascii: string, ipa: string, category: WordCategory, lemmaId?: number}

export type SelectorPredicate = (vectors: string[], phoneme: Phoneme) => boolean;

export type Genera = 'vocalic' | 'pulmonic' | 'non-pulmonic' | 'boundary'
export type VowelHeight = 'close' | 'close-mid' | 'mid' | 'open-mid' | 'open' 
export type VowelFronting = 'front' | 'central' | 'back'
export type VowelRounding = 'rounded' | 'unrounded'

export type MannerOfArticulation = 'plosive' | 'nasal' | 'trill' | 'tap' | 'flap' | 'fricative' | 'lateral' | 'approximant'
export type PlaceOfArticulation = 'bilabial' | 'labiodental' | 'dental' | 'alveolar' | 'postalveolar' | 'retroflex' | 'palatal' | 'velar' | 'uvular' | 'pharyngeal' | 'glottal'
export type ConsonantVoicing = 'voiced' | 'voiceless' 

export type VowelVectors = [Genera, VowelHeight, VowelFronting, VowelRounding]
export type ConsonantVectors = [Genera, MannerOfArticulation, PlaceOfArticulation, ConsonantVoicing]
export type BoundaryVectors = ['boundary', null, null, null]
export type GenericVectors = VowelVectors | ConsonantVectors | BoundaryVectors

export type VocabLookupFilter = {
  category?: WordCategory,
  field?: 'ipa' | 'ascii'
}