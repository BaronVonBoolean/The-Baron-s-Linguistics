import { WordCategory } from "../../types";
import { Morpheme } from "../morphology/Morpheme";
import { Morphology } from "../morphology/Morphology";
import { PhoneMap } from "../phonology/PhoneMap";
import { Phoneme } from "../phonology/Phoneme";
import { Phonology } from "../phonology/Phonology";
import { DecomposedWord } from "../shared/DecomposedWord";
import { FileOps } from "../shared/FileOps";
import { logger } from "../shared/Logger";
import { Util } from "../shared/Util";
import { Word } from "../shared/word";
import { Syntax } from "../syntax/Syntax";
import { Vocabulary } from "../vocabulary/Vocabulary";

type Layer = Phonology | Morphology | Vocabulary | Syntax;
export class Language {
  public phonology: Phonology
  public morphology: Morphology
  public vocabulary: Vocabulary

  constructor(
    public name: string, 
  ) {
    this.phonology = new Phonology();
    this.morphology = new Morphology();
    this.vocabulary = new Vocabulary();
  } 

  decompose(word: Word) {
    if(!word) return;
    const decomposedWord = new DecomposedWord(word.id, word);
    logger.log(`Sending word "${word.text}" to layer "Phonology" for decomposition`, this.constructor);
    decomposedWord.phonemes = this.phonology.decompose(word);
    logger.log(`Sending word "${word.text}" to layer "Morphology" for decomposition`, this.constructor);
    decomposedWord.morphemes = this.morphology.decompose(word);
    return decomposedWord;
  }

  mutate(layer: string, word: Word):Word {
    if(!word) return word;

    logger.log(`Sending word "${word.text}" to layer "${layer}" for mutation`, this.constructor);
    if(layer === 'Phonology') {
      const result = this.phonology.mutate(word, this.phonology.mutations);
      this.morphology.applyPhonology(this.phonology);
      this.vocabulary.updateWord(result)
      return result;
    } else if(layer === 'Morphology') {
      throw new Error('Morphology.mutate is not implemented yet');
    } else if(layer === 'Vocabulary') {
      throw new Error('Vocabulary.mutate is not implemented yet');
    } else if(layer === 'Syntax') {
      throw new Error('Syntax.mutate is not implemented yet');
    }

    return word;
  }


  addPhoneme(phoneme: Phoneme) {
    this.phonology.addPhoneme(phoneme);
  }

  addPhoneMap(phoneMap: PhoneMap) {
    this.phonology.addPhoneMap(phoneMap);
  }

  addWord(wrd: Word):void {
    return this.vocabulary.addWord(wrd)
  }

  addInflection(ipa: string, category: WordCategory, characteristics: string[]):void {
    const ipaParts = ipa.split(' ')
    const infl = new Morpheme(ipaParts)
    infl.category = category
    infl.characteristics = characteristics
    this.morphology.addBoundMorpheme(infl)
  }

  getWord(asciiKey: string) {
    return this.vocabulary.lookup(asciiKey)
  }

  getPhoneme(asciiKey: string) {
    return this.phonology.lookupPhoneme(asciiKey)
  }

  getPhoneMap(asciiKey: string) {
    return this.phonology.lookupPhoneMap(asciiKey)
  }

  getInflections(ipa: string) {
    const morphs = this.morphology.cacheToMorphemes();
    return morphs.filter(m => m.ipaParts.join(' ') === ipa)
  }

  updateWord(newWord:Word) {
    logger.log(`Updating word ${newWord.text}`, Language)
    this.vocabulary.updateWord(newWord)
  }

  updatePhoneme(newPhoneme:Phoneme) {
    logger.log(`Updating phoneme ${newPhoneme.ascii}`, Language)
    this.phonology.updatePhoneme(newPhoneme)
  }

  updatePhoneMap(newPhoneMap:PhoneMap) {
    logger.log(`Updating phoneMap ${newPhoneMap.targetPhoneme} -> ${newPhoneMap.mapToPhoneme} : ${newPhoneMap.environment}`, Language)
    this.phonology.updatePhoneMap(newPhoneMap)
  }

  updateInflection(ipa: string, category: WordCategory, characteristics: string[]) {
    logger.log(`Updating inflection ${ipa} with category ${category} and characteristics ${characteristics}`, Language)
    const ipaParts = ipa.split(' ')
    const infl = new Morpheme(ipaParts)
    infl.category = category
    infl.characteristics = characteristics
    this.morphology.updateBoundMorpheme(infl)
  }

  // Fileops below.

  async load(filepath: string) {
    logger.log('Starting compilation...', Language);

    let currentSection = '';

    const data = await FileOps.loadFile(filepath);

    const lines = data.split('\n');
    lines.forEach((line) => {
      if(line.startsWith('#')) {
        const header = Util.removePunctuationAndNumbers(line);
        currentSection = header;
      } else if(currentSection === 'VOCABULARY') {
        this.vocabulary.loadWordsFromString(line);
      } else if(currentSection === 'PHONEMES') {
        this.phonology.loadPhonemesFromString(line);
      } else if (currentSection === 'MUTATIONS') {
        this.phonology.loadPhoneMapsFromString(line);
      } else if(currentSection === 'MORPHOLOGY') {
        this.morphology.loadBoundMorphemesFromString(line);
      }
    })

  }

  async compile() {
    await this.vocabulary.loadWordsFromDir('./data/vocabularies');
    await this.phonology.loadPhonemesFromDir('./data/phonologies');
    await this.phonology.loadPhoneMapsFromDir('./data/phoneMaps');
    await this.morphology.loadBoundMorphemesFromDir('./data/morphologies')
  }

  async save(filepath: string) {
    const vocabTable = await this.vocabulary.toTable();
    const phonologyTable = await this.phonology.toTable();
    const morphologyTable = await this.morphology.toTable();

    const parts = [
      `# ${this.name}`,
      ``,  
      `## VOCABULARY`,
      vocabTable,
      ``,  
      `## PHONOLOGY`,
      phonologyTable,
      ``,  
      `## MORPHOLOGY`,
      morphologyTable,
      `# END`,  
    ]

    const table = parts.join('\n');
    await FileOps.writeFile(filepath, table);
  }
}