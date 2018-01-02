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
      const getJsonPromisified = promisify(getJson);

      const { coins } = (await getJsonPromisified('https://whattomine.com/coins.json'));

      const processedCoins = Object.keys(coins).map((coinName) => {
        const coinData = coins[coinName];

        const earningPerHash = coinData.block_reward /
            parseFloat(coinData.block_time) / coinData.nethash;

          // Earning in a base currency, such as BTC
        const convertedEarningPerHash = earningPerHash *
            coinData.exchange_rate;
        const baseCurrency = coinData.exchange_rate_curr;

        const { algorithm, tag } = coinData;

        return Object.assign({
          coinName,
          tag,
          algorithm,
          earningPerHash,
          convertedEarningPerHash,
          exchangeCurrency: baseCurrency,
        }, coinData);
      });
      store.set('session.gpu_exchange.coinData', processedCoins);
      store.set('session.gpu_exchange.rawCoins', coins);

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
    this.printDebug('Loading coin data from WTM every minute');

    setInterval(() => this.fetchCoins(), 60000);

    // Initial fetches
    await this.fetchCoins();
    await this.fetchForex();
  }
}

module.exports = moduleWrapper(GXPriceFeedModule);
