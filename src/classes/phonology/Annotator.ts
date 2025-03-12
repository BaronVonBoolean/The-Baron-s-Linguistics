import { injectAnnotationConverter, injectCMU } from "../../processes/injections";
import { PhoneticAlphabet, PhoneticRuleset } from "../../types";
import { Vocabulary } from "../vocabulary/Vocabulary";
import { Word } from "../word";
import { AnnotationConverter } from "./AnnotationConverter";
import { CMUDict } from "./CMUDict";
import { PhoneticMutationPipeline } from "./PhoneticMutationPipeline";
import { Util } from "./Util";

export class Annotator {
  cmu: CMUDict = injectCMU();
  annotationConvert:AnnotationConverter = injectAnnotationConverter();
  vocab: Vocabulary;

  onLoad: Promise<boolean[]> = Promise.all([this.annotationConvert.onLoad, this.cmu.onLoad]);

  constructor(vocab: Vocabulary) {
    this.cmu.onLoad.then(() => console.log("CMUdict Loaded!"))
    this.annotationConvert.onLoad.then(() => console.log("Annotation Converter Loaded!"));
    this.vocab = vocab;
  }

  async run(input:string, ruleset:PhoneticRuleset, glyphs: PhoneticAlphabet):Promise<Word | null> {
    try {
      // make sure all modules have loaded their data.
      await this.onLoad;
  
      // map the input into a phonetic representation.
      input = Util.removePunctuationAndNumbers(input)
      // const annotation = this.annotationConvert.makeAnnotation(this.cmu, input);
      const annotation = this.vocab.lookup(input)
      if(annotation.length === 0) return null;
      // construct a pipeline with the rules provided, then pass the phonetic representation through this pipeline.
      const pipeline = new PhoneticMutationPipeline(ruleset, glyphs);
      const mutated = pipeline.run(annotation[0]);

      // populate the new morpheme with its lemma form.
      mutated.lemma = this.vocab.lemmaFor(mutated)
      
      // update the arpa and ascii values to reflect changes in the IPA.
      this.annotationConvert.syncToIpa(mutated);
      
      // return the changed annotation.
      return mutated;
    } catch (e:any) {
      console.warn(e.message);
      return new Word(0, {ascii: '_____',ipa: '_____', category: 'none'});
    }
  }

  async bulkRun(glyphs:PhoneticAlphabet, input:string, ruleset:PhoneticRuleset):Promise<Word[]> {
    const annotatedSentence = await Promise.all(
      input
      .split(' ')
      .map(
        (word) => this.run(word, ruleset, glyphs)
      )
    )
  
    // console.log(annotatedSentence.map(a => a.ascii.join('')).join(' '));
  
    return annotatedSentence.filter(res => res !== null);
  }

}