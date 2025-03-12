export type WordCategory = 'verb' | 'noun' | 'determiner' | 'none'

export type WordOptions = {ascii: string, ipa: string, category: WordCategory, lemmaId?: number}

export class Word {
  id:number = 0;
  text: string = '';
  ascii:string = '';
  ipaParts:string[] = [];
  // arpaParts: string[] = [];
  category: WordCategory = 'none';
  lemmaId: number = -1;
  lemma?: Word;

  constructor(id:number, opts: WordOptions) {
    this.id = id;
    this.text = opts.ascii;
    this.ascii = opts.ascii;
    this.ipaParts = opts.ipa.split(' ');
    this.category = opts.category;
    if(opts.lemmaId) this.lemmaId = opts.lemmaId;
  }

  get ipa() {
    return this.ipaParts.join('')
  }

  static fromLine(line: string) {
    const parts = line.split(';');
    return new Word(Number(parts[0]), {
      ascii: parts[1], 
      ipa: parts[2], 
      category: parts[3] as WordCategory, 
      lemmaId: Number(parts[4])
    })
  }

  toLine():string {
    return `${this.id};${this.ascii};${this.ipaParts.join(' ')};${this.category};${(this.lemma ? this.lemma.id : '-1')}`
  }
}