import { MetaModule, moduleWrapper } from '../../common/MetaModule'

import getJson from 'get-json'
import { promisify } from 'bluebird'

class GXPriceFeedModule extends MetaModule {

  async setup (options, imports): Promise<Object> {
    imports['frontend-registry'].registerDependency(this)
    return super.setup(options, imports)
  }

  async launch (): Promise {
    this.printDebug('Loading coin data from WTM every minute')
    let store = this.imports['frontend-registry'].getStore()

    let getJsonPromisified = promisify(getJson)

    let fetch = async () => {

      this.printDebug('Fetching coin price')

      try {

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
        store.set('session.gpu_exchange.pricefeed', processedCoins)
      } catch (err) {
        this.printDebug('ERROR: ' + err.message)
      }

    }

    setInterval(fetch, 60000)
    fetch() // Initial fetch
  }
}

module.exports = moduleWrapper(GXPriceFeedModule)