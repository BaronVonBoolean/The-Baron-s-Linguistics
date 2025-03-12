"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnotationConverter = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const Util_1 = require("./Util");
class AnnotationConverter {
    constructor(arpa2ipaDict, ipa2asciiDict) {
        this.arpaToIpa = {};
        this.ipaToArpa = {};
        this.asciiToIpa = {};
        this.ipaToAscii = {};
        // NOT IMPLEMENTED YET!
        // asciiToArpa: {[x:string]: string} = { }
        // arpaToAscii: {[x:string]: string} = { } 
        this.loaded = false;
        const arpaLoaded = promises_1.default.readFile(arpa2ipaDict, 'utf8')
            .then(raw => raw.split('\n'))
            .then(lines => {
            for (let line of lines) {
                const [arpa, ipa] = line.split(':');
                this.arpaToIpa[arpa] = ipa;
                this.ipaToArpa[ipa] = arpa;
            }
            this.loaded = true;
        });
        const asciiLoaded = promises_1.default.readFile(ipa2asciiDict, 'utf8')
            .then(raw => raw.split('\n'))
            .then(lines => {
            for (let line of lines) {
                let [ascii, ipa] = line.split(':');
                this.asciiToIpa[ipa] = ascii;
                this.ipaToAscii[ascii] = ipa;
            }
            this.loaded = true;
        });
        this.onLoad = Promise.all([arpaLoaded, asciiLoaded])
            .then(() => this.loaded)
            .catch(() => false);
    }
    makeAnnotation(dictionary, input) {
        let cleanInput = Util_1.Util.removePunctuationAndNumbers(input).toLowerCase();
        let arpified;
        let word;
        try {
            arpified = dictionary.convert(cleanInput);
        }
        catch (e) {
            const blanketyblank = new Array(input.length).fill('_');
            return {
                text: blanketyblank.join(''),
                arpa: blanketyblank,
                ipa: blanketyblank,
                ascii: blanketyblank
            };
        }
        const ipaish = this.arpa2ipa(arpified);
        const ascii = this.ipa2ascii(ipaish);
        return {
            text: cleanInput,
            arpa: arpified,
            ipa: ipaish,
            ascii
        };
    }
    arpa2ipa(arpaWord) {
        return arpaWord.map(sym => {
            return this.arpaToIpa[sym];
        });
    }
    ipa2arpa(ipaWord) {
        return ipaWord.map(sym => {
            return this.ipaToArpa[sym];
        });
    }
    ipa2ascii(ipaWord) {
        const ipaWordWithoutStress = ipaWord.map((ipaChar) => {
            if (ipaChar[0] === 'ˈ' || ipaChar[0] === 'ˌ') {
                return ipaChar.substring(1, ipaChar.length);
            }
            return ipaChar;
        });
        return ipaWordWithoutStress.filter(s => s !== '').map(sym => {
            const mappedSymbol = this.ipaToAscii[sym];
            if (!mappedSymbol && sym !== '_')
                console.warn(`cannot map IPA symbol /${sym}/ : ${sym} is not in the specified IPA dictionary.`);
            if (!mappedSymbol)
                return '_';
            return mappedSymbol;
        });
    }
    syncToIpa(unsynced) {
        // unsynced.arpa = this.ipa2arpa(unsynced.ipa);
        unsynced.ascii = this.ipa2ascii(unsynced.ipaParts).join('');
    }
}
exports.AnnotationConverter = AnnotationConverter;
