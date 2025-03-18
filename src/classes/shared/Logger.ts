import ConfigOps from './ConfigOps';
import { FileOps } from './FileOps';
const clc = require("cli-color");

const autosaveTimestamp = Date.now();

export const logToFile = (data:string) => FileOps.appendFile(
  `./out/artifacts/logs/${autosaveTimestamp}-autosave.log.txt`, 
  data.replaceAll('', '')
    .replaceAll('[39m', '')
    .replaceAll ('[94m', '')
    .replaceAll('[32m', '\n')
    .replaceAll('[36m', '\n')
    .replaceAll('[35m', '\n')
);
class Logger {
  private logFunction: (message: string) => void;
  private logConfig: {[x:string]: any} = ConfigOps.getLoggerConfig();
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
      const colorFn = clc[color];
      if(!active) return;
      message = '  '.repeat(tabLevel) + message;
      this.logFunction(colorFn(message));
    }
  }
}

export const logger = new Logger();