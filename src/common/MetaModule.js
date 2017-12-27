export class MetaModule {

  constructor (options, imports, register) {
    this.setup(options, imports).then(
      exports => register(null, exports),
    ).catch(
      error => register(error),
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
}

export function moduleWrapper (extendedModuleClass) {
  return (options, imports, register) => {
    return new extendedModuleClass(options, imports, register)
  }
}