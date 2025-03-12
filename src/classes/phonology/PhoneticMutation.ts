import { PhoneticAlphabet, PhoneticRule } from "../../types";
import { Word } from "../word";
import { IPAAdapter } from "./adapters/ipa";
export class PhoneticMutation {

  rule: PhoneticRule;
  alphabet: PhoneticAlphabet;

  constructor(rule: PhoneticRule, alphabet: PhoneticAlphabet) {
    this.rule = rule;
    this.alphabet = alphabet;
  }

  toString():string {
    return `${this.rule.targetPhoneme} -> ${this.rule.mapToPhoneme} : ${this.rule.environment}`
  } 

  mutate(input: Word):Word {
    const output = new Word(input.id, {
      ascii: input.ascii, 
      ipa: input.ipaParts.join(' '), 
      category: input.category, 
      lemmaId: input.lemmaId
    });
    if(this.alphabet === 'ipa') {
      const adapter = new IPAAdapter();
      output.ipaParts = adapter.apply(this.rule, output.ipaParts)
    }
    return output;
  }

}