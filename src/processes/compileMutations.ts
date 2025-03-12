import { PhoneticMutation } from "../classes/phonology/PhoneticMutation";
import { PhoneticMutationPipeline } from "../classes/phonology/PhoneticMutationPipeline";
import fs from 'fs/promises'
import { PhoneticRule } from "../types";
export async function compileMutations(filepath:string):Promise<PhoneticRule[]> {
  const rulesFileText = await fs.readFile(filepath, 'utf-8');
  const rules = rulesFileText.split('\n').filter(r => r !== '');

  const compiledRules:PhoneticRule[] = rules.map(rule => {
    const [mutation, environment] = rule.split(':');
    const [targetPhoneme, mapToPhoneme] = mutation.split('->');
    return {
      environment: environment.trim(),
      targetPhoneme: targetPhoneme.trim(),
      mapToPhoneme: mapToPhoneme.trim()
    }
  })

  return compiledRules;
}