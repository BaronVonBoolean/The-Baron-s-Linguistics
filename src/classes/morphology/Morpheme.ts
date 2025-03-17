import { Word } from "../shared/word";
import { Util } from "../shared/Util";
import { WordCategory } from "../../types";

export type MorphemeCategory = WordCategory | 'bound'
export class Morpheme {
  ipaParts: string[];
  characteristics: string[] = [];
  category:MorphemeCategory = 'bound';
  boundTo?: Morpheme;
  modifiedBy: Morpheme[] = [];
  constructor(ipaParts: string[]) {
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

  addCharacteristics(characteristics: string[] | undefined) {
    if(!characteristics) return;
    characteristics.forEach(c => this.addCharacteristic(c))
  }

  toWord():Word {
    return new Word(-1, {
      ascii: this.ipaParts.join(' '),
      category: this.category as WordCategory,
      ipa: this.ipaParts.join(' '),
      lemmaId: -1
    })
  }

  toLine():string {
    return `${this.ipaParts.join(' ')} -> [${this.category}:${this.characteristics.join('&')}]`
  }

  static fromLine(line: string):Morpheme {
    const [ipa, coda] = line.split('->').map(s => s.trim());
    const [category, tags] = coda.split(':').map(s => s.trim());
    const tagsArray = tags.split('&').map(t => Util.removePunctuationAndNumbers(t).trim());
    console.log(tagsArray)
    const morph = new Morpheme(ipa.split(' '));
    morph.category = Util.removePunctuationAndNumbers(category) as MorphemeCategory;
    morph.addCharacteristics(tagsArray);
    return morph;
  }

  static fromWord(wrd: Word):Morpheme {
    const morph = new Morpheme(wrd.ipaParts);
    morph.category = wrd.category;
    return morph
  }
}