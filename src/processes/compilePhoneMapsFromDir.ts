import fs from 'fs/promises'
import { Vocabulary } from '../classes/vocabulary/Vocabulary';
import { Phonology } from '../classes/phonology/Phonology';

export async function compilePhoneMapsFromDir(dirpath:string, phonology:Phonology):Promise<Phonology> {
    const files = await fs.readdir(dirpath);
  
    for(let file of files) {
      await phonology.loadMutationsFromFile(dirpath + '/' + file);
    }
    return phonology;
}