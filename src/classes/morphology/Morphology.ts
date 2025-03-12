import { PhoneticRuleset } from "../../types";
import { Annotator } from "../phonology/Annotator";
import { Vocabulary } from "../vocabulary/Vocabulary";
import { Word, WordCategory } from "../word";
import { Morpheme } from "./Morpheme";
import fs from 'fs/promises'
export class Morphology {

  vocab: Vocabulary;
  annotator: Annotator;
  boundMorphemes: {[x:string]: any} = {}

  constructor(vocabulary:Vocabulary, annotator: Annotator) {
    this.vocab = vocabulary;
    this.annotator = annotator;
  }

  async loadBoundMorphemesFromFile(filepath:string) {
    const fileRaw = await fs.readFile(filepath, 'utf-8');
    const lines = fileRaw.split('\n');

    lines.forEach(rule => {
      const [suffix, inflection] = rule.split('->')
      const [category, characteristic] = inflection
        .replaceAll('[', '')
        .replaceAll(']', '')
        .split(':')
      const allCharacteristics = characteristic.split('&');

      if(!this.boundMorphemes[category.trim()]) this.boundMorphemes[category.trim()] = {}

      const previousMorphs = this.boundMorphemes[category.trim()][suffix.trim()];
      if(!previousMorphs) this.boundMorphemes[category.trim()][suffix.trim()] = allCharacteristics;
      else this.boundMorphemes[category.trim()][suffix.trim()] = [...previousMorphs, ...allCharacteristics];
    })
  }

  attachInflection(word:Word, morph: Morpheme) {
    const category:string = word.category;
    const morphIpa:string = morph.ipaParts.join('');
    if(morphIpa === '') {
      console.log(`found irregular form ${word.ascii}`);
      return;
    }
    const viableInflections = this.boundMorphemes[category];
    if(!viableInflections || !viableInflections[morphIpa]) throw new Error(`Morpheme ${morphIpa} is not a valid inflection for the category ${category}`);
    morph.addCharacteristics(viableInflections[morphIpa]);
  }

  getSuffix(word: Word, lemma: Word):Morpheme {
    let suffixIpa = word.ipaParts.slice(lemma.ipaParts.length , word.ipaParts.length);
    let suffixAscii = this.annotator.annotationConvert.ipa2ascii(suffixIpa).join('')
    const suffixMorpheme = new Morpheme(suffixAscii,suffixIpa);
    this.attachInflection(word, suffixMorpheme)
    return suffixMorpheme
  }

  getPrefix(word: Word, lemma: Word):Morpheme {
    let prefixIpa = word.ipaParts.slice(0, word.ipaParts.length - lemma.ipaParts.length);
    let prefixAscii = this.annotator.annotationConvert.ipa2ascii(prefixIpa).join('')
    const prefixMorpheme = new Morpheme(prefixAscii, prefixIpa);
    return prefixMorpheme;
  }

  decompose(word: Word):Morpheme[] {
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
      throw new Error(`the word ${word.ascii} has no recorded lemma, so it cannot be decomposed.`)
    }
  }

  bulkDecompose(words: Word[]):Morpheme[][] {
    return words.map(wrd => this.decompose(wrd));
  }

  compose(morphemes: Morpheme[]):Word {
    const ascii = morphemes.map(m => m.ascii).join('');
    const category = morphemes.filter(m => m.category !== 'bound')[0].category as WordCategory
    const foundWords = this.vocab.lookup(ascii, {category});
    if(foundWords) return foundWords[0]
    throw new Error(`cannot compose morphemes ${morphemes.map(m => m.ascii).join(' + ')} .`)
  }

  getCharacteristics(word:Word): string[] {
    const morphemes = this.decompose(word);
    return morphemes.filter(m => m.boundTo !== undefined).reduce((acc:string[], cur) => acc.concat(cur.characteristics), [])
  };

  async mutateBoundMorphemes(mutes: PhoneticRuleset) {
  const cats = Object.keys(this.boundMorphemes);
  for(let cat of cats) {
    const morphemes = this.boundMorphemes[cat];
    const newBoundMorphemeMapping:any = {}
    for(let mIpa in morphemes) {
      const morphAsWord = new Word(0, {
        ipa:mIpa.split('').join(' '), 
        ascii: this.annotator.annotationConvert.ipa2ascii(mIpa.split('')).join(''), 
        category: 'none'
      })
      const changed = await this.annotator.run(morphAsWord.ascii, mutes, 'ipa');
      if(changed === null) throw new Error('mutation failed on bound morphemes');
      newBoundMorphemeMapping[changed.ipa] = this.boundMorphemes[cat][mIpa]
    }
    this.boundMorphemes[cat] = newBoundMorphemeMapping

  }
  }

}