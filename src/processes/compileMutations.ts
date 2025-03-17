
import fs from 'fs/promises'
import { PhoneMap } from '../classes/phonology/PhoneMap';
export async function compileMutations(filepath:string):Promise<PhoneMap[]> {
  const rulesFileText = await fs.readFile(filepath, 'utf-8');
  const rules = rulesFileText.split('\n').filter(r => r !== '');

  const compiledRules:PhoneMap[] = rules.map(rule => {
    const [mutation, environment] = rule.split(':');
    const [targetPhoneme, mapToPhoneme] = mutation.split('->');
    return new PhoneMap(environment.trim(), targetPhoneme.trim(), mapToPhoneme.trim())
  })

  return compiledRules;
}