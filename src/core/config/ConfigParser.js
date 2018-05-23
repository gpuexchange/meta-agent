'use strict'

export default class ConfigParser {

  constructor () {
    this.ready = false
  }

  loadCliConfig (args) {
    return this
  }

  loadJsonConfig (filepath) {
    return this
  }

  prepare () {
    this.ready = true
    return this
  }

  getModules () {
    if (!this.ready) {
      throw new Error('Parser is not ready. Please call `prepare` method first.')
    }

    return []
  }
}
