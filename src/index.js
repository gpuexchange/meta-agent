import architect from 'architect'
import path from 'path'

let configPath = path.join(__dirname, 'config.js')
let config = architect.loadConfig(configPath)

architect.createApp(config, (err, app) => {
  if (err) {
    throw err
  }

  console.log('App ready')
})

