# Phonological Selector System:

A powerful system for defining and applying phonological rules using feature-based selectors.

## Overview

This system allows you to define phonological transformations using a simple selector syntax. Selectors can target phonemes based on their features (like [vowel], [consonant], [voiced], etc.) and their position in words.

## Selectors

The Baron supports a number of selectors.  See the reference [here](./selectors.md)

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

## Test Coverage

Check out the unit test summary for the current build [here!](./test-report.html)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

