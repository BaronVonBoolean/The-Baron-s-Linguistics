import { Word, WordCategory } from "../word";

type MorphemeCategory = WordCategory | 'bound'
export class Morpheme {
  ascii: string;
  ipaParts: string[];
  characteristics: string[] = [];
  category:MorphemeCategory = 'bound';
  boundTo?: Morpheme;
  modifiedBy: Morpheme[] = [];
  constructor(ascii:string, ipaParts: string[]) {
    this.ascii = ascii
    this.ipaParts = ipaParts;
  }

  bindTo(morph: Morpheme) {
    this.boundTo = morph;
  }

  unbind() {
    this.boundTo = undefined;
  }

  modifyWith(morph: Morpheme) {
    this.modifiedBy.push(morph);
  }

  unmodify(morph: Morpheme) {
    this.modifiedBy = this.modifiedBy.filter(mod => mod !== morph);
  }

  addCharacteristic(characteristic: string) {
    this.characteristics.push(characteristic)
  }

  addCharacteristics(characteristics: string[]) {
    characteristics.forEach(c => this.addCharacteristic(c))
  }

  static fromWord(wrd: Word):Morpheme {
    const morph = new Morpheme(wrd.ascii,wrd.ipaParts);
    morph.category = wrd.category;
    return morph
  }
}