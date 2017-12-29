import RegistryModule from '../../common/RegistryModule';
import { moduleWrapper } from '../../common/MetaModule';

class DriverRegistry extends RegistryModule {
  setup(options, imports) {
    return super.setup({
      modulePrefix: 'strategy-',
    }, imports);
  }
}

module.exports = moduleWrapper(DriverRegistry);
