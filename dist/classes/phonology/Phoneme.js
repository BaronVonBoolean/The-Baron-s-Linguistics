"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Phoneme = void 0;
class Phoneme {
    constructor({ id, ipa, ascii, category, vectors }) {
        this.id = id;
        this.ipa = ipa;
        this.ascii = ascii;
        this.category = category;
        this.vectors = vectors.substring(1, vectors.length - 1).split('&');
    }
    clone() {
        return new Phoneme({
            id: this.id,
            ipa: this.ipa,
            ascii: this.ascii,
            category: this.category,
            vectors: `[${this.vectors.join('&')}]`
        });
    }
    static fromLine(line) {
        const [id, ipa, ascii, category, vectors] = line.split(';');
        if (!id || !ipa || !ascii || !category || !vectors)
            return null;
        return new Phoneme({
            id: parseInt(id),
            ipa,
            ascii,
            category,
            vectors
        });
    }
    toLine() {
        return `${this.id};${this.ipa};${this.ascii};${this.category};[${this.vectors.join('&')}]`;
    }
}
exports.Phoneme = Phoneme;
