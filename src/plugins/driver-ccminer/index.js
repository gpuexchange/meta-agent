import { MetaModule, moduleWrapper } from '../../common/MetaModule'

class CCMinerDriver extends MetaModule {

  async setup (options, imports) {
    const registry = imports['driver-registry']
    registry.registerDependency(this)
    return {
      'driver-ccminer': this,
    }
  }

  getSupportedAlgorithms () {
    return [
      'asic', 'dummycoin',
    ]
  }
}

module.exports = moduleWrapper(CCMinerDriver)