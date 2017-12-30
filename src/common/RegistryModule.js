import { MetaModule } from './MetaModule';

export default class RegistryModule extends MetaModule {
  /**
   * Set a config/session value
   *
   * @param path
   * @param value
   */
  set(path, value) {
    this.store.set(path, value);
  }

  /**
   * Get a config/session value
   * @param path
   * @param defaultValue
   */
  get(path, defaultValue = null) {
    return this.store.get(path, defaultValue);
  }

  async setup(options, imports) {
    const { modulePrefix } = options;

    this.store = imports.store;
    this.subModules = [];
    this.modulePrefix = modulePrefix;

    return {
      [`${modulePrefix}registry`]: this,
    };
  }

  getStore() {
    return this.store;
  }

  /**
   * Register a module that depends on this registry.
   *
   * This method is optionally called from the sub module's constructor or setup
   * method.
   * @param subModule
   */
  registerDependency(subModule) {
    this.subModules.push(subModule);
    this.printDebug(`Loaded registry dependency ${subModule.constructor.name}`);
  }

  launch() {
    this.printDebug('Launching Sub modules');
    this.subModules.forEach(module => module.launch());
  }
}
