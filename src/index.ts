import { Language } from "./classes/language/Language"; 
import { decomposeFile } from "./processes/decomposeFile";
import { translateFile } from "./processes/translateFile";
import { Morphology } from "./classes/morphology/Morphology";
import { Phonology } from "./classes/phonology/Phonology";
import { Vocabulary } from "./classes/vocabulary/Vocabulary";
import { Morpheme } from "./classes/morphology/Morpheme";
import { Word } from "./classes/shared/word";
import { PhoneMap } from "./classes/phonology/PhoneMap";
import { PhoneMapPipeline } from "./classes/phonology/PhoneMapPipeline";
import { Selector } from "./classes/phonology/Selector";
import { SELECTORS } from "./classes/phonology/SelectorsService";
import { Phoneme } from "./classes/phonology/Phoneme";
import { DecomposedWord } from "./classes/shared/DecomposedWord";

export default { 
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

async function main() {

  // logger.stdOut = logToFile
  let language = new Language('English');

  await language.load('/Users/ianculleton/Documents/node_projects/baron-linguistics/data/languages/autogen.language.txt');
  // translateFile(language, 'test-input-file');
  decomposeFile(language, 'test-input-file');

  await language.save('./out/artifacts/languages/autosave.language.txt');
}

// main();