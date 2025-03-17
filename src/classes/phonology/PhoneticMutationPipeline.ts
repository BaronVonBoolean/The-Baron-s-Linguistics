import {PhoneMap } from "../phonology/PhoneMap";
import { Word } from "../shared/word";
import { Phoneme } from "./Phoneme";

export class PhoneticMutationPipeline {

  rules: PhoneMap[];

  constructor(ruleset: PhoneMap[]) {
    this.rules = ruleset;
  }

  run(input: Word, validOutputs:Phoneme[]):Word {
    let output = input.clone();
    this.rules.forEach(rule => {
      const mutation = new PhoneMap(
        rule.environment, 
        rule.targetPhoneme, 
        rule.mapToPhoneme
      );
      output = mutation.apply(output, validOutputs);

    })
    
    return output;
  }
}