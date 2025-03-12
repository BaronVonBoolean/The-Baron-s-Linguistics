# Phoneme Class Documentation

The `Phoneme` class is a fundamental component of the Baron Linguistics system that represents individual speech sounds in the International Phonetic Alphabet (IPA). It provides functionality for analyzing and categorizing phonemes based on their articulatory properties.

## Type Definitions

### Genera
```typescript
export type Genera = 'vocalic' | 'pulmonic' | 'non-pulmonic' | 'boundary'
```
Defines the main categories of speech sounds:
- `'vocalic'`: Vowel sounds
- `'pulmonic'`: Consonants produced with pulmonic airflow
- `'non-pulmonic'`: Consonants produced without pulmonic airflow
- `'boundary'`: Word boundary marker ('#')

### MannerOfArticulation
```typescript
export type MannerOfArticulation = 
  | 'plosive' 
  | 'nasal' 
  | 'trill' 
  | 'tap' 
  | 'flap' 
  | 'fricative' 
  | 'lateral' 
  | 'approximant'
```
Defines how a consonant is articulated.

### PlaceOfArticulation
```typescript
export type PlaceOfArticulation = 
  | 'bilabial' 
  | 'labiodental' 
  | 'alveolar' 
  | 'retroflex' 
  | 'palatal' 
  | 'velar' 
  | 'uvular' 
  | 'pharyngeal' 
  | 'glottal'
```
Defines where in the vocal tract a consonant is articulated.

### ConsonantVoicing
```typescript
export type ConsonantVoicing = 'voiced' | 'voiceless'
```
Defines whether a consonant is voiced or voiceless.

### VowelHeight
```typescript
export type VowelHeight = 'close' | 'close-mid' | 'mid' | 'open-mid' | 'open'
```
Defines the height of a vowel in the vocal tract.

### VowelBackness
```typescript
export type VowelBackness = 'front' | 'central' | 'back'
```
Defines the backness of a vowel in the vocal tract.

### VowelRounding
```typescript
export type VowelRounding = 'rounded' | 'unrounded'
```
Defines whether a vowel is rounded or unrounded.

## Class Properties

### ipa: string
The IPA symbol representing the phoneme.

### genera: Genera
The main category of the phoneme (vocalic, pulmonic, non-pulmonic, or boundary).

### vectors: GenericVectors
A tuple containing the phoneme's articulatory properties:
- For consonants: `[Genera, MannerOfArticulation, PlaceOfArticulation, ConsonantVoicing]`
- For vowels: `[Genera, VowelHeight, VowelBackness, VowelRounding]`
- For boundaries: `['boundary', null, null, null]`

## Methods

### Constructor
```typescript
constructor(ipaSymbol: string)
```
Creates a new `Phoneme` instance.

#### Parameters:
- `ipaSymbol: string` - The IPA symbol to analyze

#### Behavior:
- Sets the IPA symbol
- Determines the genera based on the symbol
- Initializes the vectors through vectorization

### vectorize
```typescript
vectorize(): ConsonantVectors | VowelVectors | BoundaryVectors
```
Determines the articulatory properties of the phoneme.

#### Returns:
- A tuple of properties based on the phoneme type

#### Behavior:
- Routes to appropriate vectorization method based on genera
- Throws error for unsupported phoneme types

### vectorizeConsonant
```typescript
vectorizeConsonant(): ConsonantVectors
```
Analyzes a consonant's articulatory properties.

#### Returns:
- Tuple of consonant properties: `[Genera, MannerOfArticulation, PlaceOfArticulation, ConsonantVoicing]`

#### Behavior:
- Determines manner of articulation
- Determines place of articulation
- Determines voicing

### vectorizeVowel
```typescript
vectorizeVowel(): VowelVectors
```
Analyzes a vowel's articulatory properties.

#### Returns:
- Tuple of vowel properties: `[Genera, VowelHeight, VowelBackness, VowelRounding]`

#### Behavior:
- Determines vowel height
- Determines vowel backness
- Determines vowel rounding

## Usage Examples

### Creating a Phoneme
```typescript
// Vowel
const vowel = new Phoneme('i');
console.log(vowel.vectors); // ['vocalic', 'close', 'front', 'unrounded']

// Consonant
const consonant = new Phoneme('p');
console.log(consonant.vectors); // ['pulmonic', 'plosive', 'bilabial', 'voiceless']

// Boundary
const boundary = new Phoneme('#');
console.log(boundary.vectors); // ['boundary', null, null, null]
```

### Analyzing Phonetic Properties
```typescript
const phoneme = new Phoneme('k');
console.log(phoneme.genera); // 'pulmonic'
console.log(phoneme.vectors[1]); // 'plosive'
console.log(phoneme.vectors[2]); // 'velar'
console.log(phoneme.vectors[3]); // 'voiceless'
```

## Phonetic Categories

The class supports analysis of various phonetic categories:

### Vowels
- Height: close, close-mid, mid, open-mid, open
- Backness: front, central, back
- Rounding: rounded, unrounded

### Consonants
- Manner: plosive, nasal, fricative, approximant
- Place: bilabial, labiodental, alveolar, retroflex, palatal, velar, uvular, pharyngeal, glottal
- Voicing: voiced, voiceless

## Integration

The Phoneme class is used by:
1. **IPAAdapter**: For converting between phonetic alphabets
2. **PhoneticMutation**: For applying phonetic rules
3. **Selector**: For matching phonemes based on properties
4. **Dictionary**: For phonetic analysis of words

## Best Practices

1. Use valid IPA symbols
2. Handle boundary markers appropriately
3. Consider phonetic properties when analyzing phonemes
4. Use appropriate type checking for vectors
5. Handle unsupported phoneme types gracefully

## Error Handling

The class includes error handling for:
- Unsupported phoneme types
- Invalid vectorization attempts
- Unknown phonetic properties

## Performance Considerations

- Phonetic properties are cached in vectors
- Classification is done once during construction
- Property lookups are optimized for common cases 