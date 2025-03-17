import { VocabLookupFilter, WordCategory } from "../../types";
import { Morpheme } from "../morphology/Morpheme";
import { Morphology } from "../morphology/Morphology";
import { PhoneMap } from "../phonology/PhoneMap";
import { Phoneme } from "../phonology/Phoneme";
import { Phonology } from "../phonology/Phonology";
import { FileOps } from "../shared/FileOps";
import { logger } from "../shared/Logger";
import { Util } from "../shared/Util";
import { Word } from "../shared/word";
import { Syntax } from "../syntax/Syntax";
import { Vocabulary } from "../vocabulary/Vocabulary";

type Layer = Phonology | Morphology | Vocabulary | Syntax;
export class Language {
  constructor(
    public name: string, 
    public phonology: Phonology, 
    public morphology: Morphology, 
    public vocabulary: Vocabulary
  ) {
    this.name = name;
    this.phonology = phonology;
    this.morphology = morphology;
    this.vocabulary = vocabulary;
  } 

  decompose(layer: Layer, word: Word) {
    logger.log(`Sending word "${word.text}" to layer "${layer.constructor.name}" for decomposition`, this.constructor);
    if(layer instanceof Phonology) {
      return this.phonology.decompose(word);
    } else if(layer instanceof Morphology) {
      return this.morphology.decompose(word);
    } else if(layer instanceof Vocabulary) {
      throw new Error('Vocabulary.decompose is not implemented yet');
    } else if(layer instanceof Syntax) {
      throw new Error('Syntax.decompose is not implemented yet');
    }
  }

  mutate(layer: Layer, word: Word) {
    logger.log(`Sending word "${word.text}" to layer "${layer.constructor.name}" for mutation`, this.constructor);
    if(layer instanceof Phonology) {
      const result = this.phonology.mutate(word, this.phonology.mutations);
      this.morphology.applyPhonology(this.phonology);
      this.vocabulary.updateWord(result)
      return result;
    } else if(layer instanceof Morphology) {
      throw new Error('Morphology.mutate is not implemented yet');
    } else if(layer instanceof Vocabulary) {
      throw new Error('Vocabulary.mutate is not implemented yet');
    } else if(layer instanceof Syntax) {
      throw new Error('Syntax.mutate is not implemented yet');
    }
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

  updateWord(newWord:Word) {
    this.vocabulary.updateWord(newWord)
  }

  lookup(asciiKey: string, filters?: VocabLookupFilter) {
    logger.log(`Sending word "${asciiKey}" to Vocabulary layer for lookup.`, Language)
    return this.vocabulary.lookup(asciiKey, filters)
  }

  addInflection(ipa: string, category: WordCategory, characteristics: string[]):void {
    const ipaParts = ipa.split(' ')
    const infl = new Morpheme(ipaParts)
    infl.category = category
    infl.characteristics = characteristics
    this.morphology.addBoundMorpheme(infl)
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