"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileVocabularyFromDir = compileVocabularyFromDir;
const promises_1 = __importDefault(require("fs/promises"));
const Vocabulary_1 = require("../classes/vocabulary/Vocabulary");
async function compileVocabularyFromDir(dirpath) {
    const files = await promises_1.default.readdir(dirpath);
    let vAccumulator = new Vocabulary_1.Vocabulary();
    const firstFile = files.shift();
    if (!firstFile)
        throw new Error(`cannot compile a vocabulary from directory ${dirpath}: no files in directory.`);
    console.log(`loading file: ${firstFile}`);
    await vAccumulator.loadFromFile(dirpath + '/' + firstFile);
    for (let file of files) {
        console.log(`loading file: ${file}`);
        const vCurrent = new Vocabulary_1.Vocabulary();
        await vCurrent.loadFromFile(dirpath + '/' + file);
        vAccumulator = vAccumulator.concat(vCurrent);
    }
    await vAccumulator.writeToFile('/Users/ianculleton/Documents/node_projects/baron-linguistics/data/dictionary.output.txt');
    return vAccumulator;
}
