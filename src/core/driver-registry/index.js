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

    let minerName = subModule.constructor.name // ClassName of the miner
    if (typeof subModule.getSupportedAlgorithms == 'function') {
      let supportedAlgorithms = subModule.getSupportedAlgorithms()
      // Add algorithms into the supported list
      this.getStore().append(
        'session.supportedAlgorithms',
        supportedAlgorithms,
      )

      this.getStore().set(
        'session.drivers.' + minerName + '.supportedAlgorithms',
        supportedAlgorithms,
      )
    } else {
      this.printDebug('The module ' + minerName +
        ' did not report any supported algorithms')
    }
  }
}

module.exports = moduleWrapper(DriverRegistry)