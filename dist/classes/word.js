"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Word = void 0;
class Word {
    constructor(id, opts) {
        this.id = 0;
        this.text = '';
        this.ascii = '';
        this.ipaParts = [];
        // arpaParts: string[] = [];
        this.category = 'none';
        this.lemmaId = -1;
        this.id = id;
        this.text = opts.ascii;
        this.ascii = opts.ascii;
        this.ipaParts = opts.ipa.split(' ');
        this.category = opts.category;
        if (opts.lemmaId)
            this.lemmaId = opts.lemmaId;
    }
    get ipa() {
        return this.ipaParts.join('');
    }
    static fromLine(line) {
        const parts = line.split(';');
        return new Word(Number(parts[0]), {
            ascii: parts[1],
            ipa: parts[2],
            category: parts[3],
            lemmaId: Number(parts[4])
        });
    }
    toLine() {
        return `${this.id};${this.ascii};${this.ipaParts.join(' ')};${this.category};${(this.lemma ? this.lemma.id : '-1')}`;
    }
}
exports.Word = Word;
