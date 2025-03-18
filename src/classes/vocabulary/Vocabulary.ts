import { Word } from "../shared/word";
import { VocabLookupFilter, WordCategory } from "../../types";
import fs from 'fs/promises'
import { FileOps } from "../shared/FileOps";
import { logger } from "../shared/Logger";
import ConfigOps from "../shared/ConfigOps";

export class Vocabulary {
  words: Word[] = [];
  curIdx: number = 1;

  loadWordsFromString(str:string) {
    str.split('\n').forEach(line => {
      const word = FileOps.parseVocabularyLine(line);
      if(word) {
        this.words.push(word);
        word.lemma = this.lemmaFor(word);
        this.curIdx++;
      }
    })
  }
  async loadWordsFromDir(dirpath: string):Promise<void> {
    logger.log(`loading words from: ${dirpath}`, Vocabulary);
    const words = await FileOps.loadDataClassFromDir(dirpath, 'vocabulary');
    words.forEach((word:Word, idx:number) => {
      this.words.push(word);
      word.lemma = this.lemmaFor(word);
      this.curIdx++;
    });
    return;
  }
  async loadFromFile(fp: string):Promise<void> {
    const words = await FileOps.loadDataClassFromFile(fp, 'vocabulary');
    words.forEach((word:Word, idx:number) => {
      this.words.push(word);
      word.lemma = this.lemmaFor(word);
      this.curIdx++;
    });
    return
  }
  async writeToFile(fp: string):Promise<void> {
    const formatted = this.words.map(w => w.toLine()).join('\n');
    await fs.writeFile(fp, formatted, 'utf-8');
    return
  }

  _lookupIsEmpty(asciiKey:string) {
    if(asciiKey === '' || asciiKey === ' ') {
      logger.log(`Lookup on empty string.  Skipping.`, this.constructor);
      return false;
    }
    return true;
  }

  _lookupNotFound(lookupResults:Word[], asciiKey:string) {
    if (lookupResults.length === 0) {
      logger.log(`Word ${asciiKey} not found in dictionary.`, this.constructor);
      FileOps.appendFile(
        `${ConfigOps.getFileCacheFilepath()}/error_words.txt`, 
        asciiKey.toLowerCase() + '\n'
      )
      return true;
    }
    return false;
  }
  lookup(asciiKey:string, filters:VocabLookupFilter={}):Word[] { // using an array for storage so lookup time is caca.
    logger.log(`lookup "${asciiKey}" in vocabulary.`, this.constructor);
    if(!this._lookupIsEmpty(asciiKey)) return []

    let found = this.words.filter(w => w.text === asciiKey.toLowerCase());
    if(this._lookupNotFound(found, asciiKey)) return []
    
    if (filters && filters.category) found = found.filter(w => w.category === filters.category)
    return found;
  }

  addWord(wrd:Word) {
    logger.log(`adding word "${wrd.ascii}" to vocabulary.`, this.constructor);
    if(!wrd.id) wrd.id = this.curIdx++;
    if(this.words.map(w => w.id).includes(wrd.id)) throw new Error(`ID collision trying to add word "${wrd.ascii}"`)
    this.words.push(wrd);
    wrd.lemma = this.lemmaFor(wrd);
  }

  updateWord(newWord:Word) {
    logger.log(`updating word "${newWord.text}" to ${newWord.ascii}.`, this.constructor);
    this.removeWordById(newWord.id);
    this.addWord(newWord)
  }

  lemmaFor(word:Word):Word {
    logger.log(`finding lemma for word "${word.ascii}"`, this.constructor);

    if(word.lemma instanceof Word) return word.lemma
    const lemmaId = word.lemmaId;

    if(lemmaId === -1) return word;
    else return this.words.filter(w => w.id === lemmaId)[0]
  }

  removeWord(ascii:string) {
    logger.log(`removing word "${ascii}" from vocabulary.`, this.constructor);

    const word = this.lookup(ascii);
    const idx = this.words.indexOf(word[0]);
    this.words = [...this.words.slice(0, idx), ...this.words.slice(idx+1, this.words.length)]
  }

  removeWordById(id:number) {
    logger.log(`removing word with id ${id} from vocabulary.`, this.constructor);
    const word = this.words.filter(w => w.id === id);
    const idx = this.words.indexOf(word[0]);
    this.words = [...this.words.slice(0, idx), ...this.words.slice(idx+1, this.words.length)]
  }

  replaceWord(wordToRemove: Word, wordToInsert:Word) {
    logger.log(`replacing word "${wordToRemove.ascii}" with "${wordToInsert.ascii}" in vocabulary.`, this.constructor);
    this.removeWordById(wordToRemove.id);
    this.addWord(wordToInsert);
  }

  concat(v2:Vocabulary) {
    logger.log(`concatenating vocabulary with ${v2.words.length} words.`, this.constructor);
    const vConcat = new Vocabulary();

    this.words.forEach(w => vConcat.addWord(w))
    v2.words.forEach(w => vConcat.addWord(w))

    return vConcat;
  }

  async toTable():Promise<string>  {
    return this.words.map(w => w.toLine()).join('\n');
  }
}