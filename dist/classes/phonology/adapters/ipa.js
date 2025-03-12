"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPAAdapter = void 0;
const Phoneme_1 = require("../Phoneme");
const SelectorsService_1 = require("../SelectorsService");
class IPAAdapter {
    constructor() {
        this.flavor = 'ipa';
    }
    apply(rule, arrayOfCharacters) {
        arrayOfCharacters = ['#', ...arrayOfCharacters, '#'];
        arrayOfCharacters = arrayOfCharacters.flatMap((sourceSymbol, idx, allSourceSymbols) => {
            if (this.symbolMatchesSelector(sourceSymbol, rule.targetPhoneme) &&
                this.validateEnvironment(rule, allSourceSymbols, idx)) {
                if (rule.mapToPhoneme.split(' ').length >= 2)
                    return rule.mapToPhoneme.split(' '); // Handles multiple phoneme replacements
                return rule.mapToPhoneme; // handles a single phoneme replacements
            }
            else {
                return sourceSymbol;
            }
        });
        return arrayOfCharacters.slice(1, arrayOfCharacters.length - 1);
    }
    symbolMatchesSelector(symbol, selector) {
        // allows for complex selectors, using "or" relationship.
        const parts = selector.split('|');
        if (parts.length > 1) {
            return parts
                .map(p => this.symbolMatchesSelector(symbol, p))
                .some(predicateResult => predicateResult === true);
        }
        // Removes vowel stress.  Selecting by stress is not yet supported.
        let charWithoutStress;
        if (symbol[0] === 'ˌ' || symbol[0] === 'ˈ')
            charWithoutStress = symbol.substring(1, symbol.length);
        else
            charWithoutStress = symbol;
        const ph = new Phoneme_1.Phoneme(charWithoutStress);
        // console.log(`checking ${charWithoutStress} against ${selector}`, ph)
        switch (selector) {
            case SelectorsService_1.SELECTORS.all.token:
                return SelectorsService_1.SELECTORS.all.matches(ph);
            case SelectorsService_1.SELECTORS.vowel.token:
                return SelectorsService_1.SELECTORS.vowel.matches(ph);
            case SelectorsService_1.SELECTORS.consonant.token:
                return SelectorsService_1.SELECTORS.consonant.matches(ph);
            case SelectorsService_1.SELECTORS.fricative.token:
                return SelectorsService_1.SELECTORS.fricative.matches(ph);
            case SelectorsService_1.SELECTORS.plosive.token:
                return SelectorsService_1.SELECTORS.plosive.matches(ph);
            case SelectorsService_1.SELECTORS.approximant.token:
                return SelectorsService_1.SELECTORS.approximant.matches(ph);
            case SelectorsService_1.SELECTORS.nasal.token:
                return SelectorsService_1.SELECTORS.nasal.matches(ph);
            case SelectorsService_1.SELECTORS.bilabial.token:
                return SelectorsService_1.SELECTORS.bilabial.matches(ph);
            case SelectorsService_1.SELECTORS.labiodental.token:
                return SelectorsService_1.SELECTORS.labiodental.matches(ph);
            case SelectorsService_1.SELECTORS.alveolar.token:
                return SelectorsService_1.SELECTORS.alveolar.matches(ph);
            case SelectorsService_1.SELECTORS.retroflex.token:
                return SelectorsService_1.SELECTORS.retroflex.matches(ph);
            case SelectorsService_1.SELECTORS.palatal.token:
                return SelectorsService_1.SELECTORS.palatal.matches(ph);
            case SelectorsService_1.SELECTORS.velar.token:
                return SelectorsService_1.SELECTORS.velar.matches(ph);
            case SelectorsService_1.SELECTORS.uvular.token:
                return SelectorsService_1.SELECTORS.uvular.matches(ph);
            case SelectorsService_1.SELECTORS.pharyngeal.token:
                return SelectorsService_1.SELECTORS.pharyngeal.matches(ph);
            case SelectorsService_1.SELECTORS.glottal.token:
                return SelectorsService_1.SELECTORS.glottal.matches(ph);
            case SelectorsService_1.SELECTORS.voiced.token:
                return SelectorsService_1.SELECTORS.voiced.matches(ph);
            case SelectorsService_1.SELECTORS.voiceless.token:
                return SelectorsService_1.SELECTORS.voiceless.matches(ph);
            case SelectorsService_1.SELECTORS.open.token:
                return SelectorsService_1.SELECTORS.open.matches(ph);
            case SelectorsService_1.SELECTORS.midOpen.token:
                return SelectorsService_1.SELECTORS.midOpen.matches(ph);
            case SelectorsService_1.SELECTORS.mid.token:
                return SelectorsService_1.SELECTORS.mid.matches(ph);
            case SelectorsService_1.SELECTORS.midClose.token:
                return SelectorsService_1.SELECTORS.midClose.matches(ph);
            case SelectorsService_1.SELECTORS.close.token:
                return SelectorsService_1.SELECTORS.close.matches(ph);
            case SelectorsService_1.SELECTORS.front.token:
                return SelectorsService_1.SELECTORS.front.matches(ph);
            case SelectorsService_1.SELECTORS.central.token:
                return SelectorsService_1.SELECTORS.central.matches(ph);
            case SelectorsService_1.SELECTORS.back.token:
                return SelectorsService_1.SELECTORS.back.matches(ph);
            case SelectorsService_1.SELECTORS.rounded.token:
                return SelectorsService_1.SELECTORS.rounded.matches(ph);
            default:
                return ph.ipa.slice(0, selector.length) === selector; // this is very important, removing it breaks everything
        }
    }
    validateEnvironment(rule, symbols, idx) {
        const environmentPieces = rule.environment.split(' ');
        const environmentVariableIdx = environmentPieces.indexOf('_');
        if (environmentVariableIdx === -1)
            throw new Error(`Cannot parse rule environment: every rule must contain a '_' character.`);
        // check environment to left of symbol
        for (let offsetL = 0; offsetL === environmentVariableIdx - 1; offsetL++) {
            const expected = environmentPieces[offsetL];
            const actual = symbols[idx - 1 + offsetL];
            if (!this.symbolMatchesSelector(actual, expected))
                return false;
        }
        for (let offsetR = 1; offsetR < environmentPieces.length - environmentVariableIdx; offsetR++) {
            const expected = environmentPieces[environmentVariableIdx + offsetR];
            const actual = symbols[idx + offsetR];
            if (!this.symbolMatchesSelector(actual, expected))
                return false;
        }
        return true;
    }
}
exports.IPAAdapter = IPAAdapter;
