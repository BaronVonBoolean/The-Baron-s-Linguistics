"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CMUDict = void 0;
const fs = __importStar(require("fs"));
class CMUDict {
    constructor(dictPath) {
        this.loaded = false;
        this.byText = {};
        this.dictPath = dictPath;
        this.onLoad = new Promise((resolve, reject) => {
            fs.readFile(this.dictPath, 'utf8', (err, data) => {
                if (err)
                    reject(err);
                const lines = data.split('\n');
                for (let line of lines) {
                    const [word, ...phones] = line.split(' ').filter(p => p !== '');
                    this.byText[word] = phones;
                }
                this.loaded = true;
                resolve(this.loaded);
            });
        });
    }
    convert(word) {
        word = word.toUpperCase();
        if (word === '' || word === '\n')
            return [];
        if (this.byText[word] === undefined) {
            throw new Error(`${word} is not a word contained in the CMU Dictionary`);
        }
        const phonemes = this.byText[word].slice();
        return phonemes;
    }
}
exports.CMUDict = CMUDict;
