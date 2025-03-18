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
}