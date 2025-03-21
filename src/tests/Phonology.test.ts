import { Phonology } from '../classes/phonology/Phonology';
import { Phoneme } from '../classes/phonology/Phoneme';
import { PhoneMap } from '../classes/phonology/PhoneMap';
import { Word } from '../classes/shared/word';

describe('Phonology', () => {
  let phonology: Phonology;
  let testPhonemes: Phoneme[];
  let testPhoneMaps: PhoneMap[];

  beforeEach(() => {
    phonology = new Phonology();
    testPhonemes = [
      new Phoneme({ id: 1, ipa: 'a', ascii: 'a', category: 'vowel', vectors: '[open&front&unrounded]' }),
      new Phoneme({ id: 2, ipa: 'b', ascii: 'b', category: 'consonant', vectors: '[bilabial&plosive&voiced]' }),
      new Phoneme({ id: 3, ipa: 'c', ascii: 'c', category: 'consonant', vectors: '[palatal&plosive&voiceless]' })
    ];
    testPhoneMaps = [
      new PhoneMap(1, 'a _ c', 'b', 'c'),
      new PhoneMap(2, '[vowel] _ c', 'b', 'd')
    ];
  });

  describe('Phoneme Management', () => {
    describe('addPhoneme()', () => {
      it('should add a phoneme to the phonology', () => {
        phonology.addPhoneme(testPhonemes[0]);
        expect(phonology.phonemes).toContain(testPhonemes[0]);
      });
    });

    describe('updatePhoneme()', () => {
      it('should update an existing phoneme', () => {
        phonology.addPhoneme(testPhonemes[0]);
        const updatedPhoneme = new Phoneme({ 
          id: 1, 
          ipa: 'æ', 
          ascii: 'ae', 
          category: 'vowel', 
          vectors: '[open&front&unrounded]' 
        });
        
        phonology.updatePhoneme(updatedPhoneme);
        expect(phonology.phonemes[0].ipa).toBe('æ');
        expect(phonology.phonemes[0].ascii).toBe('ae');
      });

      it('should not modify other phonemes when updating', () => {
        testPhonemes.forEach(p => phonology.addPhoneme(p));
        const updatedPhoneme = new Phoneme({ 
          id: 1, 
          ipa: 'æ', 
          ascii: 'ae', 
          category: 'vowel', 
          vectors: '[open&front&unrounded]' 
        });
        
        phonology.updatePhoneme(updatedPhoneme);
        expect(phonology.phonemes[1]).toBe(testPhonemes[1]);
      });
    });

    describe('lookupPhoneme()', () => {
      it('should find phonemes by IPA key', () => {
        testPhonemes.forEach(p => phonology.addPhoneme(p));
        const results = phonology.lookupPhoneme('a');
        expect(results).toHaveLength(1);
        expect(results[0]).toBe(testPhonemes[0]);
      });

      it('should return empty array when no matches found', () => {
        testPhonemes.forEach(p => phonology.addPhoneme(p));
        const results = phonology.lookupPhoneme('x');
        expect(results).toHaveLength(0);
      });
    });
  });

  describe('PhoneMap Management', () => {
    describe('addPhoneMap()', () => {
      it('should add a phoneMap to the phonology', () => {
        phonology.addPhoneMap(testPhoneMaps[0]);
        expect(phonology.mutations).toContain(testPhoneMaps[0]);
      });
    });

    describe('updatePhoneMap()', () => {
      it('should update an existing phoneMap', () => {
        phonology.addPhoneMap(testPhoneMaps[0]);
        const updatedPhoneMap = new PhoneMap(1, 'a _ c', 'b', 'd');
        
        phonology.updatePhoneMap(updatedPhoneMap);
        expect(phonology.mutations[0].mapToPhoneme).toBe('d');
      });
    });

    describe('lookupPhoneMap()', () => {
      it('should find phoneMaps by environment', () => {
        testPhoneMaps.forEach(m => phonology.addPhoneMap(m));
        const results = phonology.lookupPhoneMap('a _ c');
        expect(results).toHaveLength(1);
        expect(results[0]).toBe(testPhoneMaps[0]);
      });
    });
  });

  describe('Word Processing', () => {
    describe('decompose()', () => {
      it('should break word into constituent phonemes', () => {
        testPhonemes.forEach(p => phonology.addPhoneme(p));
        const word = new Word(1, { 
          ascii: 'abc', 
          ipa: 'a b c', 
          category: 'noun', 
          lemmaId: -1 
        });

        const result = phonology.decompose(word);
        expect(result).toHaveLength(3);
        expect(result[0].ipa).toBe('a');
        expect(result[1].ipa).toBe('b');
        expect(result[2].ipa).toBe('c');
      });

      it('should return cloned phonemes', () => {
        testPhonemes.forEach(p => phonology.addPhoneme(p));
        const word = new Word(1, { 
          ascii: 'abc', 
          ipa: 'a b c', 
          category: 'noun', 
          lemmaId: -1 
        });

        const result = phonology.decompose(word);
        expect(result[0]).not.toBe(testPhonemes[0]);
      });
    });

    describe('mutate()', () => {
      it('should apply phonological rules to word', () => {
        testPhonemes.forEach(p => phonology.addPhoneme(p));
        const word = new Word(1, { 
          ascii: 'abc', 
          ipa: 'a b c', 
          category: 'noun', 
          lemmaId: -1 
        });

        const result = phonology.mutate(word, testPhoneMaps);
        expect(result.ipaParts).toEqual(['a', 'c', 'c']);
        expect(result.ascii).toBe('acc');
      });

      it('should not modify original word', () => {
        testPhonemes.forEach(p => phonology.addPhoneme(p));
        const word = new Word(1, { 
          ascii: 'abc', 
          ipa: 'a b c', 
          category: 'noun', 
          lemmaId: -1 
        });
        const originalIpa = [...word.ipaParts];

        phonology.mutate(word, testPhoneMaps);
        expect(word.ipaParts).toEqual(originalIpa);
      });
    });
  });

  describe('Serialization', () => {
    describe('toTable()', () => {
      it('should generate formatted table string', async () => {
        testPhonemes.forEach(p => phonology.addPhoneme(p));
        testPhoneMaps.forEach(m => phonology.addPhoneMap(m));

        const table = await phonology.toTable();
        expect(table).toContain('### PHONEMES');
        expect(table).toContain('### MUTATIONS');
        expect(table).toContain(testPhonemes[0].toLine());
        expect(table).toContain(testPhoneMaps[0].toLine());
      });
    });
  });
}); 