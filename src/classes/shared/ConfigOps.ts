import { environments } from '../../../baron.config';

type EnvironmentLabel = 'test' | 'development' | 'production';

export class ConfigOps {

  static config = environments['development'];
  
  static setEnvironment(environment: EnvironmentLabel) {
    console.log('Setting environment to:', environment);
    ConfigOps.config = environments[environment];
  }

  static getConfig() {
    return ConfigOps.config;
  }

  static getInputFilepath() {
    return ConfigOps.config.input;
  }

  static getOutputFilepath() {
    return ConfigOps.config.output;
  }

  static getLanguageFilepath() {
    return ConfigOps.config.language;
  }

  static getFileCacheFilepath() {
    return ConfigOps.config.fileCache;
  }

  static getLoggerConfig() {
    return ConfigOps.config.logger;
  }
}

export default ConfigOps;