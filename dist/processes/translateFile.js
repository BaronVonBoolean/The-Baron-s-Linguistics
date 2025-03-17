"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateFile = translateFile;
const FileOps_1 = require("../classes/shared/FileOps");
async function translateFile(language, fileName) {
    const fileContentsRaw = await FileOps_1.FileOps.loadFile(`./${fileName}.txt`);
    const mutatedFileContentsAscii = fileContentsRaw
        .split(' ')
        .map((text) => language.mutate(language.phonology, language.lookup(text)[0])?.ascii)
        .join(' ');
    await FileOps_1.FileOps.writeFile(`${fileName}.ascii.txt`, mutatedFileContentsAscii);
    const mutatedFileContentsIpa = fileContentsRaw
        .split(' ')
        .map((text) => language.mutate(language.phonology, language.lookup(text)[0])?.ipa)
        .join(' ');
    await FileOps_1.FileOps.writeFile(`${fileName}.ipa.txt`, mutatedFileContentsIpa);
}
