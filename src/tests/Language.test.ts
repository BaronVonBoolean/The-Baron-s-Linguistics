import { Language } from '../classes/language/Language';
import { Morpheme } from '../classes/morphology/Morpheme';
import { PhoneMap } from '../classes/phonology/PhoneMap';
import { Phoneme } from '../classes/phonology/Phoneme';
import ConfigOps from '../classes/shared/ConfigOps';
import { Word } from '../classes/shared/word';

const fixtures: { [x: string]: any } = {
  language: null,
  words: [
    new Word(1, { ascii: 'abc', ipa: 'a b c', category: 'noun', lemmaId: -1 }),
    new Word(2, { ascii: 'cba', ipa: 'c b a', category: 'noun', lemmaId: -1 }),
    new Word(3, { ascii: 'bac', ipa: 'b a c', category: 'noun', lemmaId: -1 }),
    new Word(4, { ascii: 'cab', ipa: 'c a b', category: 'noun', lemmaId: -1 }),
    new Word(5, { ascii: 'cab', ipa: 'c a b', category: 'verb', lemmaId: -1 }),
    new Word(6, { ascii: 'cabab', ipa: 'c a b a b', category: 'verb', lemmaId: 1 }),

  ],
  phonemes: [
    new Phoneme({ id: 1, ipa: 'a', ascii: 'a', category: 'vowel', vectors: '[first]' }),
    new Phoneme({ id: 2, ipa: 'b', ascii: 'b', category: 'consonant', vectors: '[second]' }),
    new Phoneme({ id: 3, ipa: 'c', ascii: 'c', category: 'consonant', vectors: '[third]' })
  ],
  phoneMaps: [
    new PhoneMap(1, 'a _ c', 'b', 'c'),
    new PhoneMap(2, 'b _ c', 'b', 'a'),
    new PhoneMap(2, 'b _ c', 'a', 'c')
  ],
  inflections: [
    new Morpheme(['a', 'b']),
    new Morpheme(['c', 'a']),
  ]
}

describe('Language', () => {

  beforeAll(() => {
    ConfigOps.setEnvironment('test');
  })

  describe('Language.addWord (delegates to Vocabulary.addWord)', () => {

    beforeEach(() => {
      fixtures.language = new Language('test');
    })

    it('should add a word to the language', () => {
      fixtures.language.addWord(fixtures.words[0]);
      expect(fixtures.language.vocabulary.words).toEqual([fixtures.words[0]]);
    });
  });

  describe('Language.addPhoneme (delegates to Phonology.addPhoneme)', () => {

    beforeEach(() => {
      fixtures.language = new Language('test');

    })

    it('should add a phoneme to the language', () => {
      const phoneme = new Phoneme({ id: 1, ipa: 'a', ascii: 'a', category: 'vowel', vectors: '[first]' });
      fixtures.language.addPhoneme(phoneme);
      expect(fixtures.language.phonology.phonemes).toEqual([phoneme]);
    });
  });

  describe('Language.addPhoneMap (delegates to Phonology.addPhoneMap)', () => {

    beforeEach(() => {
      fixtures.language = new Language('test');

    })
    
    it('should add a phoneMap (a.k.a. mutation) to the language', () => {
      const phoneMap = new PhoneMap(1, 'a _ c', 'b', 'c');
      fixtures.language.addPhoneMap(phoneMap);
      expect(fixtures.language.phonology.mutations).toEqual([phoneMap]);
    });
  });

  describe('Language.addInflection (delegates to Morphology.addBoundMorpheme)', () => {
    beforeEach(() => {
      fixtures.language = new Language('test');
    })

    it('should add an inflection to the language', () => {
      fixtures.language.addInflection('a b', 'noun', ['inflected']);
      expect(fixtures.language.morphology.boundMorphemes).toHaveProperty('noun');
      expect(fixtures.language.morphology.boundMorphemes.noun).toHaveProperty('a b');
      expect(fixtures.language.morphology.boundMorphemes.noun['a b']).toEqual(['inflected']);
    });

    it('should associate an inflection with a set of characteristics', () => {
      fixtures.language.addInflection('a b', 'noun', ['inflected']);
      expect(fixtures.language.morphology.boundMorphemes).toHaveProperty('noun');
      expect(fixtures.language.morphology.boundMorphemes.noun).toHaveProperty('a b');
      expect(fixtures.language.morphology.boundMorphemes.noun['a b']).toEqual(['inflected']);
    })
  })

  describe('Language.updateWord (delegates to Vocabulary.updateWord)', () => {
    beforeEach(() => {
      fixtures.language = new Language('test');
    })
    
    it('should update a word in the language', () => {
      const wrd = new Word(1, { ascii: 'aaa', ipa: 'a a a', category: 'noun', lemmaId: -1 })
      fixtures.language.vocabulary.addWord(wrd);
      const updateWrd = wrd.clone();
      updateWrd.ipaParts = ['b', 'b', 'b'];
      fixtures.language.updateWord(updateWrd);
      expect(fixtures.language.vocabulary.words[0].ipa).toEqual('bbb');
    });
  })  

  describe('Language.updatePhoneme (delegates to Phonology.updatePhoneme)', () => {
    beforeEach(() => {
      fixtures.language = new Language('test');
    })
    
    it('should update a phoneme in the language', () => {
      const phoneme = new Phoneme({ id: 1, ipa: 'd', ascii: 'd', category: 'consonant', vectors: '[original]' });
      fixtures.language.addPhoneme(phoneme);
      const updatePhoneme = phoneme.clone();
      updatePhoneme.ipa = 'e';
      updatePhoneme.vectors = ['updated'];
      fixtures.language.updatePhoneme(updatePhoneme);
      expect(fixtures.language.phonology.phonemes[0].ipa).toEqual('e');
      expect(fixtures.language.phonology.phonemes[0].vectors).toEqual(['updated']);
    });
  })  

  describe('Language.updatePhoneMap (delegates to Phonology.updatePhoneMap)', () => {
    beforeEach(() => {
      fixtures.language = new Language('test');
    })
    
    it('should update a phoneMap in the language', () => {
      const phoneMap = new PhoneMap(1, 'a _ c', 'b', 'c');
      fixtures.language.addPhoneMap(phoneMap);
      const updatePhoneMap = phoneMap.clone();
      updatePhoneMap.targetPhoneme = 'd';
      fixtures.language.updatePhoneMap(updatePhoneMap);

      expect(fixtures.language.phonology.mutations[0].targetPhoneme).toEqual('d');

    });
  })  
  describe('Language.updateInflection (delegates to Morphology.updateBoundMorpheme)', () => {
    beforeEach(() => {
      fixtures.language = new Language('test');
    })
    
    it('should update a bound morpheme in the language', () => {
      fixtures.language.addInflection('a b', 'verb', ['inflected']);
      fixtures.language.updateInflection('a b', 'verb', ['doubleInflected']);
      expect(fixtures.language.morphology.boundMorphemes['verb']['a b']).toEqual(['doubleInflected']);

    });
  })  

  describe('Language.getWord (delegates to Vocabulary.lookup)', () => {
    beforeEach(() => {
      fixtures.language = new Language('test');

      fixtures.phonemes.forEach((phoneme: Phoneme) => {
        fixtures.language.addPhoneme(phoneme);
      })

      fixtures.phoneMaps.forEach((phoneMap: PhoneMap) => {
        fixtures.language.addPhoneMap(phoneMap);
      })

      fixtures.words.forEach((word: Word) => {
        fixtures.language.vocabulary.addWord(word);
      })

      fixtures.language.addInflection('a b', 'noun', ['inflected'])
    });

    it('should return an empty array when looking up an empty string', () => {
      const result = fixtures.language.getWord('');
      expect(result).toEqual([]);
    });

    it('should return an empty array when looking up an unknown word', () => {
      const result = fixtures.language.getWord('def');
      expect(result).toEqual([]);
    });

    it('should return the correct word', () => {
      const result = fixtures.language.getWord('abc');
      expect(result).toEqual([fixtures.language.vocabulary.words[0]]);
    });

    it('should return multiple words if the word has multiple categories', () => {
      const result = fixtures.language.getWord('cab');
      expect(result).toEqual([
        fixtures.language.vocabulary.words[3],
        fixtures.language.vocabulary.words[4]
      ]);
    });
  });

  describe('Language.getPhoneme (delegates to Phonology.lookupPhoneme)', () => {
    beforeEach(() => {
      fixtures.language = new Language('test');
      fixtures.phonemes.forEach((phoneme: Phoneme) => {
        fixtures.language.addPhoneme(phoneme);
      })


    })
    
    it('should return an empty array when looking up an empty string', () => {
      const result = fixtures.language.getPhoneme('');
      expect(result).toEqual([]);
    });

    it('should return an empty array when looking up an unknown phoneme', () => {
      const result = fixtures.language.getPhoneme('d');
      expect(result).toEqual([]);
    });

    it('should return the correct phoneme', () => {
      const result = fixtures.language.getPhoneme('a');
      expect(result).toEqual([fixtures.phonemes[0]]);
    });
  })

  describe('Language.getPhoneMap (delegates to Phonology.lookupPhoneMap)', () => {
    beforeEach(() => {
      fixtures.language = new Language('test');
      fixtures.phoneMaps.forEach((phoneMap: PhoneMap) => {
        fixtures.language.addPhoneMap(phoneMap);
      })
    })
    
    it('should return an empty array when looking up an empty string', () => {
      const result = fixtures.language.getPhoneMap('');
      expect(result).toEqual([]);
    });

    it('should return an empty array when looking up an unknown phoneMap', () => {
      const result = fixtures.language.getPhoneMap('f _ g');
      expect(result).toEqual([]);
    });

    it('should return the correct phoneMap', () => {
      const result = fixtures.language.getPhoneMap('a _ c');
      expect(result).toEqual([fixtures.phoneMaps[0]]);
    }); 

    it('should return multiple phoneMaps if the phoneMap has multiple categories', () => {
      const result = fixtures.language.getPhoneMap('b _ c');
      expect(result).toEqual([
        fixtures.phoneMaps[1],
        fixtures.phoneMaps[2]
      ]);
    });
  })

  describe('Language.getInflections (delegates to Phonology.cacheToMorpheme)', () => {
    beforeEach(() => {
      fixtures.language = new Language('test');
      fixtures.inflections.forEach((infl:Morpheme) => {
        infl.characteristics = ['inflected'];
        fixtures.language.addInflection(infl.ipaParts.join(' '), 'bound', ['inflected']);
      })
    })

    it('should return an empty array when looking up an empty string', () => {
      const result = fixtures.language.getInflections('');
      expect(result).toEqual([]);
    });

    it('should return an empty array when looking up an unknown inflection', () => {
      const result = fixtures.language.getInflections('d');
      expect(result).toEqual([]);
    });
    
    it('should return the correct inflection', () => {
      const result = fixtures.language.getInflections('a b');
      expect(result).toEqual([fixtures.inflections[0]]);
    });

    it('should return multiple inflections if the inflection has multiple categories', () => {
      const result = fixtures.language.getInflections('c a');
      expect(result).toEqual([
        fixtures.inflections[1], 
        fixtures.inflections[2]
      ]);
    });
  })

  describe('Language.decompose (delegates to Phonology.decompose and Morphology.decompose)', () => {
    beforeEach(() => {
      fixtures.language = new Language('test');

      fixtures.phonemes.forEach((phoneme: Phoneme) => {
        fixtures.language.addPhoneme(phoneme);
      })

      fixtures.inflections.forEach((infl:Morpheme) => {
        infl.characteristics = ['inflected'];
        fixtures.language.addInflection(infl.ipaParts.join(' '), 'verb', ['inflected']);
      })

      fixtures.words.forEach((word: Word) => {
        fixtures.language.vocabulary.addWord(word);
      })
    })

    it('should decompose a word into phonemes.', () => {
      const result = fixtures.language.decompose(fixtures.words[0]);
      expect(result.phonemes).toEqual([
        fixtures.phonemes[0],
        fixtures.phonemes[1],
        fixtures.phonemes[2]
      ]);
    });

    it('should decompose a word into morphemes.', () => {
      const result = fixtures.language.decompose(fixtures.words[5]);
      expect(result.morphemes[0].category).toEqual("noun");
      expect(result.morphemes[0].characteristics).toEqual([]);
      expect(result.morphemes[1].category).toEqual("bound");
      expect(result.morphemes[1].characteristics).toEqual(['inflected']);
    });
  })  

  describe('Language.mutate (delegates to Phonology.mutate and Morphology.mutate)', () => {
    beforeEach(() => {
      fixtures.language = new Language('test');

      fixtures.words.forEach((word: Word) => {
        fixtures.language.addWord(word);
      })

      fixtures.phonemes.forEach((phoneme: Phoneme) => {
        fixtures.language.addPhoneme(phoneme);
      })

      fixtures.phoneMaps.forEach((phoneMap: PhoneMap) => {
        fixtures.language.addPhoneMap(phoneMap);
      })
    })
    it('should mutate a word in the language', () => {
      const result = fixtures.language.mutate('Phonology', fixtures.words[0]);
      expect(result.ipa).toEqual('acc');
      expect(result.id).toEqual(fixtures.words[0].id);
    });
    
    
  })  

})