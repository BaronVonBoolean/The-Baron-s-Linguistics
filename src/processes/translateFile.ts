import { Annotator } from "../classes/phonology/Annotator";
import { Word } from "../classes/word";
import { PhoneticRuleset } from "../types";
import fs from 'fs/promises'



export async function translateFile(
  annotator: Annotator, 
  filepath:string, 
  rules:PhoneticRuleset
):Promise<string> {
  const fileContents = await fs.readFile(filepath, 'utf8');
  const linewise = fileContents.split('\n');

  let linewiseAnnotations:Word[][] = await Promise.all(linewise.map(line => annotator.bulkRun('ipa', line, rules)))
  
  let asciiStr = '',
  ipaStr = ''
  
  for(let annotations of linewiseAnnotations) {
    asciiStr += annotations.map(annotation => annotation.ascii).join(' ') + '\n';
    ipaStr += annotations.map(annotation => annotation.ipa).join(' ') + '\n';
  
  }

  function infix(path:string, infix:string):string {
    const parts = path.split('.');
    const ext = parts.pop();
    parts.push(infix);
    return parts.join('.')+'.'+ext
  }

  await fs.writeFile(
    infix(filepath, 'ascii'),
    '',
    'utf-8'
  )

  await fs.appendFile(
    infix(filepath, 'ascii'),
    asciiStr,
    'utf-8'
  )

  await fs.writeFile(
    infix(filepath, 'ipa'),
    '',
    'utf-8'
  )
  
  await fs.appendFile(
    infix(filepath, 'ipa'),
    ipaStr,
    'utf-8'
  )

  return infix(filepath, 'ipa');
}