"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
class Util {
    constructor() {
        throw new Error('Do not instantiate the Util class.');
    }
    static removePunctuationAndNumbers(input) {
        return input.replace(/[\W\d\p{P}]/gu, '');
    }
}
exports.Util = Util;
