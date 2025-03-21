import { Phoneme } from '../classes/phonology/Phoneme';

describe('Phoneme', () => {
  describe('constructor', () => {
    it('should create a phoneme with the given properties', () => {
      const phoneme = new Phoneme({
        id: 1,
        ipa: 'a',
        ascii: 'a',
        category: 'vowel',
        vectors: '[open&front&unrounded]'
      });

      expect(phoneme.id).toBe(1);
      expect(phoneme.ipa).toBe('a');
      expect(phoneme.ascii).toBe('a');
      expect(phoneme.category).toBe('vowel');
      expect(phoneme.vectors).toEqual(['open', 'front', 'unrounded']);
    });

    it('should parse vectors string into array', () => {
      const phoneme = new Phoneme({
        id: 1,
        ipa: 'b',
        ascii: 'b',
        category: 'consonant',
        vectors: '[bilabial&plosive&voiced]'
      });

      expect(phoneme.vectors).toEqual(['bilabial', 'plosive', 'voiced']);
    });
  });

  describe('clone()', () => {
    it('should create a deep copy of the phoneme', () => {
      const original = new Phoneme({
        id: 1,
        ipa: 'a',
        ascii: 'a',
        category: 'vowel',
        vectors: '[open&front&unrounded]'
      });

      const clone = original.clone();

      expect(clone).not.toBe(original); // Different object reference
      expect(clone.id).toBe(original.id);
      expect(clone.ipa).toBe(original.ipa);
      expect(clone.ascii).toBe(original.ascii);
      expect(clone.category).toBe(original.category);
      expect(clone.vectors).toEqual(original.vectors);
    });

    it('should create a new vectors array in cloned phoneme', () => {
      const original = new Phoneme({
        id: 1,
        ipa: 'a',
        ascii: 'a',
        category: 'vowel',
        vectors: '[open&front&unrounded]'
      });

      const clone = original.clone();
      clone.vectors[0] = 'close';

      expect(original.vectors[0]).toBe('open'); // Original should be unchanged
      expect(clone.vectors[0]).toBe('close');
    });
  });

  describe('static fromLine()', () => {
    it('should create a phoneme from a formatted line', () => {
      const line = '1;a;a;vowel;[open&front&unrounded]';
      const phoneme = Phoneme.fromLine(line);

      expect(phoneme).not.toBeNull();
      expect(phoneme?.id).toBe(1);
      expect(phoneme?.ipa).toBe('a');
      expect(phoneme?.ascii).toBe('a');
      expect(phoneme?.category).toBe('vowel');
      expect(phoneme?.vectors).toEqual(['open', 'front', 'unrounded']);
    });

    it('should return null for invalid line format', () => {
      const invalidLine = '1;a;a;vowel'; // Missing vectors
      const phoneme = Phoneme.fromLine(invalidLine);

      expect(phoneme).toBeNull();
    });
  });

  describe('toLine()', () => {
    it('should convert phoneme to formatted line string', () => {
      const phoneme = new Phoneme({
        id: 1,
        ipa: 'a',
        ascii: 'a',
        category: 'vowel',
        vectors: '[open&front&unrounded]'
      });

      const line = phoneme.toLine();
      expect(line).toBe('1;a;a;vowel;[open&front&unrounded]');
    });
  });

  describe('edge cases', () => {
    it('should handle empty vectors string', () => {
      const phoneme = new Phoneme({
        id: 1,
        ipa: 'a',
        ascii: 'a',
        category: 'vowel',
        vectors: '[]'
      });

      expect(phoneme.vectors).toEqual([]);
    });

    it('should handle single vector', () => {
      const phoneme = new Phoneme({
        id: 1,
        ipa: 'a',
        ascii: 'a',
        category: 'vowel',
        vectors: '[open]'
      });

      expect(phoneme.vectors).toEqual(['open']);
    });
  });
}); 