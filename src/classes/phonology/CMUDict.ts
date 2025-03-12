import * as fs from 'fs';

export class CMUDict {

  dictPath: string;
  loaded: boolean = false;
  byText: {[x:string]: string[]} = {};
  onLoad: Promise<boolean>;
  constructor(dictPath: string) {
    this.dictPath = dictPath;
    this.onLoad = new Promise((resolve, reject) => {
      fs.readFile(this.dictPath, 'utf8', (err, data) => {
        if(err) reject(err);
        const lines = data.split('\n');
        for(let line of lines) {
          const [word, ...phones] = line.split(' ').filter(p => p !== '')
          this.byText[word] = phones;
        }
        this.loaded = true;
        resolve(this.loaded);
      })
    })

  }

  convert(word: string): string[] {
    word = word.toUpperCase();
    if(word === '' || word === '\n') return [];
    if(this.byText[word] === undefined) {
      throw new Error(`${word} is not a word contained in the CMU Dictionary`)
    }
    const phonemes = this.byText[word].slice();
    return phonemes;
  }
  
}