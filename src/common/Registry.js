/**
 * @property store
 * @property modulePrefix: string
 */
export default class Registry {

  /**
   * Generate a registry of sub-modules
   *
   * @param modulePrefix
   * @param readScopes
   * @param writeScopes
   */
  constructor (
    modulePrefix: string,
    readScopes: Array<string> = new Array(),
    writeScopes: Array<string> = new Array()) {

    this.modulePrefix = modulePrefix
    this.setReadPermissions(readScopes)
    this.setWritePermissions(writeScopes)
  }

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

  autoSetup (imports, register) {
    let pluginLoader = imports['plugin-loader']
    this.store = imports.store

    let options = []
    // Load and prepare modules
    for (var importName in imports) {
      if (importName.startsWith(this.modulePrefix)) {
        let subModule = imports[importName]
        subModule(options, {
          registry: this,
        }, register)
      }
    }

    // Only expose the top level registry to the application
    return register(
      null, {
        [this.modulePrefix + 'registry']: this,
      },
    )
  }
}