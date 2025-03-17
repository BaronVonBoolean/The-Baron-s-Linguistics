export class Util {
  constructor() {
    throw new Error('Do not instantiate the Util class.')
  }

  static removePunctuationAndNumbers(input: string): string {
    return input.replace(/[\W\d\p{P}]/gu, '');
  }

}