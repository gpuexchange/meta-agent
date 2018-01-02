import { moduleWrapper } from '../common/util';
import MetaModule from '../common/MetaModule';
import StoreService from './services/StoreService';
import DriverRegistryService from './services/DriverRegistryService';
import FrontendRegistryService from './services/FrontendRegistryService';
import StrategyRegistryService from './services/StrategyRegistryService';

class MetaCoreModule extends MetaModule {
  async setup() {
    await super.setup();

    const store = new StoreService();
    const driverRegistry = new DriverRegistryService(store);
    const frontendRegistry = new FrontendRegistryService(store);
    const strategyRegistry = new StrategyRegistryService(store);

    return {
      'driver-registry': driverRegistry,
      'frontend-registry': frontendRegistry,
      'strategy-registry': strategyRegistry,
    };
  }
}


module.exports = moduleWrapper(MetaCoreModule);
