import { PhoneMap } from '../classes/phonology/PhoneMap';
import { Word } from '../classes/shared/word';
import { Phoneme } from '../classes/phonology/Phoneme';

describe('PhoneMap', () => {
  let testPhonemes: Phoneme[];

  beforeEach(() => {
    // Setup common test phonemes
    testPhonemes = [
      new Phoneme({ id: 1, ipa: 'a', ascii: 'a', category: 'vowel', vectors: '[open&front&unrounded]' }),
      new Phoneme({ id: 2, ipa: 'b', ascii: 'b', category: 'consonant', vectors: '[bilabial&plosive&voiced]' }),
      new Phoneme({ id: 3, ipa: 'c', ascii: 'c', category: 'consonant', vectors: '[palatal&plosive&voiceless]' })
    ];
  });

  describe('constructor', () => {
    it('should create a PhoneMap with the given properties', () => {
      const phoneMap = new PhoneMap(1, 'a _ c', 'b', 'c');

      expect(phoneMap.id).toBe(1);
      expect(phoneMap.environment).toBe('a _ c');
      expect(phoneMap.targetPhoneme).toBe('b');
      expect(phoneMap.mapToPhoneme).toBe('c');
    });
  });

  describe('clone()', () => {
    it('should create a deep copy of the PhoneMap', () => {
      const original = new PhoneMap(1, 'a _ c', 'b', 'c');
      const clone = original.clone();

      expect(clone).not.toBe(original);
      expect(clone.id).toBe(original.id);
      expect(clone.environment).toBe(original.environment);
      expect(clone.targetPhoneme).toBe(original.targetPhoneme);
      expect(clone.mapToPhoneme).toBe(original.mapToPhoneme);
    });
  });

  describe('mutate()', () => {
    it('should return the mapped phoneme when valid', () => {
      const phoneMap = new PhoneMap(1, 'a _ c', 'b', 'c');
      const input = testPhonemes[1]; // 'b'
      const result = phoneMap.mutate(input, testPhonemes);

      expect(result.ipa).toBe('c');
    });

    it('should return the input phoneme when target or mapTo not found', () => {
      const phoneMap = new PhoneMap(1, 'a _ c', 'x', 'y');
      const input = testPhonemes[1]; // 'b'
      const result = phoneMap.mutate(input, testPhonemes);

      expect(result).toBe(input);
    });
  });

  describe('apply()', () => {
    it('should apply phonological rule to matching environment', () => {
      const phoneMap = new PhoneMap(1, 'a _ c', 'b', 'c');
      const word = new Word(1, { ascii: 'abc', ipa: 'a b c', category: 'noun', lemmaId: -1 });
      
      const result = phoneMap.apply(word, testPhonemes);
      expect(result.ipaParts).toEqual(['a', 'c', 'c']);
    });

    it('should not modify word when environment doesn\'t match', () => {
      const phoneMap = new PhoneMap(1, 'x _ y', 'b', 'c');
      const word = new Word(1, { ascii: 'abc', ipa: 'a b c', category: 'noun', lemmaId: -1 });
      
      const result = phoneMap.apply(word, testPhonemes);
      expect(result.ipaParts).toEqual(['a', 'b', 'c']);
    });
  });

  describe('toLine()', () => {
    it('should convert PhoneMap to formatted string', () => {
      const phoneMap = new PhoneMap(1, 'a _ c', 'b', 'c');
      expect(phoneMap.toLine()).toBe('a _ c -> b : c');
    });
  });

  describe('matchesEnvironment()', () => {
    it('should match literal phoneme environments', () => {
      const phoneMap = new PhoneMap(1, 'a _ c', 'b', 'c');
      const word = new Word(1, { ascii: 'abc', ipa: 'a b c', category: 'noun', lemmaId: -1 });
      
      expect(phoneMap.matchesEnvironment(word, 1, testPhonemes)).toBe(true);
    });

    it('should match [vowel] selector', () => {
      const phoneMap = new PhoneMap(1, '[vowel] _ c', 'b', 'c');
      const word = new Word(1, { ascii: 'abc', ipa: 'a b c', category: 'noun', lemmaId: -1 });
      
      expect(phoneMap.matchesEnvironment(word, 1, testPhonemes)).toBe(true);
    });

    it('should match [consonant] selector', () => {
      const phoneMap = new PhoneMap(1, 'a _ [consonant]', 'b', 'c');
      const word = new Word(1, { ascii: 'abc', ipa: 'a b c', category: 'noun', lemmaId: -1 });
      
      expect(phoneMap.matchesEnvironment(word, 1, testPhonemes)).toBe(true);
    });

    it('should match * (wildcard) selector', () => {
      const phoneMap = new PhoneMap(1, '* _ c', 'b', 'c');
      const word = new Word(1, { ascii: 'abc', ipa: 'a b c', category: 'noun', lemmaId: -1 });
      
      expect(phoneMap.matchesEnvironment(word, 1, testPhonemes)).toBe(true);
    });

    it('should handle word boundaries correctly', () => {
      const phoneMap = new PhoneMap(1, '# _ c', 'b', 'c');
      const word = new Word(1, { ascii: 'bc', ipa: 'b c', category: 'noun', lemmaId: -1 });
      
      expect(phoneMap.matchesEnvironment(word, 0, testPhonemes)).toBe(true);
    });

    it('should return false for invalid environment format', () => {
      const phoneMap = new PhoneMap(1, 'invalid', 'b', 'c');
      const word = new Word(1, { ascii: 'abc', ipa: 'a b c', category: 'noun', lemmaId: -1 });
      
      expect(phoneMap.matchesEnvironment(word, 1, testPhonemes)).toBe(false);
    });
  });

  describe('feature selectors', () => {
    // Test each feature selector
    const featureTests = [
      { name: 'plosive', vector: '[plosive]', matchPhoneme: 'b' },
      { name: 'voiced', vector: '[voiced]', matchPhoneme: 'b' },
      { name: 'voiceless', vector: '[voiceless]', matchPhoneme: 'c' },
      { name: 'bilabial', vector: '[bilabial]', matchPhoneme: 'b' },
      { name: 'palatal', vector: '[palatal]', matchPhoneme: 'c' }
    ];

    featureTests.forEach(({ name, vector, matchPhoneme }) => {
      it(`should match [${name}] selector`, () => {
        const phoneMap = new PhoneMap(1, `${vector} _ c`, matchPhoneme, 'c');
        const word = new Word(1, { 
          ascii: `${matchPhoneme}c`, 
          ipa: `${matchPhoneme} c`, 
          category: 'noun', 
          lemmaId: -1 
        });
        
        expect(phoneMap.matchesEnvironment(word, 0, testPhonemes)).toBe(true);
      });
    });
  });
}); 