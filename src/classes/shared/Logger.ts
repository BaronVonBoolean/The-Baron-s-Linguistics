import { Morphology } from "../morphology/Morphology";
import { Phonology } from "../phonology/Phonology";
import { Vocabulary } from "../vocabulary/Vocabulary";
import { FileOps } from "./FileOps";
const clc = require("cli-color");
class Logger {
  private logFunction: (message: string) => void;
  private logConfig: {[x:string]: any} = {
    Phonology: {
      color: clc.blue,
      active: true,
      tabLevel: 1
    },
    Morphology: {
      color: clc.green,
      active: true, 
      tabLevel: 1
    },
    Vocabulary: {
      color: clc.yellow,
      active: true,
      tabLevel: 1
    },
    FileOps: {
      color: clc.magenta,
      active: true,
      tabLevel: 2,
    },
    Language: {
      color: clc.cyan,
      active: true,
      tabLevel: 0,
    }
  }
  constructor(logFunction?: (message: string) => void) {
    if(!logFunction) this.logFunction = console.log;
    else this.logFunction = logFunction;
  }

  set stdOut(logFunction: (message: string) => void) {
    this.logFunction = logFunction;
  }

  get stdOut() {
    return this.logFunction;
  }

  log(message: string, sender: any) {
    if(sender.name in this.logConfig) {
      const {tabLevel, color, active} = this.logConfig[sender.name];
      if(!active) return;
      message = '  '.repeat(tabLevel) + message;
      this.logFunction(color(message));
    }
  }
}

export const logger = new Logger();