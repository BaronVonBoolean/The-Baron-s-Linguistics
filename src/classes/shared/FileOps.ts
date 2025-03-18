import fs from 'fs/promises';
import { Phoneme } from '../phonology/Phoneme';
import { Morpheme } from '../morphology/Morpheme';
import { Word } from './word';
import { logger } from './Logger';
import { PhoneMap } from '../phonology/PhoneMap';
export type FileInfix = 'phonology' | 'phonemap' | 'morphology' | 'vocabulary'

const idGen = () => {
  idGen._id = (idGen._id || 0) + 1;
  return idGen._id;
}

idGen._id = 0;
export class FileOps {
  constructor() {
    throw new Error('Do not instantiate the FileOps class.')
  }

  static routeInfixToEntity(line: string, validInfix:FileInfix):any {
    switch(validInfix) {
      case 'vocabulary':
        return FileOps.parseVocabularyLine(line);
      case 'phonology':
        return FileOps.parsePhonemeLine(line);
      case 'phonemap':
        return FileOps.parseMutationLine(line);
      case 'morphology':
        return FileOps.parseMorphemeLine(line);
      default:
        throw new Error(`Invalid file extension. Can't handle infix: *.${validInfix}.* .`)
    }
  }

  static async loadFile(filepath: string):Promise<string> {
    return await fs.readFile(filepath, 'utf-8');
  }

  static async loadDataClassFromFile(filepath: string, validInfix:FileInfix):Promise<any[]> {
    logger.log(`Loading file ${filepath.split('/').pop()}`, FileOps);
    const dataEntities:any[] = []
    if(!filepath.split('.').includes(validInfix)) return dataEntities
    const fileRaw = await fs.readFile(filepath, 'utf-8');
    const lines = fileRaw.split('\n');
    for(let line of lines) {
      let entity:any = FileOps.routeInfixToEntity(line, validInfix);
      if(!entity) continue;
      dataEntities.push(entity)
    }
    return dataEntities.filter(entity => entity !== null);
  } 
  static async loadDataClassFromDir(dirpath: string, validInfix:FileInfix):Promise<any[]> {
    // logger.log(`Loading ${validInfix} from ${dirpath.split('/').pop()}`, FileOps);

    let files = await fs.readdir(dirpath);
    files = files.filter(file => file.split('.').includes(validInfix));
    let dataEntities:any[] = [];
    for(let file of files) {
      const entities = await FileOps.loadDataClassFromFile(dirpath + '/' + file, validInfix);
      dataEntities = dataEntities.concat(entities)
    }
    return dataEntities

  }

  static parseVocabularyLine(line: string):Word | null {
    if(line.split(';').length !== 5) return null;
    const wrd = Word.fromLine(line);
    return wrd;
  }

  static parsePhonemeLine(line: string):Phoneme | null {
    const [id, ipa, ascii, category, vectors] = line.split(';');
    if(!id || !ipa || !ascii || !category || !vectors) return null;
    return new Phoneme({
      id: parseInt(id),
      ipa,
      ascii,
      category,
      vectors
    });
  }

  static parseMutationLine(line: string):PhoneMap | null {
    const [targetPhoneme, coda] = line.split('->');
    if(!coda) return null;
    const [ mapToPhoneme, environment] = coda.split(':');
    if(!targetPhoneme || !environment || !mapToPhoneme) return null;
    return new PhoneMap(
      idGen(),
      targetPhoneme.trim(),
      mapToPhoneme.trim(),
      environment.trim()
    );
  }
  static parseMorphemeLine(line: string):Morpheme | null {
    if(line.trim() === '') return null;
    const morph = Morpheme.fromLine(line);
    if(!morph || !morph.ipaParts || !morph.characteristics) return null;
    return morph
  }

  static async writeFile(filepath: string, data: string):Promise<void> {
    return await fs.writeFile(filepath, data, 'utf-8');
  }
  static async appendFile(filepath: string, data: string):Promise<void> {
    return await fs.appendFile(filepath, data, 'utf-8');
  }
}
