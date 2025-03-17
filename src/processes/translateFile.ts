import { Language } from "../classes/language/Language";
import { FileOps } from "../classes/shared/FileOps";

export async function translateFile(language:Language, fileName:string) {
  const fileContentsRaw = await FileOps.loadFile(`./${fileName}.txt`);

  const mutatedFileContentsAscii = fileContentsRaw
  .split(' ')
  .map((text) => language.mutate(language.phonology, language.lookup(text)[0])?.ascii)
  .join(' ')

  await FileOps.writeFile(`${fileName}.ascii.txt`, mutatedFileContentsAscii)

  const mutatedFileContentsIpa = fileContentsRaw
  .split(' ')
  .map((text) => language.mutate(language.phonology, language.lookup(text)[0])?.ipa)
  .join(' ')

  await FileOps.writeFile(`${fileName}.ipa.txt`, mutatedFileContentsIpa)

}