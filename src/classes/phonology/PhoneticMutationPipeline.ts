import { PhoneticAlphabet, PhoneticAnnotation, PhoneticRule, PhoneticRuleset } from "../../types";
import { Word } from "../word";
import { PhoneticMutation } from "./PhoneticMutation";

export class PhoneticMutationPipeline {

  rules: PhoneticRuleset;
  alphabet: PhoneticAlphabet;

  constructor(ruleset: PhoneticRuleset, alphabet: PhoneticAlphabet) {
    this.rules = ruleset;
    this.alphabet = alphabet;
  }

  run(input: Word):Word {
    this.rules.forEach(rule => {
      const mutation = new PhoneticMutation(rule, this.alphabet);
      input = mutation.mutate(input);
    })
    return input;
  }
}