import { Word } from "../classes/shared/word";
import { Phoneme } from "../classes/phonology/Phoneme";
import { PhoneMap } from "../classes/phonology/PhoneMap";
import { Language } from "../classes/language/Language";
import ConfigOps from "../classes/shared/ConfigOps";

const fixtures: { [x: string]: any } = {
  language: null,
  phonemes: [
    new Phoneme({ id: 1, ipa: 'a', ascii: 'a', category: 'vowel', vectors: '[open&front&unrounded]' }),
    new Phoneme({ id: 2, ipa: 'e', ascii: 'e', category: 'vowel', vectors: '[closemid&front&unrounded]' }),
    new Phoneme({ id: 3, ipa: 'i', ascii: 'i', category: 'vowel', vectors: '[close&front&unrounded]' }),
    new Phoneme({ id: 4, ipa: 'o', ascii: 'o', category: 'vowel', vectors: '[closemid&back&rounded]' }),
    new Phoneme({ id: 5, ipa: 'u', ascii: 'u', category: 'vowel', vectors: '[close&back&rounded]' }),
    new Phoneme({ id: 6, ipa: 'æ', ascii: 'a', category: 'vowel', vectors: '[openMid&front&unrounded]' }),
    new Phoneme({ id: 7, ipa: 'ə', ascii: 'u', category: 'vowel', vectors: '[mid&front&unrounded]' }),

    new Phoneme({ id: 6, ipa: 'b', ascii: 'b', category: 'consonant', vectors: '[bilabial&plosive&voiced]' }),
    new Phoneme({ id: 7, ipa: 'c', ascii: 'c', category: 'consonant', vectors: '[palatal&plosive&unvoiced]' }),
    new Phoneme({ id: 8, ipa: 'd', ascii: 'd', category: 'consonant', vectors: '[alveolar&plosive&voiced]' }),
    new Phoneme({ id: 9, ipa: 'f', ascii: 'f', category: 'consonant', vectors: '[labiodental&fricative&voiceless]' }),
    new Phoneme({ id: 10, ipa: 'g', ascii: 'g', category: 'consonant', vectors: '[velar&plosive&voiced]' }),
    new Phoneme({ id: 11, ipa: 'h', ascii: 'h', category: 'consonant', vectors: '[glottal&fricative&voiceless]' }),
    new Phoneme({ id: 12, ipa: 'k', ascii: 'k', category: 'consonant', vectors: '[velar&plosive&voiceless]' }),
    new Phoneme({ id: 13, ipa: 'l', ascii: 'l', category: 'consonant', vectors: '[alveolar&lateral&approximant&voiced]' }),
    new Phoneme({ id: 14, ipa: 'm', ascii: 'm', category: 'consonant', vectors: '[bilabial&nasal&voiced]' }),
    new Phoneme({ id: 15, ipa: 'n', ascii: 'n', category: 'consonant', vectors: '[alveolar&nasal&voiced]' }),
    new Phoneme({ id: 16, ipa: 'p', ascii: 'p', category: 'consonant', vectors: '[bilabial&plosive&voiceless]' }),
    new Phoneme({ id: 17, ipa: 'r', ascii: 'r', category: 'consonant', vectors: '[alveolar&trill&voiced]' }),
    new Phoneme({ id: 18, ipa: 's', ascii: 's', category: 'consonant', vectors: '[alveolar&fricative&voiceless]' }),
    new Phoneme({ id: 19, ipa: 't', ascii: 't', category: 'consonant', vectors: '[alveolar&plosive&voiceless]' }),
    new Phoneme({ id: 20, ipa: 'v', ascii: 'v', category: 'consonant', vectors: '[labiodental&fricative&voiced]' }),
    new Phoneme({ id: 21, ipa: 'w', ascii: 'w', category: 'consonant', vectors: '[bilabial&approximant&voiced]' }),
    new Phoneme({ id: 22, ipa: 'x', ascii: 'x', category: 'consonant', vectors: '[velar&fricative&voiceless]' }),
    new Phoneme({ id: 23, ipa: 'z', ascii: 'z', category: 'consonant', vectors: '[alveolar&fricative&voiced]' }),
    new Phoneme({ id: 24, ipa: 'ʃ', ascii: 'sh', category: 'consonant', vectors: '[postalveolar&fricative&voiceless]' }),
    new Phoneme({ id: 25, ipa: 'ʒ', ascii: 'zh', category: 'consonant', vectors: '[postalveolar&fricative&voiced]' }),
    new Phoneme({ id: 26, ipa: 'θ', ascii: 'th', category: 'consonant', vectors: '[dental&fricative&voiceless]' }),
    new Phoneme({ id: 27, ipa: 'ð', ascii: 'dh', category: 'consonant', vectors: '[dental&fricative&voiced]' }),
    new Phoneme({ id: 28, ipa: 'ŋ', ascii: 'ng', category: 'consonant', vectors: '[velar&nasal&voiced]' }),
    new Phoneme({ id: 29, ipa: 'j', ascii: 'y', category: 'consonant', vectors: '[palatal&approximant&voiced]' }),
    new Phoneme({ id: 30, ipa: 'ɪ', ascii: 'i', category: 'vowel', vectors: '[closeMid&front&unrounded]' }),
    new Phoneme({ id: 31, ipa: 'ʊ', ascii: 'u', category: 'vowel', vectors: '[closeMid&back&rounded]' }),
    new Phoneme({ id: 32, ipa: 'ɛ', ascii: 'e', category: 'vowel', vectors: '[openMid&front&unrounded]' }),
    new Phoneme({ id: 33, ipa: 'ɔ', ascii: 'o', category: 'vowel', vectors: '[openMid&back&rounded]' }),
    new Phoneme({ id: 34, ipa: 'ʌ', ascii: 'u', category: 'vowel', vectors: '[openMid&back&unrounded]' }),
    new Phoneme({ id: 35, ipa: 'ɒ', ascii: 'o', category: 'vowel', vectors: '[open&back&rounded]' }),
    new Phoneme({ id: 36, ipa: 'aɪ', ascii: 'ai', category: 'vowel', vectors: '[open&front&unrounded&diphthong]' }),
    new Phoneme({ id: 37, ipa: 'aʊ', ascii: 'au', category: 'vowel', vectors: '[open&back&rounded&diphthong]' }),
    new Phoneme({ id: 38, ipa: 'eɪ', ascii: 'ei', category: 'vowel', vectors: '[closeMid&front&unrounded&diphthong]' }),
    new Phoneme({ id: 39, ipa: 'oʊ', ascii: 'ou', category: 'vowel', vectors: '[closeMid&back&rounded&diphthong]' }),
    new Phoneme({ id: 40, ipa: 'ɔɪ', ascii: 'oi', category: 'vowel', vectors: '[openMid&back&rounded&diphthong]' }),
    new Phoneme({ id: 41, ipa: 'dʒ', ascii: 'j', category: 'consonant', vectors: '[postalveolar&affricate&voiced]' }),
    new Phoneme({ id: 42, ipa: 'tʃ', ascii: 'ch', category: 'consonant', vectors: '[postalveolar&affricate&voiceless]' }),
    new Phoneme({ id: 43, ipa: 'y', ascii: 'y', category: 'vowel', vectors: '[front&close&unrounded]' }),
    new Phoneme({ id: 44, ipa: 'ɾ', ascii: 'r', category: 'consonant', vectors: '[alveolar&trill&voiced]' }),
    new Phoneme({ id: 45, ipa: 'q', ascii: 'q', category: 'consonant', vectors: '[uvular&plosive&voiced]' }),
    new Phoneme({ id: 46, ipa: 'ʔ', ascii: '\'', category: 'consonant', vectors: '[glottal&plosive&voiceless]' }),
  ]
}

describe('Selectors', () => {
  beforeAll(() => {
    ConfigOps.setEnvironment('test');
  })

  beforeEach(() => {
    fixtures.language = new Language('Selectors-Test-Language');
    fixtures.phonemes.forEach((phoneme: Phoneme) => {
      fixtures.language.addPhoneme(phoneme);
    })
  })

  describe('Basic selectors', () => {
    it('should select by literal IPA symbols', () => {
      const wrd = new Word(1, { ascii: 'abc', ipa: 'a b c', category: 'noun', lemmaId: -1 });
      fixtures.language.addWord(wrd);
      fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ c', 'b', 'c'));
      const result = fixtures.language.mutate('Phonology', wrd);

      expect(result.ascii).toEqual('acc');
    })

    it('selector * should select all phonemes on left side of environment', () => {
      const wrd = new Word(1, { ascii: 'abc', ipa: 'a b c', category: 'noun', lemmaId: -1 });
      fixtures.language.addWord(wrd);
      fixtures.language.addPhoneMap(new PhoneMap(1, '* _ c', 'b', 'c'));
      const result = fixtures.language.mutate('Phonology', wrd);
      expect(result.ascii).toEqual('acc');
    })

    it('selector * should select all phonemes on right side of environment', () => {
      const wrd = new Word(1, { ascii: 'abc', ipa: 'a b c', category: 'noun', lemmaId: -1 });
      fixtures.language.addWord(wrd);
      fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ *', 'b', 'c'));
      const result = fixtures.language.mutate('Phonology', wrd);
      expect(result.ascii).toEqual('acc');
    })
  })

  describe('Category selectors', () => {
    describe('[vowel]', () => {
      it('should select only vowel phonemes (left-hand side)', () => {
        const wrd = new Word(4, { ascii: 'bade', ipa: 'b a d e', category: 'noun', lemmaId: -1 });
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[vowel] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('bace');
      })

      it('should select only vowel phonemes (right-hand side)', () => {
        const wrd = new Word(4, { ascii: 'bade', ipa: 'b a d e', category: 'noun', lemmaId: -1 });
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [vowel]', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('bace');
      })
    })

    describe('[consonant]', () => {
      it('should select only consonant phonemes (left-hand side)', () => {
        const wrd = new Word(4, { ascii: 'bade', ipa: 'b a d e', category: 'noun', lemmaId: -1 });
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[consonant] _ d', 'a', 'e'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('bede');
      })

      it('should select only consonant phonemes (right-hand side)', () => {
        const wrd = new Word(4, { ascii: 'bade', ipa: 'b a d e', category: 'noun', lemmaId: -1 });
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'b _ [consonant]', 'a', 'o'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('bode');
      })
    })
  })

  describe('Height selectors', () => {
    describe('[open]', () => {
      it('should select only phonemes with the "open" vector (left-hand side)', () => {
        const wrd = new Word(7, { ascii: 'abade', ipa: 'a b a d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[open] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('abace');
      })

      it('should select only consonant phonemes (right-hand side)', () => {
        const wrd = new Word(7, { ascii: 'abade', ipa: 'a b æ d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [open]', 'b', 'd'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('adade');
      })
    })

    describe('[openMid]', () => {
      it('should select only phonemes with the "openMid" vector (left-hand side)', () => {
        const wrd = new Word(7, { ascii: 'abade', ipa: 'a b æ d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[openMid] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('abace');
      })

      it('should select only phonemes with the "openMid" vector (right-hand side)', () => {
        const wrd = new Word(7, { ascii: 'abade', ipa: 'a b æ d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [openMid]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acade');
      })
    })

    describe('[mid]', () => {
      it('should select only phonemes with the "mid" vector (left-hand side)', () => {
        const wrd = new Word(8, { ascii: 'abude', ipa: 'a b ə d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[mid] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('abuce');
      })

      it('should select only phonemes with the "mid" vector (right-hand side)', () => {
        const wrd = new Word(8, { ascii: 'abude', ipa: 'a b ə d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [mid]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acude');
      })
    })

    describe('[closeMid]', () => {
      it('should select only phonemes with the "closeMid" vector (left-hand side)', () => {
        const wrd = new Word(9, { ascii: 'abede', ipa: 'a b e d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[closeMid] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('abece');
      })

      it('should select only phonemes with the "closeMid" vector (right-hand side)', () => {
        const wrd = new Word(9, { ascii: 'abede', ipa: 'a b e d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [closeMid]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acede');
      })
    })

    describe('[close]', () => {
      it('should select only phonemes with the "close" vector (left-hand side)', () => {
        const wrd = new Word(10, { ascii: 'abide', ipa: 'a b i d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[close] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('abice');
      })

      it('should select only phonemes with the "close" vector (right-hand side)', () => {
        const wrd = new Word(10, { ascii: 'abide', ipa: 'a b i d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [close]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acide');
      })
    })
  })

  describe('Position selectors', () => {
    describe('[front]', () => {
      it('should select only phonemes with the "front" vector (left-hand side)', () => {
        const wrd = new Word(11, { ascii: 'abide', ipa: 'a b i d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[front] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('abice');
      })

      it('should select only phonemes with the "front" vector (right-hand side)', () => {
        const wrd = new Word(11, { ascii: 'abide', ipa: 'a b i d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [front]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acide');
      })
    })

    describe('[central]', () => {
      it('should select only phonemes with the "central" vector (left-hand side)', () => {
        const wrd = new Word(12, { ascii: 'abude', ipa: 'a b ə d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[central] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('abuce');
      })

      it('should select only phonemes with the "central" vector (right-hand side)', () => {
        const wrd = new Word(12, { ascii: 'abude', ipa: 'a b ə d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [central]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acude');
      })
    })

    describe('[back]', () => {
      it('should select only phonemes with the "back" vector (left-hand side)', () => {
        const wrd = new Word(13, { ascii: 'abude', ipa: 'a b u d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[back] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('abuce');
      })

      it('should select only phonemes with the "back" vector (right-hand side)', () => {
        const wrd = new Word(13, { ascii: 'abude', ipa: 'a b u d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [back]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acude');
      })
    })
  })

  describe('Lip position selectors', () => {
    describe('[rounded]', () => {
      it('should select only phonemes with the "rounded" vector (left-hand side)', () => {
        const wrd = new Word(14, { ascii: 'abude', ipa: 'a b u d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[rounded] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('abuce');
      })

      it('should select only phonemes with the "rounded" vector (right-hand side)', () => {
        const wrd = new Word(14, { ascii: 'abude', ipa: 'a b u d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [rounded]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acude');
      })
    })

    describe('[unrounded]', () => {
      it('should select only phonemes with the "unrounded" vector (left-hand side)', () => {
        const wrd = new Word(15, { ascii: 'abyde', ipa: 'a b y d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[unrounded] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('abyce');
      })

      it('should select only phonemes with the "unrounded" vector (right-hand side)', () => {
        const wrd = new Word(15, { ascii: 'abyde', ipa: 'a b y d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [unrounded]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acyde');
      })
    })
  })

  describe('Special vowel selectors', () => {
    describe('[diphthong]', () => {
      it('should select only phonemes with the "diphthong" vector (left-hand side)', () => {
        const wrd = new Word(16, { ascii: 'aboie', ipa: 'a b ɔɪ d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[diphthong] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('aboice');
      })

      it('should select only phonemes with the "diphthong" vector (right-hand side)', () => {
        const wrd = new Word(16, { ascii: 'aboie', ipa: 'a b ɔɪ d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [diphthong]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acoide');
      })
    })
  })

  describe('Manner of articulation selectors', () => {
    describe('[plosive]', () => {
      it('should select only phonemes with the "plosive" vector (left-hand side)', () => {
        const wrd = new Word(17, { ascii: 'abkde', ipa: 'a b k d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[plosive] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('abkce');
      })

      it('should select only phonemes with the "plosive" vector (right-hand side)', () => {
        const wrd = new Word(17, { ascii: 'abkde', ipa: 'a b k d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [plosive]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('ackde');
      })
    })

    describe('[nasal]', () => {
      it('should select only phonemes with the "nasal" vector (left-hand side)', () => {
        const wrd = new Word(18, { ascii: 'abmde', ipa: 'a b m d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[nasal] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('abmce');
      })

      it('should select only phonemes with the "nasal" vector (right-hand side)', () => {
        const wrd = new Word(18, { ascii: 'abmde', ipa: 'a b m d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [nasal]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acmde');
      })
    })

    describe('[trill]', () => {
      it('should select only phonemes with the "trill" vector (left-hand side)', () => {
        const wrd = new Word(19, { ascii: 'abrde', ipa: 'a b r d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[trill] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('abrce');
      })

      it('should select only phonemes with the "trill" vector (right-hand side)', () => {
        const wrd = new Word(19, { ascii: 'abrde', ipa: 'a b r d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [trill]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acrde');
      })
    })

    describe('[tap]', () => {
      it('should select only phonemes with the "tap" vector (left-hand side)', () => {
        const wrd = new Word(20, { ascii: 'abɾde', ipa: 'a b ɾ d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[tap] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('abrce');
      })

      it('should select only phonemes with the "tap" vector (right-hand side)', () => {
        const wrd = new Word(20, { ascii: 'abrde', ipa: 'a b ɾ d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [tap]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acrde');
      })
    })

    describe('[fricative]', () => {
      it('should select only phonemes with the "fricative" vector (left-hand side)', () => {
        const wrd = new Word(21, { ascii: 'absde', ipa: 'a b s d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[fricative] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('absce');
      })

      it('should select only phonemes with the "fricative" vector (right-hand side)', () => {
        const wrd = new Word(21, { ascii: 'absde', ipa: 'a b s d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [fricative]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acsde');
      })
    })

    describe('[lateral]', () => {
      it('should select only phonemes with the "lateral" vector (left-hand side)', () => {
        const wrd = new Word(22, { ascii: 'ablde', ipa: 'a b l d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[lateral] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('ablce');
      })

      it('should select only phonemes with the "lateral" vector (right-hand side)', () => {
        const wrd = new Word(22, { ascii: 'ablde', ipa: 'a b l d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [lateral]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('aclde');
      })
    })

    describe('[approximant]', () => {
      it('should select only phonemes with the "approximant" vector (left-hand side)', () => {
        const wrd = new Word(23, { ascii: 'abwde', ipa: 'a b w d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[approximant] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('abwce');
      })

      it('should select only phonemes with the "approximant" vector (right-hand side)', () => {
        const wrd = new Word(23, { ascii: 'abwde', ipa: 'a b w d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [approximant]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acwde');
      })
    })
  })

  describe('Place of articulation selectors', () => {
    describe('[bilabial]', () => {
      it('should select only phonemes with the "bilabial" vector (left-hand side)', () => {
        const wrd = new Word(24, { ascii: 'abmde', ipa: 'a b m d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[bilabial] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('abmce');
      })

      it('should select only phonemes with the "bilabial" vector (right-hand side)', () => {
        const wrd = new Word(24, { ascii: 'abmde', ipa: 'a b m d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [bilabial]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acmde');
      })
    })

    describe('[labiodental]', () => {
      it('should select only phonemes with the "labiodental" vector (left-hand side)', () => {
        const wrd = new Word(25, { ascii: 'afvde', ipa: 'a f v d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[labiodental] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('afvce');
      })

      it('should select only phonemes with the "labiodental" vector (right-hand side)', () => {
        const wrd = new Word(25, { ascii: 'afvde', ipa: 'a f v d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [labiodental]', 'f', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acvde');
      })
    })

    describe('[dental]', () => {
      it('should select only phonemes with the "dental" vector (left-hand side)', () => {
        const wrd = new Word(26, { ascii: 'athide', ipa: 'a b θ d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[dental] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('abthce');
      })

      it('should select only phonemes with the "dental" vector (right-hand side)', () => {
        const wrd = new Word(26, { ascii: 'athide', ipa: 'a b θ d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [dental]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acthde');
      })
    })

    describe('[alveolar]', () => {
      it('should select only phonemes with the "alveolar" vector (left-hand side)', () => {
        const wrd = new Word(27, { ascii: 'atnde', ipa: 'a t n d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[alveolar] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('atnce');
      })

      it('should select only phonemes with the "alveolar" vector (right-hand side)', () => {
        const wrd = new Word(27, { ascii: 'atnde', ipa: 'a t n d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [alveolar]', 't', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acnde');
      })
    })

    describe('[postalveolar]', () => {
      it('should select only phonemes with the "postalveolar" vector (left-hand side)', () => {
        const wrd = new Word(28, { ascii: 'abzhe', ipa: 'a b ʒ d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[postalveolar] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('abzhce');
      })

      it('should select only phonemes with the "postalveolar" vector (right-hand side)', () => {
        const wrd = new Word(28, { ascii: 'abzhe', ipa: 'a b ʒ d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [postalveolar]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('aczhde');
      })
    })

    describe('[retroflex]', () => {
      it('should select only phonemes with the "retroflex" vector (left-hand side)', () => {
        const wrd = new Word(29, { ascii: 'abrde', ipa: 'a b ɾ d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[retroflex] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('abrce');
      })

      it('should select only phonemes with the "retroflex" vector (right-hand side)', () => {
        const wrd = new Word(29, { ascii: 'abrde', ipa: 'a b ɾ d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [retroflex]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acrde');
      })
    })

    describe('[palatal]', () => {
      it('should select only phonemes with the "palatal" vector (left-hand side)', () => {
        const wrd = new Word(30, { ascii: 'abyde', ipa: 'a b j d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[palatal] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('abyce');
      })

      it('should select only phonemes with the "palatal" vector (right-hand side)', () => {
        const wrd = new Word(30, { ascii: 'abyde', ipa: 'a b j d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [palatal]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acyde');
      })
    })

    describe('[velar]', () => {
      it('should select only phonemes with the "velar" vector (left-hand side)', () => {
        const wrd = new Word(31, { ascii: 'abkde', ipa: 'a b k d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[velar] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('abkce');
      })

      it('should select only phonemes with the "velar" vector (right-hand side)', () => {
        const wrd = new Word(31, { ascii: 'abkde', ipa: 'a b k d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [velar]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('ackde');
      })
    })

    describe('[uvular]', () => {
      it('should select only phonemes with the "uvular" vector (left-hand side)', () => {
        const wrd = new Word(32, { ascii: 'abqde', ipa: 'a b q d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[uvular] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('abqce');
      })

      it('should select only phonemes with the "uvular" vector (right-hand side)', () => {
        const wrd = new Word(32, { ascii: 'abqde', ipa: 'a b q d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [uvular]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acqde');
      })
    })

    describe('[pharyngeal]', () => {
      it('should select only phonemes with the "pharyngeal" vector (left-hand side)', () => {
        const wrd = new Word(33, { ascii: 'abhde', ipa: 'a b h d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[pharyngeal] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('abhce');
      })

      it('should select only phonemes with the "pharyngeal" vector (right-hand side)', () => {
        const wrd = new Word(33, { ascii: 'abhde', ipa: 'a b h d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [pharyngeal]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('achde');
      })
    })

    describe('[glottal]', () => {
      it('should select only phonemes with the "glottal" vector (left-hand side)', () => {
        const wrd = new Word(34, { ascii: 'ab\'de', ipa: 'a b ʔ d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[glottal] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('ab\'ce');
      })

      it('should select only phonemes with the "glottal" vector (right-hand side)', () => {
        const wrd = new Word(34, { ascii: 'ab\'de', ipa: 'a b ʔ d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [glottal]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('ac\'de');
      })
    })
  })

  describe('Voicing selectors', () => {
    describe('[voiced]', () => {
      it('should select only phonemes with the "voiced" vector (left-hand side)', () => {
        const wrd = new Word(35, { ascii: 'abde', ipa: 'a b d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[voiced] _ e', 'd', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('abce');
      })

      it('should select only phonemes with the "voiced" vector (right-hand side)', () => {
        const wrd = new Word(35, { ascii: 'abde', ipa: 'a b d e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [voiced]', 'b', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acde');
      })
    })

    describe('[voiceless]', () => {
      it('should select only phonemes with the "voiceless" vector (left-hand side)', () => {
        const wrd = new Word(36, { ascii: 'apte', ipa: 'a p t e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, '[voiceless] _ e', 't', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd); 
        expect(result.ascii).toEqual('apce');
      })

      it('should select only phonemes with the "voiceless" vector (right-hand side)', () => {
        const wrd = new Word(36, { ascii: 'apte', ipa: 'a p t e', category: 'noun', lemmaId: -1 })
        fixtures.language.addWord(wrd)
        fixtures.language.addPhoneMap(new PhoneMap(1, 'a _ [voiceless]', 'p', 'c'));
        const result = fixtures.language.mutate('Phonology', wrd);
        expect(result.ascii).toEqual('acte');
      })
    })
  })
})

