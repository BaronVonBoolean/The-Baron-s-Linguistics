
# The Word Class 

The `Word` class represents a word with various linguistic properties, including its textual representation, pronunciation, and category. It also supports serialization and deserialization from a string format.

## Types

### `WordCategory`
```typescript
export type WordCategory = 'verb' | 'noun' | 'determiner' | 'bound' | 'none';
```
Defines the possible grammatical categories a word can belong to.

### `WordOptions`
```typescript
export type WordOptions = { 
  ascii: string; 
  ipa: string; 
  category: WordCategory; 
  lemmaId?: number; 
};
```
Defines the options required to create a `Word` instance.

## Class: `Word`

### Properties

#### `id: number`
The unique identifier for the word.

#### `text: string`
The word's textual representation (same as `ascii`).

#### `ascii: string`
The ASCII representation of the word.

#### `ipaParts: string[]`
An array of phonetic symbols representing the word in IPA, split by spaces.

#### `category: WordCategory`
The grammatical category of the word.

#### `lemmaId: number`
The identifier of the word's lemma (base form), if applicable.

#### `lemma?: Word`
The actual `Word` instance representing the lemma, if available.

### Constructor

```typescript
constructor(id: number, opts: WordOptions)
```
Creates a new `Word` instance.

#### Parameters:
- `id: number` – The unique identifier of the word.
- `opts: WordOptions` – An object containing:
  - `ascii: string` – The ASCII representation of the word.
  - `ipa: string` – The International Phonetic Alphabet (IPA) transcription.
  - `category: WordCategory` – The grammatical category.
  - `lemmaId?: number` – (Optional) The ID of the lemma.

### Getters

#### `ipa: string`
```typescript
get ipa(): string
```
Returns the IPA transcription of the word as a single string (concatenated `ipaParts`).

### Static Methods

#### `fromLine(line: string): Word`
```typescript
static fromLine(line: string): Word
```
Parses a semicolon-separated string and creates a `Word` instance.

#### Parameters:
- `line: string` – A semicolon-separated string containing:
  - `id`
  - `ascii`
  - `ipa`
  - `category`
  - `lemmaId`

#### Returns:
- A new `Word` instance.

### Instance Methods

#### `toLine(): string`
```typescript
toLine(): string
```
Serializes the `Word` instance into a semicolon-separated string.

#### Returns:
- A `string` in the format:
  ```
  id;ascii;ipa;category;lemmaId
  ```

---

### Example Usage
```typescript
const word = new Word(1, { 
  ascii: "hello", 
  ipa: "h ə ˈl oʊ", 
  category: "noun" 
});

console.log(word.ipa); // "həˈloʊ"
console.log(word.toLine()); // "1;hello;h ə ˈl oʊ;noun;-1"
```
