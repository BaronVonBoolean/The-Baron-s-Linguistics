"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileMutationsFromDir = compileMutationsFromDir;
const compileMutations_1 = require("./compileMutations");
const promises_1 = __importDefault(require("fs/promises"));
async function compileMutationsFromDir(dirpath) {
    const files = await promises_1.default.readdir(dirpath);
    let acc = [];
    const firstFile = files.shift();
    if (!firstFile)
        throw new Error(`cannot compile a vocabulary from directory ${dirpath}: no files in directory.`);
    console.log(`loading file: ${firstFile}`);
    acc = acc.concat(await (0, compileMutations_1.compileMutations)(dirpath + '/' + firstFile));
    for (let file of files) {
        console.log(`loading file: ${file}`);
        acc = acc.concat(await (0, compileMutations_1.compileMutations)(dirpath + '/' + file));
    }
    return acc;
}
