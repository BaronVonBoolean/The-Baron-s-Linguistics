"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Morphology_1 = require("./classes/morphology/Morphology");
const word_1 = require("./classes/shared/word");
const Phonology_1 = require("./classes/phonology/Phonology");
const Vocabulary_1 = require("./classes/vocabulary/Vocabulary");
const Language_1 = require("./classes/language/Language");
const Phoneme_1 = require("./classes/phonology/Phoneme");
const PhoneMap_1 = require("./classes/phonology/PhoneMap");
const translateFile_1 = require("./processes/translateFile");
async function main() {
    let vocab = new Vocabulary_1.Vocabulary();
    let phono = new Phonology_1.Phonology();
    let morph = new Morphology_1.Morphology();
    let language = new Language_1.Language('English', phono, morph, vocab);
    await language.load('/Users/ianculleton/Documents/node_projects/baron-linguistics/data/languages/empty.language.text');
    language.addPhoneme(new Phoneme_1.Phoneme({ id: 1, ipa: 'a', ascii: 'a', category: 'vowel', vectors: '[first]' }));
    language.addPhoneme(new Phoneme_1.Phoneme({ id: 2, ipa: 'b', ascii: 'b', category: 'consonant', vectors: '[second]' }));
    language.addPhoneme(new Phoneme_1.Phoneme({ id: 2, ipa: 'c', ascii: 'c', category: 'consonant', vectors: '[third]' }));
    language.addPhoneMap(new PhoneMap_1.PhoneMap('a _ c', 'b', 'c'));
    vocab.addWord(new word_1.Word(1, { ascii: 'abc', ipa: 'a b c', category: 'noun', lemmaId: -1 }));
    vocab.addWord(new word_1.Word(2, { ascii: 'cba', ipa: 'c b a', category: 'noun', lemmaId: -1 }));
    vocab.addWord(new word_1.Word(3, { ascii: 'bac', ipa: 'b a c', category: 'noun', lemmaId: -1 }));
    vocab.addWord(new word_1.Word(4, { ascii: 'cab', ipa: 'c a b', category: 'noun', lemmaId: -1 }));
    language.addInflection('a b', 'noun', ['inflected']);
    (0, translateFile_1.translateFile)(language, 'test-input-file');
    await language.save('./data/languages/autosave.language.text');
}
main();
