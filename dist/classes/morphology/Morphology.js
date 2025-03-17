"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Morphology = void 0;
const Morpheme_1 = require("./Morpheme");
const PhoneticMutationPipeline_1 = require("../phonology/PhoneticMutationPipeline");
const FileOps_1 = require("../shared/FileOps");
const Logger_1 = require("../shared/Logger");
class Morphology {
    constructor() {
        this.boundMorphemes = {};
    }
    addBoundMorpheme(morph) {
        Logger_1.logger.log(`adding bound morpheme ${morph?.ipaParts.join()} with characteristics ${morph?.characteristics.join(', ')}`, Morphology);
        if (!morph)
            return;
        if (!this.boundMorphemes[morph.category])
            this.boundMorphemes[morph.category] = {};
        const previousMorphs = this.boundMorphemes[morph.category][morph.ipaParts.join(' ').trim()];
        if (!previousMorphs)
            this.boundMorphemes[morph.category][morph.ipaParts.join(' ').trim()] = morph.characteristics;
        else
            this.boundMorphemes[morph.category][morph.ipaParts.join(' ').trim()] = [...previousMorphs, ...morph.characteristics];
    }
    async loadBoundMorphemesFromString(morphs) {
        morphs.split('\n')
            .map(line => FileOps_1.FileOps.parseMorphemeLine(line))
            .forEach((morph) => {
            this.addBoundMorpheme(morph);
        });
    }
    async loadBoundMorphemesFromDir(dirpath) {
        Logger_1.logger.log(`loading morphemes from: ${dirpath}`, Morphology);
        const morphs = await FileOps_1.FileOps.loadDataClassFromDir(dirpath, 'morphology');
        morphs.forEach((morph) => {
            this.addBoundMorpheme(morph);
        });
    }
    async loadBoundMorphemesFromFile(filepath) {
        const morphs = await FileOps_1.FileOps.loadDataClassFromFile(filepath, 'morphology');
        morphs.forEach((morph) => {
            this.addBoundMorpheme(morph);
        });
    }
    attachInflection(word, morph) {
        Logger_1.logger.log(`attaching inflection to word "${word.text}"`, this.constructor);
        const category = word.category;
        const morphIpa = morph.ipaParts.join(' ');
        if (morphIpa === ' ') {
            Logger_1.logger.log(`found irregular form ${word.ascii}`, this.constructor);
            return;
        }
        const viableInflections = this.boundMorphemes[category];
        if (!viableInflections || !viableInflections[morphIpa])
            throw new Error(`Morpheme ${morphIpa} is not a valid inflection for the category ${category}`);
        morph.addCharacteristics(viableInflections[morphIpa]);
    }
    getSuffix(word, lemma) {
        Logger_1.logger.log(`getting suffix for word "${word.text}"`, this.constructor);
        let suffixIpa = word.ipaParts.slice(lemma.ipaParts.length, word.ipaParts.length);
        const suffixMorpheme = new Morpheme_1.Morpheme(suffixIpa);
        this.attachInflection(word, suffixMorpheme);
        return suffixMorpheme;
    }
    getPrefix(word, lemma) {
        Logger_1.logger.log(`getting prefix for word "${word.text}"`, this.constructor);
        let prefixIpa = word.ipaParts.slice(0, word.ipaParts.length - lemma.ipaParts.length);
        const prefixMorpheme = new Morpheme_1.Morpheme(prefixIpa);
        return prefixMorpheme;
    }
    decompose(word) {
        Logger_1.logger.log(`decomposing word "${word.text}" into morphemes.`, this.constructor);
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
            return [Morpheme_1.Morpheme.fromWord(word)];
        }
    }
    bulkDecompose(words) {
        Logger_1.logger.log(`decomposing ${words.length} words into morphemes.`, this.constructor);
        return words.map(wrd => this.decompose(wrd));
    }
    compose(morphemes, vocab) {
        Logger_1.logger.log(`composing morphemes ${morphemes.map(m => m.ipaParts.join('')).join(' + ')} into a word.`, this.constructor);
        const ipa = morphemes.map(m => m.ipaParts.join('')).join('');
        const category = morphemes.filter(m => m.category !== 'bound')[0].category;
        const foundWords = vocab.lookup(ipa, { category, field: 'ipa' });
        if (foundWords.length === 0)
            new Error(`cannot compose morphemes ${morphemes.map(m => m.ipaParts.join('')).join(' + ')} .`);
        if (foundWords)
            return foundWords[0];
        throw new Error(`cannot compose morphemes ${morphemes.map(m => m.ipaParts.join('')).join(' + ')} .`);
    }
    getCharacteristics(word) {
        Logger_1.logger.log(`getting characteristics for word "${word.text}"`, this.constructor);
        const morphemes = this.decompose(word);
        return morphemes.filter(m => m.boundTo !== undefined).reduce((acc, cur) => acc.concat(cur.characteristics), []);
    }
    ;
    cacheToMorphemes() {
        let morphs = [];
        const categories = Object.keys(this.boundMorphemes);
        categories.forEach((category) => {
            const morphemeIpa = Object.keys(this.boundMorphemes[category]);
            morphs = morphs.concat(morphemeIpa.map(mChar => {
                const morpheme = new Morpheme_1.Morpheme([mChar]);
                morpheme.category = category;
                morpheme.characteristics = this.boundMorphemes[category][mChar];
                return morpheme;
            }));
        });
        return morphs;
    }
    applyPhonology(phonology) {
        Logger_1.logger.log(`applying phonology to bound morphemes.`, this.constructor);
        const categories = Object.keys(this.boundMorphemes);
        categories.forEach(category => {
            const morphemeIpa = Object.keys(this.boundMorphemes[category]);
            morphemeIpa
                .map(mChar => new Morpheme_1.Morpheme([mChar]))
                .forEach((morpheme) => {
                const storedCharacteristics = this.boundMorphemes[category][morpheme.ipaParts.join('')];
                const mutated = this.applyPhonologyToMorpheme(phonology, morpheme);
                this.boundMorphemes[category][mutated.ipaParts.join(' ')] = storedCharacteristics;
            });
        });
    }
    applyPhonologyToMorpheme(phonology, morpheme) {
        const pipeline = new PhoneticMutationPipeline_1.PhoneticMutationPipeline(phonology.mutations);
        const mutated = pipeline.run(morpheme.toWord(), phonology.phonemes);
        return mutated;
    }
    async toTable() {
        return this.cacheToMorphemes().map(m => m.toLine()).join('\n');
    }
}
exports.Morphology = Morphology;
