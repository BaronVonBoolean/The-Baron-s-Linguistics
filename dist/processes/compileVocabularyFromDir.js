"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileVocabularyFromDir = compileVocabularyFromDir;
const promises_1 = __importDefault(require("fs/promises"));
async function compileVocabularyFromDir(dirpath, vocab) {
    const files = await promises_1.default.readdir(dirpath);
    for (let file of files) {
        await vocab.loadFromFile(dirpath + '/' + file);
    }
    return vocab;
}
