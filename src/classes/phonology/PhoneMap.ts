import { Word } from "../shared/word";
import { Phoneme } from "./Phoneme";

export class PhoneMap {
  constructor(
    public environment: string,
    public targetPhoneme: string,
    public mapToPhoneme: string
  ) {}

  mutate(input: Phoneme, validOutputs:Phoneme[]):Phoneme {
    const target = validOutputs.find(p => p.ipa === this.targetPhoneme);
    const mapTo = validOutputs.find(p => p.ipa === this.mapToPhoneme);
    if(!target || !mapTo) {
      return input;
    }
    const output = mapTo.clone();
    return output;
  }


  apply(input: Word, allPhonemes:Phoneme[]):Word {
    const output = input.clone();
    const outputIpaParts:string[] = [];
    for(let i = 0; i < input.ipaParts.length; i++) {
      const currentIpaPart = allPhonemes.find(p => p.ipa === input.ipaParts[i]);
      if(!currentIpaPart) continue;
      if(this.matchesEnvironment(input, i)) {
        const mutated = this.mutate(currentIpaPart, allPhonemes);
        outputIpaParts.push( mutated.ipa );
      } else {
        outputIpaParts.push(currentIpaPart.ipa);
      }
    }
    output.ipaParts = outputIpaParts;

    return output;
  }

  toLine():string {
    return `${this.environment} -> ${this.targetPhoneme} : ${this.mapToPhoneme}`;
  }


  matchesEnvironment(input:Word, index:number):boolean {
    const [envLeft, envRight] = this.environment.split('_');

    if(envLeft && envRight) {
      const inputLeft = input.ipaParts[index-1];
      const inputRight = input.ipaParts[index+1];

      // handle left word boundary
      if(
        envLeft.trim() === '#' && 
        inputLeft === undefined &&
        inputRight === envRight.trim()
      ) return true;

      // handle right word boundary
      if(
        envRight.trim() === '#' && 
        inputRight === undefined &&
        inputLeft === envLeft.trim()
      ) return true;

      // handle exact match
      return (
        inputLeft === envLeft.trim() && 
        inputRight === envRight.trim()
      );
    }

    // default to false
    return false;
  }
} 