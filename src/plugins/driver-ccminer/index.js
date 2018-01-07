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
    if (!store.get('config.miners.ccminer')) {
      this.printDebug('CCMiner driver is disabled.');
      return;
    }

    const onStatusChange = (status) => {
      store.set('session.miners.status.ccminer_single', status);
    };
    const minerInstance = new GXCCMinerInstance({ onStatusChange });
    store.subscribe(() => {
      // Find the best coin/pool combination that this miner can mine
      // Get all pools that this miner supports
      const coinData = store.get('session.coinData', []);
      const hashEarnings = {};
      coinData.map((coin) => {
        hashEarnings[coin.coinName] = coin.convertedEarningPerHash;
        return null;
      });

      const goodPools = store.get('config.pools', [])
        // Supported pools
        .filter(({ coin, enabled }) => (
          // The pool is active
          enabled
            // TODO: we can mine this algorithm
            // *&& (CCMinerDriver.getSupportedAlgorithms().indexOf(algorithm) > -1)
            // and at least earn some money
            && hashEarnings[coin]
        ));

      /* .sort((a, b) => {
          const profitabilityA = coinData[a.coin].convertedEarningPerHash;
          const profitabilityB = coinData[b.coin].convertedEarningPerHash;
          if (profitabilityA === profitabilityB) {
            return 0;
          } else if (profitabilityA > profitabilityB) {
            return 1;
          }
          return -1;
        }); */

      console.log('Good Pools', goodPools);

      if (goodPools.length > 0) {
        // Start mining with the best pool
        minerInstance.setMiningParams(goodPools[0]);
      } else {
        // Stop mining
        minerInstance.setMiningParams(false);
      }
      // minerInstance.setMiningParams(store.get('config.miners.ccminer', {}));
    });
  }
}

module.exports = moduleWrapper(CCMinerDriver);
