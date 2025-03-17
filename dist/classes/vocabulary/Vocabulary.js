"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vocabulary = void 0;
const word_1 = require("../shared/word");
const promises_1 = __importDefault(require("fs/promises"));
const FileOps_1 = require("../shared/FileOps");
const Logger_1 = require("../shared/Logger");
class Vocabulary {
    constructor() {
        this.words = [];
        this.curIdx = 1;
    }
    loadWordsFromString(str) {
        str.split('\n').forEach(line => {
            const word = FileOps_1.FileOps.parseVocabularyLine(line);
            if (word) {
                this.words.push(word);
                word.lemma = this.lemmaFor(word);
                this.curIdx++;
            }
        });
    }
    async loadWordsFromDir(dirpath) {
        Logger_1.logger.log(`loading words from: ${dirpath}`, Vocabulary);
        const words = await FileOps_1.FileOps.loadDataClassFromDir(dirpath, 'vocabulary');
        words.forEach((word, idx) => {
            this.words.push(word);
            word.lemma = this.lemmaFor(word);
            this.curIdx++;
        });
        return;
    }
    async loadFromFile(fp) {
        const words = await FileOps_1.FileOps.loadDataClassFromFile(fp, 'vocabulary');
        words.forEach((word, idx) => {
            this.words.push(word);
            word.lemma = this.lemmaFor(word);
            this.curIdx++;
        });
        return;
    }
    async writeToFile(fp) {
        const formatted = this.words.map(w => w.toLine()).join('\n');
        await promises_1.default.writeFile(fp, formatted, 'utf-8');
        return;
    }
    lookup(asciiKey, filters = {}) {
        Logger_1.logger.log(`lookup "${asciiKey}" in vocabulary.`, this.constructor);
        let found = this.words.filter(w => w.text === asciiKey.toLowerCase());
        if (asciiKey === '' || asciiKey === ' ') {
            Logger_1.logger.log(`Lookup on empty string.  Skipping.`, this.constructor);
            return [];
        }
        if (found.length === 0) {
            Logger_1.logger.log(`Word ${asciiKey} not found in dictionary.`, this.constructor);
            promises_1.default.appendFile('./error_words.txt', asciiKey.toLowerCase() + '\n', 'utf-8');
            throw new Error(`Word ${asciiKey} not found in dictionary`);
        }
        if (filters && filters.category)
            found = found.filter(w => w.category === filters.category);
        return found;
    }
    addWord(wrd) {
        Logger_1.logger.log(`adding word "${wrd.ascii}" to vocabulary.`, this.constructor);
        if (!wrd.id)
            wrd.id = this.curIdx++;
        if (this.words.map(w => w.id).includes(wrd.id))
            throw new Error(`ID collision trying to add word "${wrd.ascii}"`);
        this.words.push(wrd);
        wrd.lemma = this.lemmaFor(wrd);
    }
    updateWord(newWord) {
        Logger_1.logger.log(`updating word "${newWord.text}" to ${newWord.ascii}.`, this.constructor);
        this.removeWordById(newWord.id);
        this.addWord(newWord);
    }
    lemmaFor(word) {
        Logger_1.logger.log(`finding lemma for word "${word.ascii}"`, this.constructor);
        if (word.lemma instanceof word_1.Word)
            return word.lemma;
        const lemmaId = word.lemmaId;
        if (lemmaId === -1)
            return word;
        else
            return this.words.filter(w => w.id === lemmaId)[0];
    }
    removeWord(ascii) {
        Logger_1.logger.log(`removing word "${ascii}" from vocabulary.`, this.constructor);
        const word = this.lookup(ascii);
        const idx = this.words.indexOf(word[0]);
        this.words = [...this.words.slice(0, idx), ...this.words.slice(idx + 1, this.words.length)];
    }
    removeWordById(id) {
        Logger_1.logger.log(`removing word with id ${id} from vocabulary.`, this.constructor);
        const word = this.words.filter(w => w.id === id);
        const idx = this.words.indexOf(word[0]);
        this.words = [...this.words.slice(0, idx), ...this.words.slice(idx + 1, this.words.length)];
    }
    replaceWord(wordToRemove, wordToInsert) {
        Logger_1.logger.log(`replacing word "${wordToRemove.ascii}" with "${wordToInsert.ascii}" in vocabulary.`, this.constructor);
        this.removeWordById(wordToRemove.id);
        this.addWord(wordToInsert);
    }
    concat(v2) {
        Logger_1.logger.log(`concatenating vocabulary with ${v2.words.length} words.`, this.constructor);
        const vConcat = new Vocabulary();
        this.words.forEach(w => vConcat.addWord(w));
        v2.words.forEach(w => vConcat.addWord(w));
        return vConcat;
    }
    async toTable() {
        return this.words.map(w => w.toLine()).join('\n');
    }
}
exports.Vocabulary = Vocabulary;
