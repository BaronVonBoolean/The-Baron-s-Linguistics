
import { Morphology } from "./classes/morphology/Morphology";
import { Phonology } from "./classes/phonology/Phonology";
import { Vocabulary } from "./classes/vocabulary/Vocabulary";
import { Language } from "./classes/language/Language"; 
import { translateFile } from "./processes/translateFile";
import { logger, logToFile } from "./classes/shared/Logger";
import { FileOps } from "./classes/shared/FileOps";

async function main() {

  // logger.stdOut = logToFile;

  let language = new Language('English');

  await language.load('/Users/ianculleton/Documents/node_projects/baron-linguistics/data/languages/english.language.txt');

  translateFile(language, 'test-input-file')

  await language.save('./out/artifacts/languages/autosave.language.txt');

}

main();