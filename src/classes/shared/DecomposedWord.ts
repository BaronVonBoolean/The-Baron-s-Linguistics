import { WordOptions } from "../../types";
import { Morpheme } from "../morphology/Morpheme";
import { Phoneme } from "../phonology/Phoneme";
import { Word } from "./word";

export class DecomposedWord extends Word {

  public phonemes: Phoneme[] = [];
  public morphemes: Morpheme[] = [];
  
  constructor(id:number, opts: WordOptions) {
    super(id, opts);
  }

  override toLine():string {
    const phonemes = this.phonemes.map((p) => p.ipa).join('')
    const morphemes = this.morphemes.map((m) => m.ipaParts.join('')).join('.')
    const characteristics = this.morphemes.map((m) => m.characteristics.join(' ')).join(' ');
    const lemma = this.lemma ? this.lemma.ascii : '';
    // const header =  word?.id + ';' +  word?.ascii + ' /'+ phonemes + '/ (' + word?.category + ', ' + characteristics + ')'
    const header = `${this.id};\t${this.ascii} /${phonemes}/ (${this.category}${characteristics}) [${morphemes}] ${lemma}`
    return header + ''
  }
}