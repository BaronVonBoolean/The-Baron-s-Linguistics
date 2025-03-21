import { Word } from '../classes/shared/word';

describe('Word', () => {
  describe('constructor', () => {
    it('should create a word with the given properties', () => {
      const word = new Word(1, {
        ascii: 'test',
        ipa: 't e s t',
        category: 'noun',
        lemmaId: -1
      });

      expect(word.id).toBe(1);
      expect(word.ascii).toBe('test');
      expect(word.ipa).toBe('test');
      expect(word.category).toBe('noun');
      expect(word.lemmaId).toBe(-1);
    });

    it('should split IPA string into ipaParts', () => {
      const word = new Word(1, {
        ascii: 'test',
        ipa: 't e s t',
        category: 'noun',
        lemmaId: -1
      });

      expect(word.ipaParts).toEqual(['t', 'e', 's', 't']);
    });
  });

  describe('clone()', () => {
    it('should create a deep copy of the word', () => {
      const original = new Word(1, {
        ascii: 'test',
        ipa: 't e s t',
        category: 'noun',
        lemmaId: -1
      });

      const clone = original.clone();

      expect(clone).not.toBe(original); // Different object reference
      expect(clone.id).toBe(original.id);
      expect(clone.ascii).toBe(original.ascii);
      expect(clone.ipa).toBe(original.ipa);
      expect(clone.category).toBe(original.category);
      expect(clone.lemmaId).toBe(original.lemmaId);
      expect(clone.ipaParts).toEqual(original.ipaParts);
    });

    it('should create a new ipaParts array in cloned word', () => {
      const original = new Word(1, {
        ascii: 'test',
        ipa: 't e s t',
        category: 'noun',
        lemmaId: -1
      });

      const clone = original.clone();
      clone.ipaParts[0] = 'x';

      expect(original.ipaParts[0]).toBe('t'); // Original should be unchanged
      expect(clone.ipaParts[0]).toBe('x');
    });
  });

  describe('lemma handling', () => {
    it('should allow setting a lemma reference', () => {
      const lemma = new Word(1, {
        ascii: 'run',
        ipa: 'r ʌ n',
        category: 'verb',
        lemmaId: -1
      });

      const inflected = new Word(2, {
        ascii: 'running',
        ipa: 'r ʌ n ɪ ŋ',
        category: 'verb',
        lemmaId: 1
      });

      inflected.lemma = lemma;

      expect(inflected.lemma).toBe(lemma);
      expect(inflected.lemmaId).toBe(lemma.id);
    });
  });

  describe('ipaParts manipulation', () => {
    it('should update ipa string when ipaParts is modified', () => {
      const word = new Word(1, {
        ascii: 'test',
        ipa: 't e s t',
        category: 'noun',
        lemmaId: -1
      });

      word.ipaParts = ['t', 'æ', 's', 't'];
      expect(word.ipa).toBe('tæst');
    });
  });

  describe('edge cases', () => {
    it('should handle empty IPA string', () => {
      const word = new Word(1, {
        ascii: '',
        ipa: '',
        category: 'noun',
        lemmaId: -1
      });

      expect(word.ipaParts).toEqual([]);
    });

    it('should handle single phoneme IPA string', () => {
      const word = new Word(1, {
        ascii: 'a',
        ipa: 'a',
        category: 'noun',
        lemmaId: -1
      });

      expect(word.ipaParts).toEqual(['a']);
    });
  });
}); 