"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SELECTORS = void 0;
const Selector_1 = require("./Selector");
class SELECTORS {
    constructor() {
        throw new Error("Do not instantiate the SELECTOR class.");
    }
}
exports.SELECTORS = SELECTORS;
SELECTORS.all = new Selector_1.Selector('*', (vectors) => true);
SELECTORS.vowel = new Selector_1.Selector('[vowel]', (vectors) => vectors[0] === 'vocalic');
SELECTORS.consonant = new Selector_1.Selector('[consonant]', (vectors) => vectors[0] === 'pulmonic');
SELECTORS.fricative = new Selector_1.Selector('[fricative]', (vectors) => vectors[1] === 'fricative');
SELECTORS.plosive = new Selector_1.Selector('[plosive]', (vectors) => vectors[1] === 'plosive');
SELECTORS.approximant = new Selector_1.Selector('[approximant]', (vectors) => vectors[1] === 'approximant');
SELECTORS.nasal = new Selector_1.Selector('[nasal]', (vectors) => vectors[1] === 'nasal');
SELECTORS.bilabial = new Selector_1.Selector('[bilabial]', (vectors) => vectors[2] === 'bilabial');
SELECTORS.labiodental = new Selector_1.Selector('[labiodental]', (vectors) => vectors[2] === 'labiodental');
SELECTORS.glottal = new Selector_1.Selector('[glottal]', (vectors) => vectors[2] === 'glottal');
SELECTORS.pharyngeal = new Selector_1.Selector('[pharyngeal]', (vectors) => vectors[2] === 'pharyngeal');
SELECTORS.uvular = new Selector_1.Selector('[uvular]', (vectors) => vectors[2] === 'uvular');
SELECTORS.velar = new Selector_1.Selector('[velar]', (vectors) => vectors[2] === 'velar');
SELECTORS.palatal = new Selector_1.Selector('[palatal]', (vectors) => vectors[2] === 'palatal');
SELECTORS.retroflex = new Selector_1.Selector('[retroflex]', (vectors) => vectors[2] === 'retroflex');
SELECTORS.alveolar = new Selector_1.Selector('[alveolar]', (vectors) => vectors[2] === 'alveolar');
// stopping point.
SELECTORS.voiced = new Selector_1.Selector('[voiced]', (vectors) => vectors[3] === 'voiced');
SELECTORS.voiceless = new Selector_1.Selector('[voiceless]', (vectors) => vectors[3] === 'voiceless');
SELECTORS.open = new Selector_1.Selector('[open]', (vectors) => vectors[1] === 'open');
SELECTORS.midOpen = new Selector_1.Selector('[mid-open]', (vectors) => vectors[1] === 'open-mid');
SELECTORS.mid = new Selector_1.Selector('[mid]', (vectors) => vectors[1] === 'mid');
SELECTORS.midClose = new Selector_1.Selector('[mid-close]', (vectors) => vectors[1] === 'close-mid');
SELECTORS.close = new Selector_1.Selector('[close]', (vectors) => vectors[1] === 'close');
SELECTORS.front = new Selector_1.Selector('[front]', (vectors) => vectors[2] === 'front');
SELECTORS.central = new Selector_1.Selector('[central]', (vectors) => vectors[2] === 'central');
SELECTORS.back = new Selector_1.Selector('[back]', (vectors) => vectors[2] === 'back');
SELECTORS.rounded = new Selector_1.Selector('[rounded]', (vectors) => vectors[3] === 'rounded');
SELECTORS.unrounded = new Selector_1.Selector('[unrounded]', (vectors) => vectors[3] === 'unrounded');
