
export const environments = {
  development: {
    input: './test-input-file.ts',
    output: './out/artifacts/translations/translations.txt',
    language: './data/languages/english.language.txt',
    fileCache: './out/artifacts/',
    logger: {
      // Color options:
        // black, blackBright
        // red, redBright
        // green, greenBright
        // yellow, yellowBright
        // blue, blueBright
        // magenta, magentaBright
        // cyan, cyanBright
        // white, whiteBright
  
      Phonology: {
        color: 'green',
        active: false,
        tabLevel: 1
      }, 
      Morphology: {
        color: 'magenta',
        active: false, 
        tabLevel: 1
      },
      Vocabulary: {
        color: 'cyan',
        active: false,
        tabLevel: 1
      },
      FileOps: {
        color: 'whiteBright',
        active: false,
        tabLevel: 3
      },
      Syntax: {
        color: 'orange',
        active: false,
        tabLevel: 1
      },
      Language: {
        color: 'blueBright',
        active: false,
        tabLevel: 0
      }
    }
  },
  production: {
    input: './test-input-file.ts',
    output: './out/artifacts/translations/translations.txt',
    language: './data/languages/english.language.txt',
    fileCache: './out/artifacts/',
    logger: {
      // Color options:
        // black, blackBright
        // red, redBright
        // green, greenBright
        // yellow, yellowBright
        // blue, blueBright
        // magenta, magentaBright
        // cyan, cyanBright
        // white, whiteBright
  
      Phonology: {
        color: 'green',
        active: true,
        tabLevel: 1
      }, 
      Morphology: {
        color: 'magenta',
        active: true, 
        tabLevel: 1
      },
      Vocabulary: {
        color: 'cyan',
        active: true,
        tabLevel: 1
      },
      FileOps: {
        color: 'whiteBright',
        active: true,
        tabLevel: 3
      },
      Syntax: {
        color: 'orange',
        active: true,
        tabLevel: 1
      },
      Language: {
        color: 'blueBright',
        active: true,
        tabLevel: 0
      }
    }
  },
  test: {
    input: './test-input-file.ts',
    output: './out/artifacts/translations/translations.txt',
    language: './data/languages/english.language.txt',
    fileCache: './out/artifacts/',
    logger: {
      // Color options:
        // black, blackBright
        // red, redBright
        // green, greenBright
        // yellow, yellowBright
        // blue, blueBright
        // magenta, magentaBright
        // cyan, cyanBright
        // white, whiteBright
  
      Phonology: {
        color: 'green',
        active: false,
        tabLevel: 1
      }, 
      Morphology: {
        color: 'magenta',
        active: false, 
        tabLevel: 1
      },
      Vocabulary: {
        color: 'cyan',
        active: false,
        tabLevel: 1
      },
      FileOps: {
        color: 'whiteBright',
        active: false,
        tabLevel: 3
      },
      Syntax: {
        color: 'orange',
        active: false,
        tabLevel: 1
      },
      Language: {
        color: 'blueBright',
        active: false,
        tabLevel: 0
      }
    }
  }
}

