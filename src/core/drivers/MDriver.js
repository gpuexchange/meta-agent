'use strict'

import MRegistry from '../common/MRegistry'

export default class MDriver extends MRegistry {
  async setup (imports) {
    let {driverRegistry} = imports
    driverRegistry.add(this)
  }

  getDependencies () {
    return ['driverRegistry']
  }
}
