import { Language } from "../classes/language/Language";
import { FileOps } from "../classes/shared/FileOps";
import { logger } from "../classes/shared/Logger";
import { Util } from "../classes/shared/Util";

export async function decomposeFile(language:Language, fileName:string) {
  const fileContentsRaw = await FileOps.loadFile(`./${fileName}.txt`);
  const decomposedWords = fileContentsRaw
    .split(' ')
    .map((text) => Util.removePunctuationAndNumbers(text))
    .map((text) => language.getWord(text)[0])
    .map((word) => language.decompose(word))

  const decomposedWordsString = decomposedWords
  .filter((word) => word?.id !== undefined)
  .map((word) => word?.toLine()).join('\n')

  logger.log(decomposedWordsString, FileOps);

  return decomposedWords
}