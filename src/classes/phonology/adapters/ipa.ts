import { PhoneticRule } from "../../../types";
import {  Phoneme } from "../Phoneme";
import { Selector } from "../Selector";
import { Appliable, Matcher, Validator } from "./interfaces";
import { SELECTORS } from "../SelectorsService";

export class IPAAdapter implements Validator, Matcher, Appliable {
  flavor: string = 'ipa'

  constructor() {

  }

  apply(rule: PhoneticRule, arrayOfCharacters: string[]) {
    arrayOfCharacters = ['#', ...arrayOfCharacters, '#']
    arrayOfCharacters = arrayOfCharacters.flatMap((sourceSymbol: string, idx: number, allSourceSymbols: string[]) => {
      if (
        this.symbolMatchesSelector(sourceSymbol, rule.targetPhoneme) &&
        this.validateEnvironment(rule, allSourceSymbols, idx)
      ) {
        if (rule.mapToPhoneme.split(' ').length >= 2) return rule.mapToPhoneme.split(' ') // Handles multiple phoneme replacements
        return rule.mapToPhoneme; // handles a single phoneme replacements
      } else {
        return sourceSymbol;
      }
    })
    return arrayOfCharacters.slice(1, arrayOfCharacters.length - 1);
  }
  symbolMatchesSelector(symbol: string, selector: string): boolean {
    // allows for complex selectors, using "or" relationship.
    const parts = selector.split('|');
    if (parts.length > 1) {
      return parts
        .map(p => this.symbolMatchesSelector(symbol, p))
        .some(predicateResult => predicateResult === true)
    }

    // Removes vowel stress.  Selecting by stress is not yet supported.
    let charWithoutStress;
    if (symbol[0] === 'ˌ' || symbol[0] === 'ˈ') charWithoutStress = symbol.substring(1, symbol.length)
    else charWithoutStress = symbol;

    const ph = new Phoneme(charWithoutStress);

    // console.log(`checking ${charWithoutStress} against ${selector}`, ph)

    switch (selector) {
      case SELECTORS.all.token:
        return SELECTORS.all.matches(ph);
      case SELECTORS.vowel.token:
        return SELECTORS.vowel.matches(ph);
      case SELECTORS.consonant.token:
        return SELECTORS.consonant.matches(ph);
      case SELECTORS.fricative.token:
        return SELECTORS.fricative.matches(ph);
      case SELECTORS.plosive.token:
        return SELECTORS.plosive.matches(ph);
      case SELECTORS.approximant.token:
        return SELECTORS.approximant.matches(ph);
      case SELECTORS.nasal.token:
        return SELECTORS.nasal.matches(ph);
      case SELECTORS.bilabial.token:
        return SELECTORS.bilabial.matches(ph);
      case SELECTORS.labiodental.token:
        return SELECTORS.labiodental.matches(ph);
      case SELECTORS.alveolar.token:
        return SELECTORS.alveolar.matches(ph);
      case SELECTORS.retroflex.token:
        return SELECTORS.retroflex.matches(ph);
      case SELECTORS.palatal.token:
        return SELECTORS.palatal.matches(ph);
      case SELECTORS.velar.token:
        return SELECTORS.velar.matches(ph);
      case SELECTORS.uvular.token:
        return SELECTORS.uvular.matches(ph);
      case SELECTORS.pharyngeal.token:
        return SELECTORS.pharyngeal.matches(ph);
      case SELECTORS.glottal.token:
        return SELECTORS.glottal.matches(ph);
      case SELECTORS.voiced.token:
        return SELECTORS.voiced.matches(ph);
      case SELECTORS.voiceless.token:
        return SELECTORS.voiceless.matches(ph);
      case SELECTORS.open.token:
        return SELECTORS.open.matches(ph);
      case SELECTORS.midOpen.token:
        return SELECTORS.midOpen.matches(ph);
      case SELECTORS.mid.token:
        return SELECTORS.mid.matches(ph);
      case SELECTORS.midClose.token:
        return SELECTORS.midClose.matches(ph);
      case SELECTORS.close.token:
        return SELECTORS.close.matches(ph);
      case SELECTORS.front.token:
        return SELECTORS.front.matches(ph);
      case SELECTORS.central.token:
        return SELECTORS.central.matches(ph);
      case SELECTORS.back.token:
        return SELECTORS.back.matches(ph);
      case SELECTORS.rounded.token:
        return SELECTORS.rounded.matches(ph);
      default:
        return ph.ipa.slice(0, selector.length) === selector; // this is very important, removing it breaks everything
    }
  }

  validateEnvironment(rule: PhoneticRule, symbols: string[], idx: number): boolean {
    const environmentPieces = rule.environment.split(' ');
    const environmentVariableIdx = environmentPieces.indexOf('_');
    if (environmentVariableIdx === -1) throw new Error(`Cannot parse rule environment: every rule must contain a '_' character.`);
    // check environment to left of symbol
    for (let offsetL = 0; offsetL === environmentVariableIdx - 1; offsetL++) {
      const expected = environmentPieces[offsetL];
      const actual = symbols[idx - 1 + offsetL];
      if (!this.symbolMatchesSelector(actual, expected)) return false;
    }
    for (let offsetR = 1; offsetR < environmentPieces.length - environmentVariableIdx; offsetR++) {
      const expected = environmentPieces[environmentVariableIdx + offsetR];
      const actual = symbols[idx + offsetR];
      if (!this.symbolMatchesSelector(actual, expected)) return false;
    }
    return true;
  }

}