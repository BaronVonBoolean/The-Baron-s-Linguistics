import { Annotator } from "../classes/phonology/Annotator";
import { Vocabulary } from "../classes/vocabulary/Vocabulary";
import { Word } from "../classes/word";
import { PhoneticAlphabet, PhoneticAnnotation, PhoneticRuleset } from "../types";

import fs from 'fs/promises'

const ann = new Annotator(
  new Vocabulary()
);

export async function generateDictionary(glyphs:PhoneticAlphabet, dictName:string, ruleset:PhoneticRuleset):Promise<string> {

  const content = (await fs.readFile('/Users/ianculleton/Documents/node_projects/baron-phonetics/src/data/cmudict.txt', 'utf8'))
  const words = content.split('\n').map((l) => l.split(' ')[0])
  const englishWords = words

  let mutatedWords = await Promise.all(englishWords.map((word) => {
    return ann.run(word, ruleset, glyphs)
  })) as Word[];
  
  const dictStr = englishWords
  .map((w, i) => {
    if(mutatedWords[i].ascii === '') return ''
    return `${w.toLowerCase()}:${mutatedWords[i].ascii}`
  })
  .filter(row => row !== '')
  .join('\n')

  await fs.writeFile('./src/data/dictionaries/' + dictName + '.txt', dictStr, 'utf8')
  return dictStr;
}