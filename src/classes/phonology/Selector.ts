import { Genera, GenericVectors, SelectorPredicate } from "../../types";
import { Phoneme } from "./Phoneme";

export class Selector {
  token: string;
  predicate: SelectorPredicate;

  constructor(token: string, predicate:SelectorPredicate ) {
    this.token = token;
    this.predicate = predicate;
  }

  matches(p: Phoneme) {
    return this.predicate(p.vectorize(), p.genera);
  }

}