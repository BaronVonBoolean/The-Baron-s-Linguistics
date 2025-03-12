"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Annotator = void 0;
const injections_1 = require("../../processes/injections");
const word_1 = require("../word");
const PhoneticMutationPipeline_1 = require("./PhoneticMutationPipeline");
const Util_1 = require("./Util");
class Annotator {
    constructor(vocab) {
        this.cmu = (0, injections_1.injectCMU)();
        this.annotationConvert = (0, injections_1.injectAnnotationConverter)();
        this.onLoad = Promise.all([this.annotationConvert.onLoad, this.cmu.onLoad]);
        this.cmu.onLoad.then(() => console.log("CMUdict Loaded!"));
        this.annotationConvert.onLoad.then(() => console.log("Annotation Converter Loaded!"));
        this.vocab = vocab;
    }
    async run(input, ruleset, glyphs) {
        try {
            // make sure all modules have loaded their data.
            await this.onLoad;
            // map the input into a phonetic representation.
            input = Util_1.Util.removePunctuationAndNumbers(input);
            // const annotation = this.annotationConvert.makeAnnotation(this.cmu, input);
            const annotation = this.vocab.lookup(input);
            if (annotation.length === 0)
                return null;
            // construct a pipeline with the rules provided, then pass the phonetic representation through this pipeline.
            const pipeline = new PhoneticMutationPipeline_1.PhoneticMutationPipeline(ruleset, glyphs);
            const mutated = pipeline.run(annotation[0]);
            // populate the new morpheme with its lemma form.
            mutated.lemma = this.vocab.lemmaFor(mutated);
            // update the arpa and ascii values to reflect changes in the IPA.
            this.annotationConvert.syncToIpa(mutated);
            // return the changed annotation.
            return mutated;
        }
        catch (e) {
            console.warn(e.message);
            return new word_1.Word(0, { ascii: '_____', ipa: '_____', category: 'none' });
        }
    }
    async bulkRun(glyphs, input, ruleset) {
        const annotatedSentence = await Promise.all(input
            .split(' ')
            .map((word) => this.run(word, ruleset, glyphs)));
        // console.log(annotatedSentence.map(a => a.ascii.join('')).join(' '));
        return annotatedSentence.filter(res => res !== null);
    }
}
exports.Annotator = Annotator;
