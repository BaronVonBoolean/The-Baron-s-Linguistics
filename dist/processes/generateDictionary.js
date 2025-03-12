"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDictionary = generateDictionary;
const Annotator_1 = require("../classes/phonology/Annotator");
const Vocabulary_1 = require("../classes/vocabulary/Vocabulary");
const promises_1 = __importDefault(require("fs/promises"));
const ann = new Annotator_1.Annotator(new Vocabulary_1.Vocabulary());
async function generateDictionary(glyphs, dictName, ruleset) {
    const content = (await promises_1.default.readFile('/Users/ianculleton/Documents/node_projects/baron-phonetics/src/data/cmudict.txt', 'utf8'));
    const words = content.split('\n').map((l) => l.split(' ')[0]);
    const englishWords = words;
    let mutatedWords = await Promise.all(englishWords.map((word) => {
        return ann.run(word, ruleset, glyphs);
    }));
    const dictStr = englishWords
        .map((w, i) => {
        if (mutatedWords[i].ascii === '')
            return '';
        return `${w.toLowerCase()}:${mutatedWords[i].ascii}`;
    })
        .filter(row => row !== '')
        .join('\n');
    await promises_1.default.writeFile('./src/data/dictionaries/' + dictName + '.txt', dictStr, 'utf8');
    return dictStr;
}
