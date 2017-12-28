import { debug } from 'util'

export class MetaModule {

  constructor (options, imports, register) {
    this.printDebug('Initialising')
    this.setup(options, imports).then(
      exports => {
        this.printDebug('Ready', 'green')
        register(null, exports)
      },
    ).catch(
      error => {
        this.printDebug('Initialisation failed', 'red')
        register(error)
      },
    )
  }

  /**
   *
   * @param options: Object
   * @param imports: Object
   * @return {Promise<Object>}
   */
  async setup (options, imports) {
    return {}
  }

  printDebug (message, color = 'white') {
    debug('[' + this.constructor.name + '] ' + message)
  }
}

export function moduleWrapper (extendedModuleClass) {
  return (options, imports, register) => {
    return new extendedModuleClass(options, imports, register)
  }
}