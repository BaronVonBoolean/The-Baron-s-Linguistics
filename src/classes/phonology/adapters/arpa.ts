import { PhoneticRule } from "../../../types";
import { Appliable, Matcher, Validator } from "./interfaces";


export class ARPAAdapter implements Validator, Matcher, Appliable {
  flavor: string = 'arpa'

  constructor() {
    
  }  

  apply(rule: PhoneticRule, arrayOfCharacters: string[]):string[] {
    arrayOfCharacters = ['#', ...arrayOfCharacters, '#']
    arrayOfCharacters = arrayOfCharacters.flatMap((sourceSymbol: string, idx: number, allSourceSymbols:string[]) => {
      if(
        this.symbolMatchesSelector(sourceSymbol, rule.targetPhoneme) &&
        this.validateEnvironment(rule, allSourceSymbols, idx)
      ) {
        if(rule.mapToPhoneme.split(' ').length >= 2) return rule.mapToPhoneme.split(' ') // Handles multiple phoneme replacements
        return rule.mapToPhoneme; // handles a single phoneme replacements
      } else {
        return sourceSymbol;
      }
    })
    return arrayOfCharacters.slice(1, arrayOfCharacters.length - 1);
  }

  symbolMatchesSelector(symbol: string, selector: string):boolean {
    if(selector.split('/').length > 1) {
      const parts = selector.split('/');
      return parts
        .map(p => this.symbolMatchesSelector(symbol, p))
        .every(predicateResult => predicateResult === true)
    }
    switch(selector) {
      case '*': 
        return true;
      case '+V':
        if(symbol === 'EL' || symbol === 'EM' || symbol === 'EN') return false;
        return ['A','E','I','O','U'].includes(symbol[0])
        case '+C':
        if(symbol === 'EL' || symbol === 'EM' || symbol === 'EN') return true;
        return !['A','E','I','O','U'].includes(symbol[0])
      default: 
        return symbol.slice(0, selector.length) === selector;
    }
  }


  validateEnvironment(rule: PhoneticRule, symbols: string[], idx: number):boolean {
    const environmentPieces = rule.environment.split(' ');
    const environmentVariableIdx = environmentPieces.indexOf('_');
    if(environmentVariableIdx === -1) throw new Error(`Cannot parse rule environment: every rule must contain a '_' character.`);
    // check environment to left of symbol
    for(let offsetL = 0; offsetL === environmentVariableIdx - 1; offsetL++ ) {
      const expected = environmentPieces[offsetL];
      const actual = symbols[idx-1 + offsetL];
      if(!this.symbolMatchesSelector(actual, expected)) return false;
    }
    for(let offsetR = 1; offsetR < environmentPieces.length - environmentVariableIdx; offsetR++ ) {
      const expected = environmentPieces[environmentVariableIdx + offsetR];
      const actual = symbols[idx + offsetR];
      if(!this.symbolMatchesSelector(actual, expected)) return false;
    }  
    return true;
  }
}