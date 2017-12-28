import { MetaModule, moduleWrapper } from '../../common/MetaModule'

import getJson from 'get-json'
import { promisify } from 'bluebird'

class GXPriceFeedModule extends MetaModule {

  async setup (options, imports): Promise<Object> {
    imports['frontend-registry'].registerDependency(this)
    return super.setup(options, imports)
  }

  async launch (): Promise {
    this.printDebug('Loading coin data from WTM every 15 seconds')
    let store = this.imports['frontend-registry'].getStore()

    let getJsonPromisified = promisify(getJson)
    let fetch = async () => {

      this.printDebug('Fetching coin price')

      try {
        let coinsJson = await getJsonPromisified(
          'https://whattomine.com/coins.json',
        )
        store.set('session.coins', coinsJson)
      }
      catch (err) {
        this.printDebug('ERROR: ' + err.message)
      }

    }

    setInterval(fetch, 15000)
    fetch() // Initial fetch
  }
}

module.exports = moduleWrapper(GXPriceFeedModule)