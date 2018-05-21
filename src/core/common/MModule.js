'use strict'

export default class MModule {
  constructor (options = {}) {
    this.options = options
  }

  /**
   * Return a list of dependencies for this service
   * @returns {string[]}
   */
  getDependencies () {
    return []
  }

  getOption (name) {
    return this.options[name] || null
  }

  /**
   * Prepare and export services
   * @param imports
   * @returns {Promise<object>}
   */
  async setup (imports = {}) {
    this.imports = imports
    let exports = {
      [this.constructor.name]: this
    }
    return exports
  }

  async launch () {}

  log () {
    console.info.apply(console, [`[${this.constructor.name}]`].concat(Object.values(arguments)))
  }
}
