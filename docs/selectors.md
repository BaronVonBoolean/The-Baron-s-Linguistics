
## Basic Selectors

- Literal IPA symbols: `a _ c` (matches exact phonemes)
- Wildcard: `* _ c` (matches any phoneme in that position)

## Category Selectors

- `[vowel]` - Selects all vowel phonemes
- `[consonant]` - Selects all consonant phonemes

## Vowel Feature Selectors

### Height
- `[open]` - Open vowels
- `[openMid]` - Open-mid vowels
- `[mid]` - Mid vowels
- `[closeMid]` - Close-mid vowels
- `[close]` - Close vowels

### Position
- `[front]` - Front vowels
- `[central]` - Central vowels
- `[back]` - Back vowels

### Lip Position
- `[rounded]` - Rounded vowels
- `[unrounded]` - Unrounded vowels

### Special
- `[diphthong]` - Diphthongs

## Consonant Feature Selectors

### Manner of Articulation
- `[plosive]` - Plosive consonants
- `[nasal]` - Nasal consonants
- `[trill]` - Trill consonants
- `[tap]` - Tap consonants
- `[fricative]` - Fricative consonants
- `[lateral]` - Lateral consonants
- `[approximant]` - Approximant consonants

### Place of Articulation
- `[bilabial]` - Bilabial consonants
- `[labiodental]` - Labiodental consonants
- `[dental]` - Dental consonants
- `[alveolar]` - Alveolar consonants
- `[postalveolar]` - Postalveolar consonants
- `[retroflex]` - Retroflex consonants
- `[palatal]` - Palatal consonants
- `[velar]` - Velar consonants
- `[uvular]` - Uvular consonants
- `[pharyngeal]` - Pharyngeal consonants
- `[glottal]` - Glottal consonants

### Voicing
- `[voiced]` - Voiced consonants
- `[voiceless]` - Voiceless consonants

## Usage

Selectors can be used to define phonological rules. Each rule has the format:

```typescript
new PhoneMap(environment, targetPhoneme, mapToPhoneme)
```

For example:
```typescript
// Rule: Convert 'b' to 'c' when it appears between 'a' and 'c'
new PhoneMap('a _ c', 'b', 'c')

// Rule: Convert any voiced consonant to 'c' when it appears before 'e'
new PhoneMap('[voiced] _ e', 'd', 'c')
```

## Examples

```typescript
// Convert all vowels to 'a' when they appear before 'd'
new PhoneMap('[vowel] _ d', '*', 'a')

// Convert all voiced consonants to their voiceless counterparts
new PhoneMap('[voiced]', '*', '[voiceless]')
```