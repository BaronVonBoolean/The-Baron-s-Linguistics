import * as fs from 'fs/promises';
import { Phoneme } from "./Phoneme";
import { Word } from "../shared/word";
import { PhoneticMutationPipeline } from "./PhoneticMutationPipeline";
import { FileOps } from "../shared/FileOps";
import { logger } from "../shared/Logger";
import { PhoneMap } from "./PhoneMap";
export class Phonology {
  mutations: PhoneMap[] = [];
  phonemes: Phoneme[] = [];
  constructor() {  }

  addPhoneme(phoneme: Phoneme) {
    this.phonemes.push(phoneme);
  }

  addPhoneMap(phoneMap: PhoneMap) {
    this.mutations.push(phoneMap);
  }
  loadPhonemesFromString(str:string) {
    str.split('\n').forEach(line => {
      const phoneme = FileOps.parsePhonemeLine(line);
      if(phoneme) this.addPhoneme(phoneme);
    })
  }

  loadPhoneMapsFromString(str:string) {
    str.split('\n').forEach(line => {
      const phoneMap = FileOps.parseMutationLine(line);
      if(phoneMap) this.addPhoneMap(phoneMap);
    })
  }

  async loadPhonemesFromDir(dirpath: string):Promise<Phoneme[]> {
    logger.log(`loading phonemes from: ${dirpath}`, Phonology);
    const phonemes = await FileOps.loadDataClassFromDir(dirpath, 'phonology');
    phonemes.forEach(p => this.addPhoneme(p));
    return phonemes;
  }

  async loadPhoneMapsFromDir(dirpath: string):Promise<PhoneMap[]> {
    logger.log(`loading mutations from: ${dirpath}`, Phonology);
    const phoneMaps = await FileOps.loadDataClassFromDir(dirpath, 'phonemap');
    phoneMaps.forEach(p => this.addPhoneMap(p));
    return phoneMaps;
  }

  async loadPhonemesFromFile(filepath: string):Promise<Phoneme[]> {
    const phonemes = await FileOps.loadDataClassFromFile(filepath, 'phonology');
    phonemes.forEach(p => this.addPhoneme(p));
    return phonemes;
  } 

  async loadMutationsFromFile(filepath: string):Promise<PhoneMap[]>  {
    const phoneMaps = await FileOps.loadDataClassFromFile(filepath, 'phonemap');
    phoneMaps.forEach(p => this.addPhoneMap(p));
    return phoneMaps;
  }

  decompose(word:Word):Phoneme[] {
    logger.log(`decomposing word "${word.ascii}" into phonemes.`, this.constructor);
    const phonemes:Phoneme[] = [];
    for(let i = 0; i < word.ipaParts.length; i++) {
      const currentIpaPart = word.ipaParts[i];
      const phoneme = this.phonemes.find(p => p.ipa === currentIpaPart);
      if(phoneme) phonemes.push(phoneme.clone());
    }
    return [...phonemes];
  }


  mutate(input: Word, mutations:PhoneMap[]):Word {
    logger.log(`mutating word "${input.ascii}" with ${mutations.length} phonetic rules.`, this.constructor);
    const pipeline:PhoneticMutationPipeline = new PhoneticMutationPipeline(mutations);
    const mutated:Word = pipeline.run(input, this.phonemes);
    const mutatedPhonemes:Phoneme[] = this.decompose(mutated);
    mutated.ascii = mutatedPhonemes.map(p => p.ascii).join('');
    return mutated;
  }

  async toTable():Promise<string> {
    const parts = [
      '### PHONEMES',
      this.phonemes.map(p => p.toLine()).join('\n'),
      '### MUTATIONS',
      this.mutations.map(m => m.toLine()).join('\n'),
    ]
    return parts.join('\n');
  }
}