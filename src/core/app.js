import _ from 'lodash'

import APIService from './api/APIService'
import MLoader from './common/MLoader'
import WTMStrategy from './strategies/wtm/WTMStrategy'

import uuid from 'uuid/v1'
import StrategyRegistry from './strategies/StrategyRegistry'
import MPubSub from './common/MPubSub'

module.exports.run = async () => {
  let modules = {
    APIService: new APIService(),
    StrategyRegistry: new StrategyRegistry(),
    MPubSub: new MPubSub()
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
    loadedModules.StrategyRegistry.refresh().then(() => { refreshing = false })
  }, 5 * 1000)

  let server = loadedModules.APIService.getServer()
  return server
}
