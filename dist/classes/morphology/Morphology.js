"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Morphology = void 0;
const word_1 = require("../word");
const Morpheme_1 = require("./Morpheme");
const promises_1 = __importDefault(require("fs/promises"));
class Morphology {
    constructor(vocabulary, annotator) {
        this.boundMorphemes = {};
        this.vocab = vocabulary;
        this.annotator = annotator;
    }
    async loadBoundMorphemesFromFile(filepath) {
        const fileRaw = await promises_1.default.readFile(filepath, 'utf-8');
        const lines = fileRaw.split('\n');
        lines.forEach(rule => {
            const [suffix, inflection] = rule.split('->');
            const [category, characteristic] = inflection
                .replaceAll('[', '')
                .replaceAll(']', '')
                .split(':');
            const allCharacteristics = characteristic.split('&');
            if (!this.boundMorphemes[category.trim()])
                this.boundMorphemes[category.trim()] = {};
            const previousMorphs = this.boundMorphemes[category.trim()][suffix.trim()];
            if (!previousMorphs)
                this.boundMorphemes[category.trim()][suffix.trim()] = allCharacteristics;
            else
                this.boundMorphemes[category.trim()][suffix.trim()] = [...previousMorphs, ...allCharacteristics];
        });
    }
    attachInflection(word, morph) {
        const category = word.category;
        const morphIpa = morph.ipaParts.join('');
        if (morphIpa === '') {
            console.log(`found irregular form ${word.ascii}`);
            return;
        }
        const viableInflections = this.boundMorphemes[category];
        if (!viableInflections || !viableInflections[morphIpa])
            throw new Error(`Morpheme ${morphIpa} is not a valid inflection for the category ${category}`);
        morph.addCharacteristics(viableInflections[morphIpa]);
    }
    getSuffix(word, lemma) {
        let suffixIpa = word.ipaParts.slice(lemma.ipaParts.length, word.ipaParts.length);
        let suffixAscii = this.annotator.annotationConvert.ipa2ascii(suffixIpa).join('');
        const suffixMorpheme = new Morpheme_1.Morpheme(suffixAscii, suffixIpa);
        this.attachInflection(word, suffixMorpheme);
        return suffixMorpheme;
    }
    getPrefix(word, lemma) {
        let prefixIpa = word.ipaParts.slice(0, word.ipaParts.length - lemma.ipaParts.length);
        let prefixAscii = this.annotator.annotationConvert.ipa2ascii(prefixIpa).join('');
        const prefixMorpheme = new Morpheme_1.Morpheme(prefixAscii, prefixIpa);
        return prefixMorpheme;
    }
    decompose(word) {
        if (word.lemma === word)
            return [Morpheme_1.Morpheme.fromWord(word)];
        else if (word.lemma) {
            const suffix = this.getSuffix(word, word.lemma);
            const prefix = this.getPrefix(word, word.lemma);
            const root = Morpheme_1.Morpheme.fromWord(word.lemma);
            if (suffix.ipaParts.length > 0) {
                suffix.bindTo(root);
                root.modifyWith(suffix);
                return [root, suffix];
            }
            else if (prefix.ipaParts.length > 0) {
                prefix.bindTo(root);
                root.modifyWith(prefix);
                return [prefix, root];
            }
            else {
                return [root];
            }
        }
        else {
            throw new Error(`the word ${word.ascii} has no recorded lemma, so it cannot be decomposed.`);
        }
    }
    bulkDecompose(words) {
        return words.map(wrd => this.decompose(wrd));
    }
    compose(morphemes) {
        const ascii = morphemes.map(m => m.ascii).join('');
        const category = morphemes.filter(m => m.category !== 'bound')[0].category;
        const foundWords = this.vocab.lookup(ascii, { category });
        if (foundWords)
            return foundWords[0];
        throw new Error(`cannot compose morphemes ${morphemes.map(m => m.ascii).join(' + ')} .`);
    }
    getCharacteristics(word) {
        const morphemes = this.decompose(word);
        return morphemes.filter(m => m.boundTo !== undefined).reduce((acc, cur) => acc.concat(cur.characteristics), []);
    }
    ;
    async mutateBoundMorphemes(mutes) {
        const cats = Object.keys(this.boundMorphemes);
        for (let cat of cats) {
            const morphemes = this.boundMorphemes[cat];
            const newBoundMorphemeMapping = {};
            for (let mIpa in morphemes) {
                const morphAsWord = new word_1.Word(0, {
                    ipa: mIpa.split('').join(' '),
                    ascii: this.annotator.annotationConvert.ipa2ascii(mIpa.split('')).join(''),
                    category: 'none'
                });
                const changed = await this.annotator.run(morphAsWord.ascii, mutes, 'ipa');
                if (changed === null)
                    throw new Error('mutation failed on bound morphemes');
                newBoundMorphemeMapping[changed.ipa] = this.boundMorphemes[cat][mIpa];
            }
            this.boundMorphemes[cat] = newBoundMorphemeMapping;
        }
    }
}
exports.Morphology = Morphology;
