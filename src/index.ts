
import { Morphology } from "./classes/morphology/Morphology";
import { Word } from "./classes/shared/word";
import { Phonology } from "./classes/phonology/Phonology";
import { Vocabulary } from "./classes/vocabulary/Vocabulary";
import { Language } from "./classes/language/Language"; 
import { Phoneme } from "./classes/phonology/Phoneme";
import { PhoneMap } from "./classes/phonology/PhoneMap";
import { translateFile } from "./processes/translateFile";

async function main() {
  let vocab = new Vocabulary();
  let phono = new Phonology();
  let morph = new Morphology();

  let language = new Language('English', phono, morph, vocab);

  await language.load(
    '/Users/ianculleton/Documents/node_projects/baron-linguistics/data/languages/empty.language.text'
  );

  language.addPhoneme(new Phoneme({ id: 1, ipa: 'a', ascii: 'a', category: 'vowel', vectors: '[first]' }))
  language.addPhoneme(new Phoneme({ id: 2, ipa: 'b', ascii: 'b', category: 'consonant', vectors: '[second]' }))
  language.addPhoneme(new Phoneme({ id: 2, ipa: 'c', ascii: 'c', category: 'consonant', vectors: '[third]' }))

  language.addPhoneMap(new PhoneMap('a _ c', 'b', 'c'));

  vocab.addWord(new Word(1, {ascii: 'abc', ipa: 'a b c', category: 'noun', lemmaId: -1}));
  vocab.addWord(new Word(2, {ascii: 'cba', ipa: 'c b a', category: 'noun', lemmaId: -1}));
  vocab.addWord(new Word(3, {ascii: 'bac', ipa: 'b a c', category: 'noun', lemmaId: -1}));
  vocab.addWord(new Word(4, {ascii: 'cab', ipa: 'c a b', category: 'noun', lemmaId: -1}));

  language.addInflection('a b', 'noun',  ['inflected'])

  translateFile(language, 'test-input-file')

  await language.save('./data/languages/autosave.language.text');

}

main();