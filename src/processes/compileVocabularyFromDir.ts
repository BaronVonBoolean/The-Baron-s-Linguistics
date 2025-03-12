import fs from 'fs/promises'
import { Vocabulary } from '../classes/vocabulary/Vocabulary';

export async function compileVocabularyFromDir(dirpath:string):Promise<Vocabulary> {
    const files = await fs.readdir(dirpath);
    
    let vAccumulator = new Vocabulary();
    const firstFile = files.shift()
    if(!firstFile) throw new Error(`cannot compile a vocabulary from directory ${dirpath}: no files in directory.`)
    console.log(`loading file: ${firstFile}`)
    await vAccumulator.loadFromFile(dirpath + '/' + firstFile)

    for(let file of files) {
      console.log(`loading file: ${file}`)
      const vCurrent = new Vocabulary();
      await vCurrent.loadFromFile(dirpath + '/' + file);
      vAccumulator = vAccumulator.concat(vCurrent);
    }

    await vAccumulator.writeToFile('/Users/ianculleton/Documents/node_projects/baron-linguistics/data/dictionary.output.txt')
    return vAccumulator;
}