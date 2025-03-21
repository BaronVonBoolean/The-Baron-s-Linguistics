
type PhonemeProps = {
  id: number;
  ipa: string;
  ascii: string;
  category: string;
  vectors: string;
}

export class Phoneme {
  id: number;
  ipa: string;
  ascii: string;
  category: string;
  vectors: string[];

  constructor({
    id,
    ipa,
    ascii,
    category,
    vectors
  }:PhonemeProps) {
    this.id = id;
    this.ipa = ipa;
    this.ascii = ascii;
    this.category = category;
    this.vectors = vectors.substring(1, vectors.length - 1).split('&');
    if(vectors === '[]') this.vectors = [];
  }

  clone():Phoneme {
    return new Phoneme({
      id: this.id,
      ipa: this.ipa,
      ascii: this.ascii,
      category: this.category,
      vectors: `[${this.vectors.join('&')}]`
    });
  }

  static fromLine(line:string):Phoneme | null {
    const [id, ipa, ascii, category, vectors] = line.split(';');
    if(!id || !ipa || !ascii || !category || !vectors) return null;
    return new Phoneme({
      id: parseInt(id),
      ipa,
      ascii,
      category,
      vectors
    });
  }

  toLine():string {
    return `${this.id};${this.ipa};${this.ascii};${this.category};[${this.vectors.join('&')}]`;
  }
} 