import { RegistryModule } from '../../common/RegistryModule'
import { moduleWrapper } from '../../common/MetaModule'

class DriverRegistry extends RegistryModule {
  setup (options, imports) {
    return super.setup({
      modulePrefix: 'ui-',
    }, imports)
  }

  launch () {
    this.printDebug('Launching UIs')
    this.subModules.forEach(module => module.launch())
  }
}

module.exports = moduleWrapper(DriverRegistry)