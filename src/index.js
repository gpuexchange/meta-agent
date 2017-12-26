import architect from 'architect'
import path from 'path'

let configPath = path.join(__dirname, 'config.js')
let config = architect.loadConfig(configPath)

console.log('Loaded config')
architect.createApp(config, (err, app) => {
  if (err) {
    throw err
  }

  console.log(app.services.store.set('hello.world', 'australia'))
  console.log('App ready')
})

