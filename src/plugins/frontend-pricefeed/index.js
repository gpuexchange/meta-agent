import getJson from 'get-json';
import { promisify } from 'bluebird';

import MetaModule from '../../common/MetaModule';
import { moduleWrapper } from '../../common/util';

class GXPriceFeedModule extends MetaModule {
  async setup(options) {
    this.imports['frontend-registry'].registerDependency(this);
  }

  async fetchCoins() {
    try {
      const store = this.imports['frontend-registry'].getStore();
      // Coin fetching requires API key
      const apiToken = store.get('config.apiKey', false);
      if (!apiToken) {
        return;
      }

      const getJsonPromisified = promisify(getJson);

      const apiPrefix = store.get('config.apiPrefix', 'https://console.gpu.exchange');
      const coins = (await getJsonPromisified(`${apiPrefix}/api/strategies/current/coins?api_token=${apiToken}`));

      store.set('session.coinData', coins);

      this.printDebug('Updated coin data via WTM API');
    } catch (err) {
      this.printDebug(`ERROR: ${err.message}`);
    }
  }

  async fetchForex() {
    try {
      const store = this.imports['frontend-registry'].getStore();
      const getJsonPromisified = promisify(getJson);

      const btcExchangeRates = (
        await getJsonPromisified('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD')
      );
      store.set(
        'session.gpu_exchange.btcExchangeRates',
        btcExchangeRates,
      );
      this.printDebug('Fetched BTC exchange rates');
    } catch (err) {
      this.printDebug('There was an error while fetching USD exchange rate');
    }
  }

  async launch() {
    this.printDebug('Loading coin data from GX API every 15 seconds');

    setInterval(() => this.fetchCoins(), 15000);

    // Initial fetches
    await this.fetchCoins();
    await this.fetchForex();
  }
}

module.exports = moduleWrapper(GXPriceFeedModule);
