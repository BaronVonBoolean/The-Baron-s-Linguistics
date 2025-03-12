"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectCMU = injectCMU;
exports.injectAnnotationConverter = injectAnnotationConverter;
const AnnotationConverter_1 = require("../classes/phonology/AnnotationConverter");
const CMUDict_1 = require("../classes/phonology/CMUDict");
const cmu = new CMUDict_1.CMUDict('./data/cmudict.txt');
const annotationConvert = new AnnotationConverter_1.AnnotationConverter('./data/charmaps/arpa2ipa.txt', './data/charmaps/ipa2ascii.txt');
function injectCMU() {
    return cmu;
}
function injectAnnotationConverter(flavor = 'ipa') {
    return annotationConvert;
}
