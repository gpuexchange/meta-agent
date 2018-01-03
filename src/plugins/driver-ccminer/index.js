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
    const store = this.imports['driver-registry'].getStore();
    const onStatusChange = (status) => {
      store.set('session.miners.status.ccminer_single', status);
    };
    const minerInstance = new GXCCMinerInstance({ onStatusChange });
    store.subscribe(() => {
      // Find the best coin/pool combination that this miner can mine
      // Get all pools that this miner supports
      const coinProfitability = store.get('session.coinProfitability', {});
      const goodPools = store.get('config.pools', [])
        // Supported pools
        .filter(({ coin, algorithm, enabled }) => (
          // The pool is active
          enabled &&
            // we can mine this algorithm
            (CCMinerDriver.getSupportedAlgorithms().indexOf(algorithm) > -1)
            // and at least earn some money
            && coinProfitability[coin] > 0
        )).sort((a, b) => {
          const profitabilityA = coinProfitability[a.coin];
          const profitabilityB = coinProfitability[b.coin];
          if (profitabilityA === profitabilityB) {
            return 0;
          } else if (profitabilityA > profitabilityB) {
            return 1;
          }
          return -1;
        });

      if (goodPools.length > 0) {
        // Start mining with the best pool
        minerInstance.setMiningParams(goodPools[0]);
      }
      // minerInstance.setMiningParams(store.get('config.miners.ccminer', {}));
    });
  }
}

module.exports = moduleWrapper(CCMinerDriver);
