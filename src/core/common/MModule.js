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

  _getName () {
    return this.constructor.name
  }

  static _lcFirst (string) {
    return string.charAt(0).toLowerCase() + string.substr(1)
  }
}
