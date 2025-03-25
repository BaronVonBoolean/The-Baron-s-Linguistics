import { Language } from "../classes/language/Language";
import { Morphology } from "../classes/morphology/Morphology";
import { Phonology } from "../classes/phonology/Phonology";
import { Vocabulary } from "../classes/vocabulary/Vocabulary";
import { Morpheme } from "../classes/morphology/Morpheme";
import { Word } from "../classes/shared/word";
import { PhoneMap } from "../classes/phonology/PhoneMap";
import { PhoneMapPipeline } from "../classes/phonology/PhoneMapPipeline";
import { Selector } from "../classes/phonology/Selector";
import { SELECTORS } from "../classes/phonology/SelectorsService";
import { Phoneme } from "../classes/phonology/Phoneme";
import { DecomposedWord } from "../classes/shared/DecomposedWord";

declare module 'baron-linguistics' {
  export type WordCategory = 'verb' | 'noun' | 'determiner' | 'none';
  export type VocabLookupFilter = {
    category?: WordCategory,
    field?: 'ipa' | 'ascii'
  };
  export {
    Language,
    Morphology,
    Phonology,
    Vocabulary,
    Morpheme,
    Word,
    PhoneMap,
    PhoneMapPipeline,
    Phoneme,
    Selector,
    SELECTORS,
    DecomposedWord,
  };
} 