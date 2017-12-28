import { MetaModule } from './MetaModule'

export class RegistryModule extends MetaModule {

  /**
   * Set a config/session value
   *
   * @param path
   * @param value
   */
  set (path: string, value) {
    this.store.set(path, value)
  }

  /**
   * Get a config/session value
   * @param path
   * @param defaultValue
   */
  get (path: string, defaultValue = null) {
    return this.store.get(path, defaultValue)
  }

  async setup (options, imports): Promise<Object> {
    let {modulePrefix, readScopes = [], writeScopes = []} = options

    this.store = imports.store
    this.subModules = []
    this.modulePrefix = modulePrefix

    return {
      [modulePrefix + 'registry']: this,
    }
  }

  getStore () {
    return this.store
  }

  /**
   * Register a module that depends on this registry.
   *
   * This method is optionally called from the sub module's constructor or setup
   * method.
   * @param subModule
   */
  registerDependency (subModule) {
    this.subModules.push(subModule)
    this.printDebug('Loaded registry dependency ' + subModule.constructor.name)
  }
}