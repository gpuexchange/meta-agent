import _ from 'lodash'

import APIService from './api/APIService'
import MLoader from './common/MLoader'

module.exports.run = async () => {
  let modules = {
    APIService: new APIService()
  }

  // Load and wait for all modules
  let loadedModules = await MLoader.loadModules(modules)
  await Promise.all(_.map(loadedModules, (val, key) => val.launch()))

  let server = loadedModules.APIService.getServer()
  return server
}
