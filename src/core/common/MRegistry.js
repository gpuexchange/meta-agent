'use strict'

import MModule from './MModule'
import MPubSub from './MPubSub'

export default class MRegistry extends MModule {
  constructor (options, name) {
    super(options, name)
    this.entries = []
  }

  getDependencies () {
    return ['MPubSub']
  }

  add (entry) {
    this.entries.push(entry)
  }

  async batchCall (method, ...args) {
    return Promise.all(
      this.entries.map(entry => entry[method].apply(entry, args)))
  }
}
