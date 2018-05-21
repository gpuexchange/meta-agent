'use strict'

import MModule from './MModule'

export default class MRegistry extends MModule {
  constructor (options) {
    super(options)
    this.entries = []
  }

  getDependencies () {
    return ['MPubSub']
  }

  add (entry) {
    this.entries.push(entry)
  }

  async batchCall (method, ...args) {
    return Promise.all(this.entries.map(entry => entry[method].apply(entry, args)))
  }
}