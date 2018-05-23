'use strict'

import MRegistry from '../common/MRegistry'
import MPubSub from '../common/MPubSub'

import { CoinCodes } from '../common/constants'

export default class StrategyRegistry extends MRegistry {
  async refresh () {
    this.log('Refreshing strategy')
    this.imports[MPubSub.name].publish('strategy.active.coin', CoinCodes.ETHEREUM)
  }
}
