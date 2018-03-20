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
      const bestCoins = store.get('session.bestCoins', []);
      const coinPriorities = {};
      for (let i = 0; i < bestCoins.length; i += 1) {
        // First in list => higher priority / more important
        coinPriorities[bestCoins[i].coinName] = bestCoins.length - i;
      }

      // this.printDebug(`Coin priorities ${JSON.stringify(coinPriorities)}`);

      const goodPools = store.get('config.pools', [])
        // Supported pools
        .filter(({ enabled }) => (
          // The pool is active
          enabled
          // TODO: we can mine this algorithm
          // *&& (CCMinerDriver.getSupportedAlgorithms().indexOf(algorithm) > -1)
        )).sort((a, b) => {
          if (coinPriorities[a.coin] === coinPriorities[b.coin]) {
            return 0; // Doesn't matter
          }

          if (coinPriorities[a.coin] > coinPriorities[b.coin]) {
            return -1; // A comes first
          }

          return 1;
        });

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
