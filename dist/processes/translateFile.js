"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateFile = translateFile;
const promises_1 = __importDefault(require("fs/promises"));
async function translateFile(annotator, filepath, rules) {
    const fileContents = await promises_1.default.readFile(filepath, 'utf8');
    const linewise = fileContents.split('\n');
    let linewiseAnnotations = await Promise.all(linewise.map(line => annotator.bulkRun('ipa', line, rules)));
    let asciiStr = '', ipaStr = '';
    for (let annotations of linewiseAnnotations) {
        asciiStr += annotations.map(annotation => annotation.ascii).join(' ') + '\n';
        ipaStr += annotations.map(annotation => annotation.ipa).join(' ') + '\n';
    }
    function infix(path, infix) {
        const parts = path.split('.');
        const ext = parts.pop();
        parts.push(infix);
        return parts.join('.') + '.' + ext;
    }
    await promises_1.default.writeFile(infix(filepath, 'ascii'), '', 'utf-8');
    await promises_1.default.appendFile(infix(filepath, 'ascii'), asciiStr, 'utf-8');
    await promises_1.default.writeFile(infix(filepath, 'ipa'), '', 'utf-8');
    await promises_1.default.appendFile(infix(filepath, 'ipa'), ipaStr, 'utf-8');
    return infix(filepath, 'ipa');
}
