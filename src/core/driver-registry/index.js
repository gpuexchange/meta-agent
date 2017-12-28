import { RegistryModule } from '../../common/RegistryModule'
import { moduleWrapper } from '../../common/MetaModule'

class DriverRegistry extends RegistryModule {

  setup (options, imports) {
    return super.setup({
      modulePrefix: 'driver-',
    }, imports)
  }

  registerDependency (subModule) {
    super.registerDependency(subModule)

    if (typeof subModule.getSupportedAlgorithms == 'function') {
      // Add algorithms into the supported list
      this.getStore().append(
        'session.supportedAlgorithms',
        subModule.getSupportedAlgorithms(),
      )
    }
  }
}

module.exports = moduleWrapper(DriverRegistry)