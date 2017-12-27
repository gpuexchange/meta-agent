import { MetaModule } from './MetaModule'

export class RegistryModule extends MetaModule {

  /**
   * Set write scopes.
   *
   * The read scopes are specified by the object path that modules under this registry will receive notification for
   *
   * @param readScopes
   */
  setReadPermissions (readScopes: Array<string>): void {
    this.readScopes = readScopes
  }

  /**
   * Set the write scopes.
   *
   * The write scopes are specified by events that this registry's module will accept
   *
   * @param writeScopes
   */
  setWritePermissions (writeScopes: Array<string>): void {
    this.writeScopes = writeScopes
  }

  async setup (options, imports): Promise<Object> {
    let {modulePrefix, readScopes = [], writeScopes = []} = options

    this.store = imports.store
    this.modulePrefix = modulePrefix
    this.setReadPermissions(readScopes)

    this.setWritePermissions(writeScopes)
    return {
      [modulePrefix + 'registry']: this,
    }
  }
}