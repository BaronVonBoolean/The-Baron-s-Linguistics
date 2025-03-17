import { Vocabulary } from "../classes/vocabulary/Vocabulary";
import { Word } from "../classes/shared/word";



export async function dedupe(dictPath:string) {
  let v = new Vocabulary();

  await v.loadFromFile(dictPath);

  v.words.forEach((wrd:Word) => {
    const possibleDupes = v.words
    .filter(w => w.ascii === wrd.ascii)
    .filter(w => w.category === wrd.category);
    if(possibleDupes.length > 1) {
      possibleDupes.shift();
      console.log(`found ${possibleDupes.length} dupes for word ${wrd.ascii}`);
      possibleDupes.forEach(d => v.removeWordById(d.id))
    }
  })

  v.writeToFile('./deduped.txt')
}