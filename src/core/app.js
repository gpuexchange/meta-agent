import _ from 'lodash'

import uuid from 'uuid/v1'

import APIService from './api/APIService'
import MLoader from './common/MLoader'
import StrategyRegistry from './strategies/StrategyRegistry'
import WTMStrategy from './strategies/wtm/WTMStrategy'
import MPubSub from './common/MPubSub'

export const run = async () => {
  let modules = [
    // Core modules
    new APIService(null, 'APIService'),
    new StrategyRegistry(null, 'StrategyRegistry'),
    new MPubSub(null, 'MPubSub'),

    // Optional modules
    new WTMStrategy()
  ]

  // Load and wait for all modules
  let loadedModules = await MLoader.loadModules(modules)
  await Promise.all(_.map(loadedModules, (val, key) => val.launch()))

  let refreshing = false
  setInterval(() => {
    if (refreshing) return
    refreshing = true
    loadedModules.StrategyRegistry.refresh().then(() => { refreshing = false })
  }, 5 * 1000)

  let server = loadedModules.APIService.getServer()
  return server
}
