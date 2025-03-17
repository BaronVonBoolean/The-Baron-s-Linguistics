import { Vocabulary } from "../vocabulary/Vocabulary";
import { Word } from "../shared/word";
import { Morpheme, MorphemeCategory } from "./Morpheme";
import fs from 'fs/promises'
import { WordCategory } from "../../types";
import { PhoneticMutationPipeline } from "../phonology/PhoneticMutationPipeline";
import { Phonology } from "../phonology/Phonology";
import { FileOps } from "../shared/FileOps";
import { logger } from "../shared/Logger";
export class Morphology {
  boundMorphemes: {[x:string]: any} = {}

  constructor() {
  }

  addBoundMorpheme(morph:Morpheme | null):void {
    logger.log(`adding bound morpheme ${morph?.ipaParts.join()} with characteristics ${morph?.characteristics.join(', ')}`, Morphology)
    if(!morph) return;
    if(!this.boundMorphemes[morph.category]) this.boundMorphemes[morph.category] = {}
    const previousMorphs = this.boundMorphemes[morph.category][morph.ipaParts.join(' ').trim()];
    if(!previousMorphs) this.boundMorphemes[morph.category][morph.ipaParts.join(' ').trim()] = morph.characteristics;
    else this.boundMorphemes[morph.category][morph.ipaParts.join(' ').trim()] = [...previousMorphs, ...morph.characteristics];
  }

  async loadBoundMorphemesFromString(morphs:string):Promise<void> {
    morphs.split('\n')
    .map(line => FileOps.parseMorphemeLine(line))
    .forEach((morph:Morpheme | null) => {
      this.addBoundMorpheme(morph)
    })
  }

  async loadBoundMorphemesFromDir(dirpath:string):Promise<void> {
    logger.log(`loading morphemes from: ${dirpath}`, Morphology);

    const morphs = await FileOps.loadDataClassFromDir(dirpath, 'morphology');
    morphs.forEach((morph:Morpheme) => {
      this.addBoundMorpheme(morph)
    })
  }

  async loadBoundMorphemesFromFile(filepath:string):Promise<void> {
    const morphs = await FileOps.loadDataClassFromFile(filepath, 'morphology');
    morphs.forEach((morph:Morpheme) => {
      this.addBoundMorpheme(morph)
    })
  }

  attachInflection(word:Word, morph: Morpheme) {
    logger.log(`attaching inflection to word "${word.text}"`, this.constructor);

    const category:string = word.category;
    const morphIpa:string = morph.ipaParts.join(' ');
    
    if(morphIpa === ' ') {
      logger.log(`found irregular form ${word.ascii}`, this.constructor);
      return;
    }

    const viableInflections = this.boundMorphemes[category];
    if(!viableInflections || !viableInflections[morphIpa]) throw new Error(`Morpheme ${morphIpa} is not a valid inflection for the category ${category}`);
    morph.addCharacteristics(viableInflections[morphIpa]);
  }

  getSuffix(word: Word, lemma: Word):Morpheme {
    logger.log(`getting suffix for word "${word.text}"`, this.constructor);
    let suffixIpa = word.ipaParts.slice(lemma.ipaParts.length , word.ipaParts.length);
    const suffixMorpheme = new Morpheme(suffixIpa);
    this.attachInflection(word, suffixMorpheme);
    return suffixMorpheme;
  }

  getPrefix(word: Word, lemma: Word):Morpheme {
    logger.log(`getting prefix for word "${word.text}"`, this.constructor);
    let prefixIpa = word.ipaParts.slice(0, word.ipaParts.length - lemma.ipaParts.length);
    const prefixMorpheme = new Morpheme(prefixIpa);
    return prefixMorpheme;
  }

  decompose(word: Word):Morpheme[] {
    logger.log(`decomposing word "${word.text}" into morphemes.`, this.constructor);
    if(word.lemma === word) return [Morpheme.fromWord(word)];
    else if(word.lemma) {
      const suffix = this.getSuffix(word, word.lemma);
      const prefix = this.getPrefix(word, word.lemma);
      const root = Morpheme.fromWord(word.lemma)

      if(suffix.ipaParts.length > 0) {
        suffix.bindTo(root)
        root.modifyWith(suffix)
        return [root, suffix]
      } else if (prefix.ipaParts.length > 0) {
        prefix.bindTo(root)
        root.modifyWith(prefix)
        return [prefix, root]
      } else {
        return [root]
      }
    } else {
      return [Morpheme.fromWord(word)]
    }
  }

  bulkDecompose(words: Word[]):Morpheme[][] {
    logger.log(`decomposing ${words.length} words into morphemes.`, this.constructor);
    return words.map(wrd => this.decompose(wrd));
  }

  compose(morphemes: Morpheme[], vocab: Vocabulary):Word {
    logger.log(`composing morphemes ${morphemes.map(m => m.ipaParts.join('')).join(' + ')} into a word.`, this.constructor);
    const ipa = morphemes.map(m => m.ipaParts.join('')).join('');
    const category = morphemes.filter(m => m.category !== 'bound')[0].category as WordCategory
    const foundWords = vocab.lookup(ipa, {category, field: 'ipa'});
    if(foundWords.length === 0) new Error(`cannot compose morphemes ${morphemes.map(m => m.ipaParts.join('')).join(' + ')} .`)
    if(foundWords) return foundWords[0]
    throw new Error(`cannot compose morphemes ${morphemes.map(m => m.ipaParts.join('')).join(' + ')} .`)
  }

  getCharacteristics(word:Word): string[] {
    logger.log(`getting characteristics for word "${word.text}"`, this.constructor);
    const morphemes = this.decompose(word);
    return morphemes.filter(m => m.boundTo !== undefined).reduce((acc:string[], cur) => acc.concat(cur.characteristics), [])
  };

  cacheToMorphemes():Morpheme[] {
    let morphs:Morpheme[] = []
    const categories = Object.keys(this.boundMorphemes);
     categories.forEach((category:string) => {
      const morphemeIpa:string[] = Object.keys(this.boundMorphemes[category]);
      morphs = morphs.concat(
        morphemeIpa.map(mChar => {
          const morpheme = new Morpheme([mChar])
          morpheme.category = category as MorphemeCategory
          morpheme.characteristics = this.boundMorphemes[category][mChar]
          return morpheme
        })
      )
    })
    return morphs;
  }

  applyPhonology(phonology:Phonology) {
    logger.log(`applying phonology to bound morphemes.`, this.constructor);
    const categories = Object.keys(this.boundMorphemes);
    categories.forEach(category => {
      const morphemeIpa:string[] = Object.keys(this.boundMorphemes[category]);
      morphemeIpa
      .map(mChar => new Morpheme([mChar]))
      .forEach((morpheme:Morpheme) => {
        const storedCharacteristics = this.boundMorphemes[category][morpheme.ipaParts.join('')];
        const mutated:Word = this.applyPhonologyToMorpheme(phonology, morpheme);
        this.boundMorphemes[category][mutated.ipaParts.join(' ')] = storedCharacteristics;
      })
    })
  }

  applyPhonologyToMorpheme(phonology:Phonology, morpheme:Morpheme):Word {
    const pipeline:PhoneticMutationPipeline = new PhoneticMutationPipeline(phonology.mutations);
    const mutated:Word = pipeline.run(morpheme.toWord(), phonology.phonemes);
    return mutated;
  }

  async toTable():Promise<string> {
    return this.cacheToMorphemes().map(m => m.toLine()).join('\n');
  }
}