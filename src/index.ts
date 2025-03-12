
import { Annotator } from "./classes/phonology/Annotator";
import { compileVocabularyFromDir } from "./processes/compileVocabularyFromDir";
import { translateFile } from "./processes/translateFile";

import { compileMutationsFromDir } from "./processes/compileMutationsFromDir";
import { Morphology } from "./classes/morphology/Morphology";
import { PhoneticRule, PhoneticRuleset } from "./types";
import { PhoneticMutationPipeline } from "./classes/phonology/PhoneticMutationPipeline";
import { Word } from "./classes/word";


async function main() {
  const mutes:PhoneticRuleset = await compileMutationsFromDir('./data/mutations');
  const vocab = await compileVocabularyFromDir('./data/dictionaries');
  const ann = new Annotator(vocab);
  const morph = new Morphology(vocab, ann);

  await morph.loadBoundMorphemesFromFile('/Users/ianculleton/Documents/node_projects/baron-linguistics/data/morphemes/morpheme.verbTense.txt')
  await morph.loadBoundMorphemesFromFile('/Users/ianculleton/Documents/node_projects/baron-linguistics/data/morphemes/morpheme.nounPlural.txt')

  const words = await ann.run('planting', mutes, 'ipa')
  if(!words) return;

  // this method updates the bound morphemes stored in the Morphology layer.  It is necessary for the 
  // Morphology layer to successfully detect the bound morphemes associated with a word.
  await morph.mutateBoundMorphemes(mutes)
 
  const characteristics = morph.getCharacteristics(words)
  console.log(characteristics)

  // console.log(morph.compose(decomposed))
  translateFile(ann,'./test-input-file.txt' , mutes);
}

main();