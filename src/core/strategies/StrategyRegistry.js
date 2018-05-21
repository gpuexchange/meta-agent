'use strict'

import MRegistry from '../common/MRegistry'

import { CoinCodes } from '../common/constants'

export default class StrategyRegistry extends MRegistry {
  async refresh () {
    this.log('Refreshing strategy')
    this.imports.MPubSub.publish('strategy.active.coin', CoinCodes.ETHEREUM)
  }
}
