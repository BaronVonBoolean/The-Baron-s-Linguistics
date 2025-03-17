import fs from 'fs/promises'
import { Vocabulary } from '../classes/vocabulary/Vocabulary';
import { Phonology } from '../classes/phonology/Phonology';

export async function compilePhonemesFromDir(dirpath:string, phonology:Phonology):Promise<Phonology> {
    const files = await fs.readdir(dirpath);
  
    for(let file of files) {
      await phonology.loadPhonemesFromFile(dirpath + '/' + file);
    }
    return phonology;
}