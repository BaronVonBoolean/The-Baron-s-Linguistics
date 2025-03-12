"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dedupe = dedupe;
const Vocabulary_1 = require("../classes/vocabulary/Vocabulary");
async function dedupe(dictPath) {
    let v = new Vocabulary_1.Vocabulary();
    await v.loadFromFile(dictPath);
    v.words.forEach((wrd) => {
        const possibleDupes = v.words
            .filter(w => w.ascii === wrd.ascii)
            .filter(w => w.category === wrd.category);
        if (possibleDupes.length > 1) {
            possibleDupes.shift();
            console.log(`found ${possibleDupes.length} dupes for word ${wrd.ascii}`);
            possibleDupes.forEach(d => v.removeWordById(d.id));
        }
    });
    v.writeToFile('./deduped.txt');
}
