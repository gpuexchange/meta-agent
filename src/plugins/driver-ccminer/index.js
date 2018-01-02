import MetaModule from '../../common/MetaModule';
import { moduleWrapper } from '../../common/util';

import GXCCMinerInstance from './GXCCMinerInstance';

class CCMinerDriver extends MetaModule {
  async setup() {
    const registry = this.imports['driver-registry'];
    registry.registerDependency(this);
    return {
      'driver-ccminer': this,
    };
  }

  static getSupportedAlgorithms() {
    return [
      'asic', 'dummycoin',
    ];
  }

  launch() {
    const minerInstance = new GXCCMinerInstance();
    const store = this.imports['driver-registry'].getStore();
    store.subscribe(() => {
      minerInstance.setMiningParams(store.get('config.miners.ccminer', {}));
    });
  }
}

module.exports = moduleWrapper(CCMinerDriver);
