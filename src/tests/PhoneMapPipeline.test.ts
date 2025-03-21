import { PhoneMapPipeline } from '../classes/phonology/PhoneMapPipeline';
import { PhoneMap } from '../classes/phonology/PhoneMap';
import { Word } from '../classes/shared/word';
import { Phoneme } from '../classes/phonology/Phoneme';

describe('PhoneMapPipeline', () => {
  let testPhonemes: Phoneme[];
  let testWord: Word;

  beforeEach(() => {
    // Setup common test phonemes
    testPhonemes = [
      new Phoneme({ id: 1, ipa: 'a', ascii: 'a', category: 'vowel', vectors: '[open&front&unrounded]' }),
      new Phoneme({ id: 2, ipa: 'b', ascii: 'b', category: 'consonant', vectors: '[bilabial&plosive&voiced]' }),
      new Phoneme({ id: 3, ipa: 'c', ascii: 'c', category: 'consonant', vectors: '[palatal&plosive&voiceless]' }),
      new Phoneme({ id: 4, ipa: 'd', ascii: 'd', category: 'consonant', vectors: '[alveolar&plosive&voiced]' })
    ];

    testWord = new Word(1, {
      ascii: 'abc',
      ipa: 'a b c',
      category: 'noun',
      lemmaId: -1
    });
  });

  describe('constructor', () => {
    it('should create a pipeline with the given rules', () => {
      const rules = [
        new PhoneMap(1, 'a _ c', 'b', 'd')
      ];
      const pipeline = new PhoneMapPipeline(rules);

      expect(pipeline.rules).toEqual(rules);
    });

    it('should accept an empty ruleset', () => {
      const pipeline = new PhoneMapPipeline([]);
      expect(pipeline.rules).toEqual([]);
    });
  });

  describe('run()', () => {
    it('should apply a single rule correctly', () => {
      const rules = [
        new PhoneMap(1, 'a _ c', 'b', 'd')
      ];
      const pipeline = new PhoneMapPipeline(rules);

      const result = pipeline.run(testWord, testPhonemes);
      expect(result.ipaParts).toEqual(['a', 'd', 'c']);
    });

    it('should apply multiple rules in sequence', () => {
      const rules = [
        new PhoneMap(1, 'a _ c', 'b', 'd'),
        new PhoneMap(2, 'a _ c', 'c', 'd')
      ];
      const pipeline = new PhoneMapPipeline(rules);

      const result = pipeline.run(testWord, testPhonemes);
      expect(result.ipaParts).toEqual(['a', 'd', 'c']);
    });

    it('should not modify the input word', () => {
      const rules = [
        new PhoneMap(1, 'a _ c', 'b', 'd')
      ];
      const pipeline = new PhoneMapPipeline(rules);

      const originalIpaParts = [...testWord.ipaParts];
      pipeline.run(testWord, testPhonemes);
      
      expect(testWord.ipaParts).toEqual(originalIpaParts);
    });

    it('should handle empty ruleset', () => {
      const pipeline = new PhoneMapPipeline([]);
      const result = pipeline.run(testWord, testPhonemes);
      
      expect(result.ipaParts).toEqual(testWord.ipaParts);
      expect(result).not.toBe(testWord); // Should still return a clone
    });

    it('should handle rules that don\'t match any phonemes', () => {
      const rules = [
        new PhoneMap(1, 'x _ y', 'z', 'w') // Rule that won't match anything
      ];
      const pipeline = new PhoneMapPipeline(rules);

      const result = pipeline.run(testWord, testPhonemes);
      expect(result.ipaParts).toEqual(testWord.ipaParts);
    });

    it('should handle multiple rules where later rules depend on earlier ones', () => {
      const word = new Word(1, {
        ascii: 'abcd',
        ipa: 'a b c d',
        category: 'noun',
        lemmaId: -1
      });

      const rules = [
        new PhoneMap(1, 'a _ c', 'b', 'd'), // abc -> adc
        new PhoneMap(2, 'd _ d', 'c', 'b')  // adc -> adb
      ];
      const pipeline = new PhoneMapPipeline(rules);

      const result = pipeline.run(word, testPhonemes);
      expect(result.ipaParts).toEqual(['a', 'd', 'b', 'd']);
    });

    it('should preserve word properties other than ipaParts', () => {
      const rules = [
        new PhoneMap(1, 'a _ c', 'b', 'd')
      ];
      const pipeline = new PhoneMapPipeline(rules);

      const result = pipeline.run(testWord, testPhonemes);
      expect(result.id).toBe(testWord.id);
      expect(result.category).toBe(testWord.category);
      expect(result.lemmaId).toBe(testWord.lemmaId);
    });
  });
}); 