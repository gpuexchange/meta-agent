'use strict'

import MModule from '../common/MModule'
import StrategyRegistry from './StrategyRegistry'

import { CoinCodes } from '../common/constants'

export default class MStrategy extends MModule {
  async setup (imports) {
    imports[StrategyRegistry.name].add(this)
  }

  getDependencies () {
    return [StrategyRegistry.name]
  }

  async getOptimalTarget (hashRates = {}) {
    return CoinCodes.ETH
  }
}
