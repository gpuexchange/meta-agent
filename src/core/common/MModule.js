'use strict'

export default class MModule {
  constructor (options = {}, name) {
    if (typeof name !== 'string') {
      name = this.constructor.name
    }

    this.name = name
    this.options = options || {}
  }

  getName () {
    this.log('Hello')
    return this.name
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
      [this.name]: this
    }
    return exports
  }

  async launch () {}

  log () {
    console.info.apply(console,
      [`[${this.name}]`].concat(Object.values(arguments)))
  }
}
