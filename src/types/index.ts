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

