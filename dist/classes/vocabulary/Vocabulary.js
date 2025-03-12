"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vocabulary = void 0;
const word_1 = require("../word");
const promises_1 = __importDefault(require("fs/promises"));
class Vocabulary {
    constructor() {
        this.words = [];
        this.curIdx = 1;
    }
    async loadFromFile(fp) {
        const contents = await promises_1.default.readFile(fp, 'utf-8');
        const lines = contents.split('\n');
        lines.forEach((line, idx) => {
            if (line.split(';').length !== 5)
                return;
            const wrd = word_1.Word.fromLine(line);
            this.words.push(wrd);
            wrd.lemma = this.lemmaFor(wrd);
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
        let found = this.words.filter(w => w.text === asciiKey.toLowerCase());
        if (asciiKey === '' || asciiKey === ' ') {
            // console.warn(`Lookup on empty string.  Skipping.`);
            return [];
        }
        if (found.length === 0) {
            promises_1.default.appendFile('./error_words.txt', asciiKey.toLowerCase() + '\n', 'utf-8');
            throw new Error(`Word ${asciiKey} not found in dictionary`);
        }
        if (filters && filters.category)
            found = found.filter(w => w.category === filters.category);
        return found;
    }
    addWord(wrd) {
        wrd.id = this.curIdx++;
        this.words.push(wrd);
    }
    lemmaFor(word) {
        if (word.lemma instanceof word_1.Word)
            return word.lemma;
        const lemmaId = word.lemmaId;
        if (lemmaId === -1)
            return word;
        else
            return this.words.filter(w => w.id === lemmaId)[0];
    }
    removeWord(ascii) {
        const word = this.lookup(ascii);
        const idx = this.words.indexOf(word[0]);
        this.words = [...this.words.slice(0, idx), ...this.words.slice(idx + 1, this.words.length)];
    }
    removeWordById(id) {
        const word = this.words.filter(w => w.id === id);
        const idx = this.words.indexOf(word[0]);
        this.words = [...this.words.slice(0, idx), ...this.words.slice(idx + 1, this.words.length)];
        console.log(this.words.length);
    }
    replaceWord(wordToRemove, wordToInsert) {
        this.removeWordById(wordToRemove.id);
        this.addWord(wordToInsert);
    }
    concat(v2) {
        const vConcat = new Vocabulary();
        this.words.forEach(w => vConcat.addWord(w));
        v2.words.forEach(w => vConcat.addWord(w));
        return vConcat;
    }
}
exports.Vocabulary = Vocabulary;
