import { error as debug } from 'console';

export default class BaseRegistryService {
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

  constructor(store) {
    this.store = store;
    this.subModules = [];
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
    debug(`Loaded registry dependency ${subModule.constructor.name}`);
  }

  launch() {
    debug('Launching Sub services');
    this.subModules.forEach(module => module.launch());
  }
}
