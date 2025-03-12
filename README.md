# Baron Linguistics

A TypeScript-based linguistic analysis and processing tool that provides functionality for phonological analysis, morphological processing, and vocabulary management.

## Overview

Baron Linguistics is a sophisticated tool designed for linguistic analysis and processing. It supports:
- Phonological analysis with IPA transcription
- Morphological processing and analysis
- Vocabulary management and lookup
- Phonetic mutation rules processing
- Bound morpheme handling

## Features

- **Phonological Analysis**: Convert text to IPA (International Phonetic Alphabet) representations
- **Morphological Processing**: Analyze and process word structures, including bound morphemes
- **Vocabulary Management**: Comprehensive word storage and lookup system
- **Phonetic Mutations**: Support for phonetic rule processing and transformations
- **File Processing**: Ability to process text files and generate various output formats

## Project Structure

```
baron-linguistics/
├── src/
│   ├── classes/         # Core class implementations
│   ├── processes/       # Processing utilities
│   ├── errors/         # Error handling
│   ├── types/          # TypeScript type definitions
│   └── index.ts        # Main entry point
├── data/               # Data files (mutations, dictionaries, morphemes)
├── docs/              # Documentation
├── dist/              # Compiled JavaScript output
└── test-input-file.txt # Test input file
```

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd baron-linguistics
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Building the Project

```bash
npm run build
```

### Running the Application

```bash
npm start
```

Or build and start in one command:
```bash
npm run buildStart
```

### Running Tests

```bash
npm test
```

## Core Components

### Word Class
The `Word` class represents individual words with properties including:
- Text representation
- IPA transcription
- Grammatical category
- Lemma information

### Vocabulary Class
The `Vocabulary` class manages collections of words with features for:
- Loading and saving vocabulary files
- Word lookup and filtering
- Lemma management
- Word addition and removal

## Data Files

The project uses several types of data files:
- `mutations/`: Phonetic mutation rules
- `dictionaries/`: Word definitions and pronunciations
- `morphemes/`: Bound morpheme definitions

## Documentation

Detailed documentation is available in the `docs/` directory:
- `word.md`: Documentation for the Word class
- `vocabulary.md`: Documentation for the Vocabulary class

## Development

This project is written in TypeScript and uses:
- Node.js
- TypeScript
- Jest for testing

## License

ISC License

## Author

[Your Name] 