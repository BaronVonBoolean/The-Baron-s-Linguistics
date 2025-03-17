"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Morpheme = void 0;
const word_1 = require("../shared/word");
const Util_1 = require("../shared/Util");
class Morpheme {
    constructor(ipaParts) {
        this.characteristics = [];
        this.category = 'bound';
        this.modifiedBy = [];
        this.ipaParts = ipaParts;
    }
    bindTo(morph) {
        this.boundTo = morph;
    }
    unbind() {
        this.boundTo = undefined;
    }
    modifyWith(morph) {
        this.modifiedBy.push(morph);
    }
    unmodify(morph) {
        this.modifiedBy = this.modifiedBy.filter(mod => mod !== morph);
    }
    addCharacteristic(characteristic) {
        this.characteristics.push(characteristic);
    }
    addCharacteristics(characteristics) {
        if (!characteristics)
            return;
        characteristics.forEach(c => this.addCharacteristic(c));
    }
    toWord() {
        return new word_1.Word(-1, {
            ascii: this.ipaParts.join(' '),
            category: this.category,
            ipa: this.ipaParts.join(' '),
            lemmaId: -1
        });
    }
    toLine() {
        return `${this.ipaParts.join(' ')} -> [${this.category}:${this.characteristics.join('&')}]`;
    }
    static fromLine(line) {
        const [ipa, coda] = line.split('->').map(s => s.trim());
        const [category, tags] = coda.split(':').map(s => s.trim());
        const tagsArray = tags.split('&').map(t => Util_1.Util.removePunctuationAndNumbers(t).trim());
        console.log(tagsArray);
        const morph = new Morpheme(ipa.split(' '));
        morph.category = Util_1.Util.removePunctuationAndNumbers(category);
        morph.addCharacteristics(tagsArray);
        return morph;
    }
    static fromWord(wrd) {
        const morph = new Morpheme(wrd.ipaParts);
        morph.category = wrd.category;
        return morph;
    }
}
exports.Morpheme = Morpheme;
