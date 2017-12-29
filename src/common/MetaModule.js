import { debug } from 'util';

export class MetaModule {
  constructor(options, imports, register) {
    this.printDebug('Initialising');
    this.setup(options, imports).then((exports) => {
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
  async setup(options, imports) {
    this.imports = imports;
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

export function moduleWrapper(ExtendedModuleClass) {
  return (options, imports, register) => new ExtendedModuleClass(options, imports, register);
}
