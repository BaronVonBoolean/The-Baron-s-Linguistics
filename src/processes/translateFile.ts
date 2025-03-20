import { Language } from "../classes/language/Language";
import { PhoneMap } from "../classes/phonology/PhoneMap";
import { FileOps } from "../classes/shared/FileOps";
import { Util } from "../classes/shared/Util";

export async function translateFile(language:Language, fileName:string) {
  const fileContentsRaw = await FileOps.loadFile(`./${fileName}.txt`);

  const mutatedFileContentsAscii = fileContentsRaw
    .split(' ')
    .map((text) => Util.removePunctuationAndNumbers(text))
    .map((text) => language.getWord(text)[0])
    .map((word) => language.mutate(`Phonology`, word)?.ascii)
    .join(' ')

  await FileOps.writeFile(`./out/artifacts/translations/${fileName}.ascii.txt`, mutatedFileContentsAscii)

  const mutatedFileContentsIpa = fileContentsRaw
    .split(' ')
    .map((text) => Util.removePunctuationAndNumbers(text))
    .map((text) => language.getWord(text)[0])
    .map((word) => language.mutate('Phonology', word)?.ipa)
    .join(' ')

  await FileOps.writeFile(`./out/artifacts/translations/${fileName}.ipa.txt`, mutatedFileContentsIpa)

}