"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Morpheme = void 0;
class Morpheme {
    constructor(ascii, ipaParts) {
        this.characteristics = [];
        this.category = 'bound';
        this.modifiedBy = [];
        this.ascii = ascii;
        this.ipaParts = ipaParts;
    }
    bindTo(morph) {
        this.boundTo = morph;
    }
    unbind() {
        this.boundTo = undefined;
    }
    modifyWith(morph) {
        this.modifiedBy.push(morph);
    }
    unmodify(morph) {
        this.modifiedBy = this.modifiedBy.filter(mod => mod !== morph);
    }
    addCharacteristic(characteristic) {
        this.characteristics.push(characteristic);
    }
    addCharacteristics(characteristics) {
        characteristics.forEach(c => this.addCharacteristic(c));
    }
    static fromWord(wrd) {
        const morph = new Morpheme(wrd.ascii, wrd.ipaParts);
        morph.category = wrd.category;
        return morph;
    }
}
exports.Morpheme = Morpheme;
