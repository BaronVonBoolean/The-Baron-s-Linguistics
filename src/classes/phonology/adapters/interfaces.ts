import { PhoneticRule } from "../../../types"

export interface Validator {
  validateEnvironment: (rule:PhoneticRule, symbols: string[], idx: number) => boolean
}

export interface Matcher {
  symbolMatchesSelector:(symbol: string, selector: string) => boolean
}

export interface Appliable {
  apply(rule: PhoneticRule, arrayOfCharacters: string[]):string[]
}
