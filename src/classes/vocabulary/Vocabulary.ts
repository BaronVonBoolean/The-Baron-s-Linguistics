import { Word, WordCategory } from "../word";
import fs from 'fs/promises'

export type VocabLookupFilter = {
  category?: WordCategory
}
export class Vocabulary {
  words: Word[] = [];
  curIdx: number = 1;

  async loadFromFile(fp: string):Promise<void> {
    const contents = await fs.readFile(fp, 'utf-8');
    const lines = contents.split('\n');
    lines.forEach((line, idx) => {
      if(line.split(';').length !== 5) return;
      const wrd = Word.fromLine(line);
      this.words.push(wrd);
      wrd.lemma = this.lemmaFor(wrd);
      this.curIdx++;
    });
    return
  }

  async writeToFile(fp: string):Promise<void> {
    const formatted = this.words.map(w => w.toLine()).join('\n');
    await fs.writeFile(fp, formatted, 'utf-8');
    return
  }

  lookup(asciiKey:string, filters:VocabLookupFilter={}):Word[] { // using an array for storage so lookup time is caca.
    let found = this.words.filter(w => w.text === asciiKey.toLowerCase());
    if(asciiKey === '' || asciiKey === ' ') {
      // console.warn(`Lookup on empty string.  Skipping.`);
      return []
    }
    if (found.length === 0) {
      fs.appendFile('./error_words.txt', asciiKey.toLowerCase() + '\n', 'utf-8')
      throw new Error(`Word ${asciiKey} not found in dictionary`);
    }
    if (filters && filters.category) found = found.filter(w => w.category === filters.category)
    return found;
  }

  addWord(wrd:Word) {
    wrd.id = this.curIdx++;
    this.words.push(wrd);
  }

  lemmaFor(word:Word):Word {
    if(word.lemma instanceof Word) return word.lemma
    const lemmaId = word.lemmaId;

    if(lemmaId === -1) return word;
    else return this.words.filter(w => w.id === lemmaId)[0]
  }

  removeWord(ascii:string) {
    const word = this.lookup(ascii);
    const idx = this.words.indexOf(word[0]);
    this.words = [...this.words.slice(0, idx), ...this.words.slice(idx+1, this.words.length)]
  }

  removeWordById(id:number) {
    const word = this.words.filter(w => w.id === id);
    const idx = this.words.indexOf(word[0]);
    this.words = [...this.words.slice(0, idx), ...this.words.slice(idx+1, this.words.length)]
    console.log(this.words.length)

  }

  replaceWord(wordToRemove: Word, wordToInsert:Word) {
    this.removeWordById(wordToRemove.id);
    this.addWord(wordToInsert);
  }

  concat(v2:Vocabulary) {
    const vConcat = new Vocabulary();

    this.words.forEach(w => vConcat.addWord(w))
    v2.words.forEach(w => vConcat.addWord(w))

    return vConcat;
  }
}