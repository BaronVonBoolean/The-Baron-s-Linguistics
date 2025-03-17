import fs from 'fs/promises'
import { Vocabulary } from '../classes/vocabulary/Vocabulary';

export async function compileVocabularyFromDir(dirpath:string, vocab:Vocabulary):Promise<Vocabulary> {
    const files = await fs.readdir(dirpath);
  
    for(let file of files) {
      await vocab.loadFromFile(dirpath + '/' + file);
    }
    return vocab;
}