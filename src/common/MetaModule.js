import { error as debug } from 'console';

export default class MetaModule {
  constructor(options, imports, register) {
    this.printDebug('Initialising');
    this.imports = imports;
    this.setup(options).then((exports) => {
      this.printDebug('Ready', 'green');
      register(null, exports);
    }).catch((error) => {
      this.printDebug('Initialisation failed', 'red');
      register(error);
    });
  }

  /**
   *
   * @param options: Object
   * @param imports: Object
   * @return {Promise<Object>}
   */
  async setup() {
    return {};
  }

  async launch() {
    // To be implemented at subclasses
    this.printDebug(`Launched ${this.constructor.name}`);
  }

  printDebug(message) {
    debug(`[${this.constructor.name}] ${message}`);
  }
}
