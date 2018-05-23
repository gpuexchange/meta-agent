import _ from 'lodash'

import uuid from 'uuid/v1'

import APIService from './api/APIService'
import MLoader from './common/MLoader'
import StrategyRegistry from './strategies/StrategyRegistry'
import WTMStrategy from './strategies/wtm/WTMStrategy'
import MPubSub from './common/MPubSub'

export const run = async () => {
  let modules = {
    [APIService.prototype.constructor.name]: new APIService(),
    [StrategyRegistry.prototype.constructor.name]: new StrategyRegistry(),
    [MPubSub.prototype.constructor.name]: new MPubSub()
  }

  let extraModules = [
    new WTMStrategy()
  ]

  _.each(extraModules, m => { modules[uuid()] = m })

  // Load and wait for all modules
  let loadedModules = await MLoader.loadModules(modules)
  await Promise.all(_.map(loadedModules, (val, key) => val.launch()))

  let refreshing = false
  setInterval(() => {
    if (refreshing) return
    refreshing = true
    loadedModules[StrategyRegistry.prototype.constructor.name].refresh().then(() => { refreshing = false })
  }, 5 * 1000)

  let server = loadedModules[APIService.prototype.constructor.name].getServer()
  return server
}
