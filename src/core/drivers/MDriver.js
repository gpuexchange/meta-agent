'use strict'

import MRegistry from '../common/MRegistry'

export default class MDriver extends MRegistry {
  async setup (imports) {
    imports.DriverRegistry.add(this)
  }

  getDependencies () {
    return ['DriverRegistry']
  }
}
