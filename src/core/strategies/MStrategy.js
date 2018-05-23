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

  async getOptimalTarget (hashRates = {}) {
    return CoinCodes.ETH
  }
}
