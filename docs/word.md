# Word Class Documentation

The `Word` class is a fundamental component of the Baron Linguistics system that represents individual words with their linguistic properties. This class provides functionality for storing and manipulating word data, including text representation, phonetic transcription, and grammatical categorization.

## Type Definitions

The Word class uses types defined in `src/types/index.ts`:

### WordCategory
```typescript
export type WordCategory = 'verb' | 'noun' | 'determiner' | 'none'
```
Defines the possible grammatical categories a word can belong to:
- `'verb'`: Action words
- `'noun'`: Names of people, places, things, or concepts
- `'determiner'`: Words that modify nouns (articles, demonstratives, etc.)
- `'none'`: Default category for uncategorized words

### WordOptions
```typescript
export type WordOptions = {
  ascii: string,      // ASCII representation of the word
  ipa: string,        // IPA transcription
  category: WordCategory,  // Grammatical category
  lemmaId?: number    // Optional ID of the word's lemma
}
```
Defines the options required to create a new `Word` instance.

## Class Properties

### id: number
Unique identifier for the word instance. Defaults to 0.

### text: string
The word's textual representation (same as `ascii`). Defaults to empty string.

### ascii: string
The ASCII representation of the word. Defaults to empty string.

### ipaParts: string[]
Array of phonetic symbols representing the word in IPA, split by spaces. Defaults to empty array.

### category: WordCategory
The grammatical category of the word. Defaults to 'none'.

### lemmaId: number
The identifier of the word's lemma (base form). Defaults to -1 if no lemma is specified.

### lemma?: Word
Optional reference to the actual `Word` instance representing the lemma.

## Methods

### Constructor
```typescript
constructor(id: number, opts: WordOptions)
```
Creates a new `Word` instance.

#### Parameters:
- `id: number` - Unique identifier for the word
- `opts: WordOptions` - Object containing word properties:
  - `ascii: string` - ASCII representation
  - `ipa: string` - IPA transcription (will be split into parts)
  - `category: WordCategory` - Grammatical category
  - `lemmaId?: number` - Optional lemma identifier

### Getters

#### ipa: string
```typescript
get ipa(): string
```
Returns the complete IPA transcription as a single string (concatenated `ipaParts`).

### Static Methods

#### fromLine
```typescript
static fromLine(line: string): Word
```
Creates a `Word` instance from a semicolon-separated string.

#### Parameters:
- `line: string` - Semicolon-separated string in format:
  ```
  id;ascii;ipa;category;lemmaId
  ```

#### Returns:
- New `Word` instance

### Instance Methods

#### toLine
```typescript
toLine(): string
```
Serializes the `Word` instance into a semicolon-separated string.

#### Returns:
- String in format: `id;ascii;ipa;category;lemmaId`

## Usage Examples

### Creating a New Word
```typescript
const word = new Word(1, {
  ascii: "hello",
  ipa: "h ə ˈl oʊ",
  category: "noun",
  lemmaId: 1
});
```

### Loading from File Line
```typescript
const word = Word.fromLine("1;hello;h ə ˈl oʊ;noun;1");
```

### Serializing to File Line
```typescript
const line = word.toLine(); // "1;hello;h ə ˈl oʊ;noun;1"
```

### Accessing IPA
```typescript
console.log(word.ipa); // "həˈloʊ"
console.log(word.ipaParts); // ["h", "ə", "ˈl", "oʊ"]
```

## Integration with Other Components

The `Word` class is used throughout the Baron Linguistics system:

1. **Vocabulary Class**: Manages collections of `Word` instances
2. **PhoneticMutation**: Applies phonetic rules to `Word` instances
3. **Morphology**: Processes word structure and bound morphemes
4. **Dictionary**: Converts between different phonetic representations

## Best Practices

1. Always provide a unique ID when creating new words
2. Use proper IPA transcription format with spaces between phonemes
3. Set appropriate grammatical categories
4. Link words to their lemmas when dealing with inflected forms
5. Use the serialization methods (`toLine`/`fromLine`) for file operations

## Error Handling

The class includes basic error handling:
- Validates input parameters in the constructor
- Handles missing lemma IDs gracefully
- Maintains data consistency during phonetic mutations

## Performance Considerations

- IPA parts are stored as an array for efficient manipulation
- Lemma references are cached to avoid repeated lookups
- String operations are optimized for common use cases

## Related Types

The Word class is part of a larger type system that includes:

- `PhoneticAnnotation`: Structure for phonetic representations
- `PhoneticRule`: Definition of phonetic transformation rules
- `PhoneticRuleset`: Collection of phonetic rules
- `PhoneticAlphabet`: Supported phonetic alphabet types ('ipa' | 'arpa' | 'ascii') 