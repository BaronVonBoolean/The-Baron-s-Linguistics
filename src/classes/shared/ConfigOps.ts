import {config} from '../../../baron.config';

export class ConfigOps {

  static getConfig() {
    return config;
  }

  static getInputFilepath() {
    return config.input;
  }

  static getOutputFilepath() {
    return config.output;
  }

  static getLanguageFilepath() {
    return config.language;
  }

  static getFileCacheFilepath() {
    return config.fileCache;
  }

  static getLoggerConfig() {
    return config.logger;
  }
}

export default ConfigOps;