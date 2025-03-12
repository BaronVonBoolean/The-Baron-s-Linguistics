
# Vocabulary Class

The `Vocabulary` class represents a collection of words and provides functionalities for loading, searching, modifying, and saving a vocabulary list. Words are stored as instances of the `Word` class.

## Type Definitions

### `VocabLookupFilter`
```typescript
export type VocabLookupFilter = {
  category?: WordCategory;
};
```
Defines an optional filter for looking up words by category.

## Class: `Vocabulary`

### Properties

#### `words: Word[]`
An array storing `Word` instances in the vocabulary.

#### `curIdx: number`
A counter for assigning unique IDs to newly added words.

### Methods

#### `async loadFromFile(fp: string): Promise<void>`
```typescript
async loadFromFile(fp: string): Promise<void>
```
Loads words from a file, initializes them as `Word` instances, and adds them to the vocabulary.

##### Parameters:
- `fp: string` – The file path of the vocabulary data.

##### Returns:
- A `Promise<void>` once the file is read and processed.

---

#### `async writeToFile(fp: string): Promise<void>`
```typescript
async writeToFile(fp: string): Promise<void>
```
Writes the current vocabulary to a file in a semicolon-separated format.

##### Parameters:
- `fp: string` – The file path where the vocabulary should be saved.

##### Returns:
- A `Promise<void>` once the file is successfully written.

---

#### `lookup(asciiKey: string, filters: VocabLookupFilter = {}): Word[]`
```typescript
lookup(asciiKey: string, filters: VocabLookupFilter = {}): Word[]
```
Searches for words in the vocabulary by their ASCII text.

##### Parameters:
- `asciiKey: string` – The ASCII representation of the word.
- `filters: VocabLookupFilter` – (Optional) Filters results based on word category.

##### Returns:
- An array of matching `Word` instances.

##### Throws:
- An `Error` if the word is not found, logging it to `error_words.txt`.

---

#### `addWord(wrd: Word)`
```typescript
addWord(wrd: Word): void
```
Adds a new word to the vocabulary and assigns it a unique ID.

##### Parameters:
- `wrd: Word` – The `Word` instance to be added.

##### Returns:
- `void`

---

#### `lemmaFor(word: Word): Word`
```typescript
lemmaFor(word: Word): Word
```
Finds the lemma (base form) of a given word.

##### Parameters:
- `word: Word` – The word whose lemma is to be found.

##### Returns:
- The `Word` instance representing the lemma.

---

#### `removeWord(ascii: string)`
```typescript
removeWord(ascii: string): void
```
Removes a word from the vocabulary based on its ASCII representation.

##### Parameters:
- `ascii: string` – The ASCII text of the word to be removed.

##### Returns:
- `void`

---

#### `removeWordById(id: number)`
```typescript
removeWordById(id: number): void
```
Removes a word from the vocabulary by its ID.

##### Parameters:
- `id: number` – The unique ID of the word to remove.

##### Returns:
- `void`

---

#### `replaceWord(wordToRemove: Word, wordToInsert: Word)`
```typescript
replaceWord(wordToRemove: Word, wordToInsert: Word): void
```
Replaces a word in the vocabulary with another word.

##### Parameters:
- `wordToRemove: Word` – The word to be removed.
- `wordToInsert: Word` – The word to be inserted.

##### Returns:
- `void`

---

#### `concat(v2: Vocabulary): Vocabulary`
```typescript
concat(v2: Vocabulary): Vocabulary
```
Combines two vocabularies into a new one.

##### Parameters:
- `v2: Vocabulary` – Another `Vocabulary` instance to merge with the current one.

##### Returns:
- A new `Vocabulary` instance containing words from both vocabularies.

---

### Example Usage
```typescript
const vocab = new Vocabulary();
await vocab.loadFromFile('vocab.txt');

const word = vocab.lookup('hello')[0];
console.log(word.ipa);

const newWord = new Word(0, { ascii: "world", ipa: "w ɜːr l d", category: "noun" });
vocab.addWord(newWord);

await vocab.writeToFile('updated_vocab.txt');
```
