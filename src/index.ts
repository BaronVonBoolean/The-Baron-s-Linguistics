
import { Language } from "./classes/language/Language"; 
import { decomposeFile } from "./processes/decomposeFile";
import { translateFile } from "./processes/translateFile";

async function main() {

  // logger.stdOut = logToFile;

  let language = new Language('English');

  await language.load('/Users/ianculleton/Documents/node_projects/baron-linguistics/data/languages/autogen.language.txt');
 
  // translateFile(language, 'test-input-file');
  decomposeFile(language, 'test-input-file');

  await language.save('./out/artifacts/languages/autosave.language.txt');

}

main();