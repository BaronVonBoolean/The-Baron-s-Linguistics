import { PhoneticRule } from "../types";
import { compileMutations } from "./compileMutations";
import fs from 'fs/promises'
export async function compileMutationsFromDir(dirpath: string) {
      const files = await fs.readdir(dirpath);
      
      let acc:PhoneticRule[] = [];
      const firstFile = files.shift()
      if(!firstFile) throw new Error(`cannot compile a vocabulary from directory ${dirpath}: no files in directory.`)
      console.log(`loading file: ${firstFile}`)
      acc = acc.concat(await compileMutations( dirpath + '/' + firstFile));
  
      for(let file of files) {
        console.log(`loading file: ${file}`)
        acc = acc.concat(await compileMutations(dirpath + '/' + file));
      }
    
      return acc;
}