require('babel-register')

import architect from 'architect'
import path from 'path'
import { debug } from 'util'

let configPath = path.join(__dirname, 'config.js')
let config = architect.loadConfig(configPath)

console.log('Loaded config')
architect.createApp(config, (err, app) => {
  if (err) {
    throw err
  }

  debug('Good news! All services have been loaded.')
  app.services['ui-registry'].launch()
})

