const path = require('path')
const nodeExternals = require('webpack-node-externals')

let coreConfig = {
  entry: path.join(__dirname, 'src/core/index.js'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'core.js'
  },
  target: 'node',
  externals: [nodeExternals()]
}

let webConfig = {
  entry: path.join(__dirname, 'src/frontend/index.js'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'frontend.js'
  },
  target: 'web'
}

module.exports = [coreConfig, webConfig]
