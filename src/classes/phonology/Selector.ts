import { Genera, GenericVectors, Phoneme } from "./Phoneme";

type SelectorPredicate = (vectors: GenericVectors, genera: Genera) => boolean;

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