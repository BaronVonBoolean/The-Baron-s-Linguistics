export type PhoneticAnnotation = {
  text: string,
  arpa: string[],
  ipa: string[],
  ascii: string[]
}

export type PhoneticRule = {
  environment: string,
  targetPhoneme: string,
  mapToPhoneme: string
}

export type PhoneticRuleset = PhoneticRule[];

export type PhoneticAlphabet = 'ipa' | 'arpa' | 'ascii'

export type WordCategory = 'verb' | 'noun' | 'determiner' | 'none'

export type WordOptions = {ascii: string, ipa: string, category: WordCategory, lemmaId?: number}
