import { FileOps } from '../classes/shared/FileOps';
import { Phoneme } from '../classes/phonology/Phoneme';
import { Morpheme } from '../classes/morphology/Morpheme';
import { Word } from '../classes/shared/word';
import { PhoneMap } from '../classes/phonology/PhoneMap';

import fs from 'fs/promises';
import path from 'path';

jest.mock('fs/promises');

describe('FileOps.loadDataClassFromFile', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return empty array if filepath does not contain validInfix', async () => {
    const result = await FileOps.loadDataClassFromFile('test.txt', 'phonology');
    expect(result).toEqual([]);
  });

  it('should correctly load and parse phoneme data', async () => {
    const mockFileContent = '1;a;a;vowel;[close&central]\n2;b;b;consonant;[voiced&bilabial]';
    (fs.readFile as jest.Mock).mockResolvedValue(mockFileContent);

    const result = await FileOps.loadDataClassFromFile('test.phoneme.txt', 'phonology');
    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(Phoneme);
    expect(result[0].ipa).toBe('a');
    expect(result[1].ipa).toBe('b');
    expect(fs.readFile).toHaveBeenCalledWith('test.phoneme.txt', 'utf-8');
  });

  it('should correctly load and parse phoneMap data', async () => {
    const mockFileContent = 'l -> r : p _ æ\nr -> d : p _ æ';
    (fs.readFile as jest.Mock).mockResolvedValue(mockFileContent);

    const result = await FileOps.loadDataClassFromFile('test.phoneMap.txt', 'phonemap');
    console.log(result);
    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(PhoneMap);
    expect(result[0].rule.targetPhoneme).toBe('l');
    expect(result[0].rule.mapToPhoneme).toBe('r');
    expect(result[0].rule.environment).toBe('p _ æ');


  });

  it('should correctly load and parse morphology data', async () => {
    const mockFileContent = 'ɪz -> [noun:plural]\nz -> [noun:plural]';
    (fs.readFile as jest.Mock).mockResolvedValue(mockFileContent);

    const result = await FileOps.loadDataClassFromFile('test.morphology.txt', 'morphology');

    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(Morpheme);
    expect(result[0].category).toBe('noun');
    expect(result[0].characteristics).toContain('plural');
  });

  it('should handle empty lines in file', async () => {
    const mockFileContent = '\n1;a;a;vowel;[close&central]\n2;b;b;consonant;[voiced&bilabial]\n';
    (fs.readFile as jest.Mock).mockResolvedValue(mockFileContent);

    const result = await FileOps.loadDataClassFromFile('test.phoneme.txt', 'phonology');

    expect(result).toHaveLength(2);
    expect(result.filter(Boolean)).toHaveLength(2);
  });

  it('should handle malformed lines gracefully', async () => {
    const mockFileContent = '1;a;a;vowel\n2;b;b;consonant;[voiced&labial]';
    (fs.readFile as jest.Mock).mockResolvedValue(mockFileContent);

    const result = await FileOps.loadDataClassFromFile('test.phoneme.txt', 'phonology');
    expect(result).toHaveLength(1);
    expect(result.filter(Boolean)).toHaveLength(1);
  });

  it('should throw error for invalid infix type', async () => {
    const mockFileContent = 'test data';
    (fs.readFile as jest.Mock).mockResolvedValue(mockFileContent);

    await expect(FileOps.loadDataClassFromFile('test.invalid.txt', 'invalid' as any))
      .rejects
      .toThrow('Invalid file extension');
  });

  it('should handle file read errors', async () => {
    (fs.readFile as jest.Mock).mockRejectedValue(new Error('File not found'));

    await expect(FileOps.loadDataClassFromFile('nonexistent.phoneme.txt', 'phonology'))
      .rejects
      .toThrow('File not found');
  });

  describe('parseVocabularyLine', () => {
    it('should correctly parse a valid vocabulary line', () => {
      const line = '1;hello;h ə l oʊ;noun;-1';
      const result = FileOps.parseVocabularyLine(line);
      
      expect(result).toBeInstanceOf(Word);
      expect(result?.ascii).toBe('hello');
      expect(result?.ipaParts).toEqual(['h', 'ə', 'l', 'oʊ']);
      expect(result?.category).toBe('noun');
      expect(result?.lemmaId).toBe(-1);
    });

    it('should return null for malformed vocabulary line', () => {
      const line = '1;hello;h ə l oʊ;noun'; // Missing lemmaId
      const result = FileOps.parseVocabularyLine(line);
      
      expect(result).toBeNull();
    });

    it('should handle vocabulary line with lemma reference', () => {
      const line = '2;running;r ʌ n ɪ ŋ;verb;1';
      const result = FileOps.parseVocabularyLine(line);
      
      expect(result).toBeInstanceOf(Word);
      expect(result?.ascii).toBe('running');
      expect(result?.ipaParts).toEqual(['r', 'ʌ', 'n', 'ɪ', 'ŋ']);
      expect(result?.category).toBe('verb');
      expect(result?.lemmaId).toBe(1);
    });

    it('should handle empty fields appropriately', () => {
      const line = '3;;h ə l oʊ;noun;-1';
      const result = FileOps.parseVocabularyLine(line);
      
      expect(result).toBeInstanceOf(Word);
      expect(result?.ascii).toBe('');
      expect(result?.ipaParts).toEqual(['h', 'ə', 'l', 'oʊ']);
      expect(result?.category).toBe('noun');
    });
  });
}); 