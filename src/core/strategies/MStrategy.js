'use strict'

import MModule from '../common/MModule'
import StrategyRegistry from './StrategyRegistry'

import { CoinCodes } from '../common/constants'

export default class MStrategy extends MModule {
  async setup (imports) {
    imports.StrategyRegistry.add(this)
  }

  getDependencies () {
    return ['StrategyRegistry']
  }

  /**
   *
   * @param hashRates A [Coin Code] => Hash/sec map of all available coins
   * @return {Promise.<string>} The [Coin code] that is deemed to be most profitable, based on internal calculation. or `null` of nothing was found (i.e. it's too expensive to mine at all, due to, for example, electricity cost).
   */
  async getOptimalTarget (hashRates = {}) {
    let applicableCoinCodes = Object.keys(hashRates)
    return applicableCoinCodes.length ? applicableCoinCodes[0] : null
  }
}
