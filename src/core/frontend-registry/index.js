import RegistryModule from '../../common/RegistryModule';
import { moduleWrapper } from '../../common/MetaModule';

class FrontendRegistry extends RegistryModule {
  setup(options, imports) {
    return super.setup({
      modulePrefix: 'frontend-',
    }, imports);
  }
}

module.exports = moduleWrapper(FrontendRegistry);
