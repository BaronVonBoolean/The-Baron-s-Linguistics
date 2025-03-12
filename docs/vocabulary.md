# Vocabulary Class Documentation

The `Vocabulary` class is a core component of the Baron Linguistics system that manages collections of `Word` instances. It provides functionality for loading, saving, searching, and manipulating vocabulary data, with support for lemma relationships and word categorization.

## Type Definitions

### VocabLookupFilter
```typescript
export type VocabLookupFilter = {
  category?: WordCategory
}
```
Defines an optional filter for looking up words by their grammatical category.

## Class Properties

### words: Word[]
Array storing all `Word` instances in the vocabulary. Defaults to empty array.

### curIdx: number
Counter for assigning unique IDs to newly added words. Defaults to 1.

## Methods

### File Operations

#### loadFromFile
```typescript
async loadFromFile(fp: string): Promise<void>
```
Loads words from a file into the vocabulary.

##### Parameters:
- `fp: string` - Path to the vocabulary file

##### Behavior:
- Reads file contents as UTF-8
- Parses each line as a word using `Word.fromLine`
- Sets up lemma relationships
- Updates the current index counter

#### writeToFile
```typescript
async writeToFile(fp: string): Promise<void>
```
Saves the current vocabulary to a file.

##### Parameters:
- `fp: string` - Path where the vocabulary should be saved

##### Behavior:
- Formats each word using `toLine`
- Joins words with newlines
- Writes to file as UTF-8

### Word Management

#### lookup
```typescript
lookup(asciiKey: string, filters: VocabLookupFilter = {}): Word[]
```
Searches for words in the vocabulary by their ASCII text.

##### Parameters:
- `asciiKey: string` - The ASCII text to search for
- `filters: VocabLookupFilter` - Optional category filter

##### Returns:
- Array of matching `Word` instances

##### Behavior:
- Case-insensitive search
- Filters by category if specified
- Logs unknown words to `error_words.txt`
- Throws error if word not found
- Returns empty array for empty/whitespace input

#### addWord
```typescript
addWord(wrd: Word): void
```
Adds a new word to the vocabulary.

##### Parameters:
- `wrd: Word` - The word to add

##### Behavior:
- Assigns unique ID using `curIdx`
- Increments `curIdx`
- Adds word to `words` array

#### lemmaFor
```typescript
lemmaFor(word: Word): Word
```
Finds the lemma (base form) of a given word.

##### Parameters:
- `word: Word` - The word whose lemma is to be found

##### Returns:
- The `Word` instance representing the lemma

##### Behavior:
- Returns cached lemma if available
- Looks up lemma by ID if not cached
- Returns word itself if no lemma specified

### Word Removal

#### removeWord
```typescript
removeWord(ascii: string): void
```
Removes a word by its ASCII text.

##### Parameters:
- `ascii: string` - ASCII text of word to remove

##### Behavior:
- Looks up word by ASCII text
- Removes word from array
- Maintains array order

#### removeWordById
```typescript
removeWordById(id: number): void
```
Removes a word by its ID.

##### Parameters:
- `id: number` - ID of word to remove

##### Behavior:
- Finds word by ID
- Removes word from array
- Maintains array order

### Word Replacement

#### replaceWord
```typescript
replaceWord(wordToRemove: Word, wordToInsert: Word): void
```
Replaces one word with another.

##### Parameters:
- `wordToRemove: Word` - Word to be removed
- `wordToInsert: Word` - Word to be inserted

##### Behavior:
- Removes old word by ID
- Adds new word with new ID

### Vocabulary Operations

#### concat
```typescript
concat(v2: Vocabulary): Vocabulary
```
Combines two vocabularies into a new one.

##### Parameters:
- `v2: Vocabulary` - Vocabulary to merge with

##### Returns:
- New `Vocabulary` instance containing all words

##### Behavior:
- Creates new vocabulary
- Adds all words from both vocabularies
- Maintains word order

## Usage Examples

### Loading and Saving
```typescript
const vocab = new Vocabulary();
await vocab.loadFromFile('words.txt');
await vocab.writeToFile('updated_words.txt');
```

### Word Lookup
```typescript
// Basic lookup
const words = vocab.lookup('hello');

// Category-filtered lookup
const nouns = vocab.lookup('book', { category: 'noun' });
```

### Word Management
```typescript
// Adding a word
const newWord = new Word(0, {
  ascii: "world",
  ipa: "w ɜːr l d",
  category: "noun"
});
vocab.addWord(newWord);

// Removing a word
vocab.removeWord('hello');

// Replacing a word
vocab.replaceWord(oldWord, newWord);
```

### Vocabulary Operations
```typescript
// Combining vocabularies
const combined = vocab1.concat(vocab2);
```

## Best Practices

1. Always use async/await with file operations
2. Handle lookup errors appropriately
3. Maintain lemma relationships when modifying words
4. Use appropriate filters for word lookups
5. Check for empty/whitespace input before lookups

## Error Handling

The class includes error handling for:
- File operations (read/write)
- Word lookups (not found)
- Invalid input (empty strings)
- Lemma resolution

## Performance Considerations

- Word storage uses array for simple implementation
- Lookup time is O(n) due to array storage
- Lemma caching improves performance for repeated lookups
- File operations are asynchronous for better responsiveness

## Integration

The Vocabulary class is used by:
1. **Morphology**: For word analysis and composition
2. **PhoneticMutation**: For applying phonetic rules
3. **Dictionary**: For word lookup and conversion
4. **Annotator**: For phonetic annotation 