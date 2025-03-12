"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Phoneme = void 0;
//vocalics
const vowels = ['i', 'y', 'ɨ', 'ʉ', 'ɯ', 'u', 'ɪ', 'ʏ', 'ʊ', 'e', 'ø', 'ɘ', 'ɵ', 'ɤ', 'o', 'ə', 'ɛ', 'œ', 'ɜ', 'ɞ', 'ʌ', 'ɔ', 'æ', 'ɐ', 'a', 'ɶ', 'ɑ', 'ɒ', 'ɝ'];
// height
const closeVowels = ["i", "y", "ɪ", "ʏ", "u", "ʊ"];
const closeMidVowels = ["e", "ø", "ɘ", "ɶ", "o", "ɔ"];
const openMidVowels = ["ɛ", "œ", "ɜ", "ɞ", "ʌ", "ɔ", "ɐ"];
const openVowels = ["a", "ɑ", "ɒ", "æ", "ä", "ɶ", "ɐ"];
// fronting
const frontVowels = ["i", "y", "ɪ", "ʏ", "e", "ø", "ɛ", "œ", "æ", "a"];
const centralVowels = ["ɨ", "ʉ", "ɘ", "ɜ", "ə", "ɞ", "ɐ"];
const backVowels = ["u", "ʊ", "o", "ɔ", "ɑ", "ɒ", "ʌ", "ɤ"];
// rounding
const roundedVowels = ["y", "ø", "ʏ", "œ", "u", "ɵ", "ʊ", "o", "ɔ", "ɒ"];
//manner of articulation
const approximant = ["ʋ", "ɹ", "ɻ", "j", "ɰ"];
const fricatives = ["ɸ", "β", "f", "v", "θ", "ð", "s", "z", "ʃ", "ʒ", "ʂ", "ʐ", "ç", "ʝ", "x", "ɣ", "χ", "ʁ", "ħ", "ʕ", "h", "ɦ"];
const plosives = ["p", "b", "t", "d", "ʈ", "ɖ", "c", "ɟ", "k", "ɡ", "q", "ɢ", "ʔ"];
const nasals = ["m̥", "m", "ɱ̊", "ɱ", "n̼", "n̥", "n", "ɳ̊", "ɳ", "ɲ̊", "ɲ", "ŋ̊", "ŋ", "ɴ̥", "ɴ"];
//place of articulation
const bilabials = ["p", "b", "ʙ", "ɸ", "β", "m"];
const labiodentals = ["ɱ", "ⱱ", "f", "v", "ʋ"];
const alveolars = ["t", "d", "ɾ", "r", "θ", "ð", "s", "z", "ʃ", "ʒ", "ɬ", "ɮ", "n", "l"];
const retroflexes = ["ʈ", "ɖ", "ɽ", "ɻ", "ʂ", "ʐ", "ɭ", "ɳ"];
const palatals = ["c", "ɟ", "ç", "ʝ", "j", "ʎ", "ɲ"];
const velars = ["k", "ɡ", "x", "ɣ", "ŋ", "ɰ", "ʟ"];
const uvulars = ["q", "ɢ", "ʀ", "χ", "ʁ", "ɴ"];
const pharyngeals = ["ʕ", "ʜ", "ʢ", "ħ"];
const glottals = ["ʔ", "h", "ɦ"];
// voicing
const voiced = ["b", "d", "ɡ", "ʙ", "v", "ð", "z", "ʒ", "ɾ", "r", "ʝ", "j", "ɾ", "ɻ", "ɣ", "ŋ", "ɰ", "ʁ", "ɲ", "ɬ", "ʋ", "ɮ", "m", "n", "l", "ɳ"];
class Phoneme {
    constructor(ipaSymbol) {
        this.ipa = ipaSymbol;
        if (vowels.includes(ipaSymbol)) {
            this.genera = 'vocalic';
        }
        else if (ipaSymbol === '#') {
            this.genera = 'boundary';
        }
        else {
            this.genera = 'pulmonic';
        }
        this.vectors = this.vectorize();
    }
    vectorize() {
        switch (this.genera) {
            case 'vocalic':
                return this.vectorizeVowel();
            case 'pulmonic':
                return this.vectorizeConsonant();
            case 'boundary':
                return ['boundary', null, null, null];
            default:
                throw new Error(`Cannot vectorize ${this.ipa}: ${this.genera}s are not supported yet`);
        }
    }
    vectorizeConsonant() {
        const vectors = [this.genera, 'plosive', 'labiodental', 'voiceless'];
        if (plosives.includes(this.ipa))
            vectors[1] = 'plosive';
        if (nasals.includes(this.ipa))
            vectors[1] = 'nasal';
        if (approximant.includes(this.ipa))
            vectors[1] = 'approximant';
        if (fricatives.includes(this.ipa))
            vectors[1] = 'fricative';
        if (bilabials.includes(this.ipa))
            vectors[2] = 'bilabial';
        if (labiodentals.includes(this.ipa))
            vectors[2] = 'labiodental';
        if (alveolars.includes(this.ipa))
            vectors[2] = 'alveolar';
        if (retroflexes.includes(this.ipa))
            vectors[2] = 'retroflex';
        if (palatals.includes(this.ipa))
            vectors[2] = 'palatal';
        if (velars.includes(this.ipa))
            vectors[2] = 'velar';
        if (uvulars.includes(this.ipa))
            vectors[2] = 'uvular';
        if (pharyngeals.includes(this.ipa))
            vectors[2] = 'pharyngeal';
        if (glottals.includes(this.ipa))
            vectors[2] = 'glottal';
        if (voiced.includes(this.ipa))
            vectors[3] = 'voiced';
        if (!voiced.includes(this.ipa))
            vectors[3] = 'voiceless';
        return vectors;
    }
    vectorizeVowel() {
        const vectors = [this.genera, 'mid', 'central', 'unrounded'];
        if (closeVowels.includes(this.ipa))
            vectors[1] = 'close';
        if (closeMidVowels.includes(this.ipa))
            vectors[1] = 'close-mid';
        if (openMidVowels.includes(this.ipa))
            vectors[1] = 'open-mid';
        if (openVowels.includes(this.ipa))
            vectors[1] = 'open';
        if (frontVowels.includes(this.ipa))
            vectors[2] = 'front';
        if (centralVowels.includes(this.ipa))
            vectors[2] = 'central';
        if (backVowels.includes(this.ipa))
            vectors[2] = 'back';
        if (roundedVowels.includes(this.ipa))
            vectors[3] = 'rounded';
        if (!roundedVowels.includes(this.ipa))
            vectors[3] = 'unrounded';
        return vectors;
    }
}
exports.Phoneme = Phoneme;
