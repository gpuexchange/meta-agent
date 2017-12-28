import { MetaModule, moduleWrapper } from '../../common/MetaModule'

import getJson from 'get-json'
import { promisify } from 'bluebird'

class GXPriceFeedModule extends MetaModule {

  async setup (options, imports): Promise<Object> {
    imports['frontend-registry'].registerDependency(this)
    return super.setup(options, imports)
  }

  async fetchCoins () {

    try {
      let store = this.imports['frontend-registry'].getStore()
      let getJsonPromisified = promisify(getJson)

      let coins = (await getJsonPromisified(
        'https://whattomine.com/coins.json',
      )).coins

      let processedCoins = Object.keys(coins).map(
        coinName => {
          let coinData = coins[coinName]

          let earningPerHash = coinData['block_reward'] /
            parseFloat(coinData['block_time']) / coinData['nethash']

          // Earning in a base currency, such as BTC
          let convertedEarningPerHash = earningPerHash *
            coinData['exchange_rate']
          let baseCurrency = coinData['exchange_rate_curr']

          let algorithm = coinData['algorithm']
          let tag = coinData['tag']

          return Object.assign({
            coinName,
            tag,
            algorithm,
            earningPerHash,
            convertedEarningPerHash,
            exchangeCurrency: baseCurrency,
          }, coinData)
        },
      )
      store.set('session.gpu_exchange.coinData', processedCoins)
      store.set('session.gpu_exchange.rawCoins', coins)

      this.printDebug('Updated coin data via WTM API')

    } catch (err) {
      this.printDebug('ERROR: ' + err.message)
    }

  }

  async fetchForex () {
    try {
      let store = this.imports['frontend-registry'].getStore()
      let getJsonPromisified = promisify(getJson)

      let btcExchangeRates = (
        await getJsonPromisified(
          'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD')
      )
      store.set('session.gpu_exchange.btcExchangeRates',
        btcExchangeRates,
      )
      this.printDebug('Fetched BTC exchange rates')
    } catch (err) {
      this.printDebug('There was an error while fetching USD exchange rate')
    }
  }

  async launch (): Promise {
    this.printDebug('Loading coin data from WTM every minute')

    setInterval(() => this.fetchCoins(), 60000)

    // Initial fetches
    await this.fetchCoins()
    await this.fetchForex()
  }
}

module.exports = moduleWrapper(GXPriceFeedModule)