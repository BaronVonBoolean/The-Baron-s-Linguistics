import { Language as LanguageClass } from "./classes/language/Language"; 
import { Morphology as MorphologyClass } from "./classes/morphology/Morphology";
import { Phonology as PhonologyClass } from "./classes/phonology/Phonology";
import { Vocabulary as VocabularyClass } from "./classes/vocabulary/Vocabulary";
import { Morpheme as MorphemeClass } from "./classes/morphology/Morpheme";
import { Word as WordClass } from "./classes/shared/word";
import { PhoneMap as PhoneMapClass } from "./classes/phonology/PhoneMap";
import { PhoneMapPipeline as PhoneMapPipelineClass } from "./classes/phonology/PhoneMapPipeline";
import { Selector as SelectorClass } from "./classes/phonology/Selector";
import { SELECTORS as SELECTORSClass } from "./classes/phonology/SelectorsService";
import { Phoneme as PhonemeClass } from "./classes/phonology/Phoneme";
import { DecomposedWord as DecomposedWordClass } from "./classes/shared/DecomposedWord";



export const Language = LanguageClass;
export const Morphology = MorphologyClass;
export const Phonology = PhonologyClass;
export const Vocabulary = VocabularyClass;
export const Morpheme = MorphemeClass;
export const Word = WordClass;
export const PhoneMap = PhoneMapClass;
export const PhoneMapPipeline = PhoneMapPipelineClass;
export const Phoneme = PhonemeClass;
export const Selector = SelectorClass;
export const SELECTORS = SELECTORSClass;
export const DecomposedWord = DecomposedWordClass;

// async function main() {

//   // logger.stdOut = logToFile
//   let language = new Language('English');

//   await language.load('/Users/ianculleton/Documents/node_projects/baron-linguistics/data/languages/autogen.language.txt');
//   // translateFile(language, 'test-input-file');
//   decomposeFile(language, 'test-input-file');

//   await language.save('./out/artifacts/languages/autosave.language.txt');
// }

// main();