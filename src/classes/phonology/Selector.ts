import { SelectorPredicate } from "../../types";
import { Phoneme } from "./Phoneme";

export class Selector {
  token: string;
  predicate: SelectorPredicate;

  constructor(token: string, predicate:SelectorPredicate ) {
    this.token = token;
    this.predicate = predicate;
  }

  matches(p: Phoneme) {
    if(!(p instanceof Phoneme)) {
      return false;
    }
    return this.predicate(p.vectors, p);
  }

}