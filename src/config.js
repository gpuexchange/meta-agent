import path from 'path'
import fs from 'fs'

function getAllSubPaths (parentDir) {
  return fs.readdirSync(parentDir).
    filter(f => fs.statSync(path.join(parentDir, f)).isDirectory()).map(
      subDirectory => path.join(parentDir, subDirectory),
    )
}

let corePaths = getAllSubPaths(
  path.join(__dirname, 'core'),
)

let basePlugins = getAllSubPaths(
  path.join(__dirname, 'plugins'),
)

let extraPlugins = getAllSubPaths(
  path.join(process.cwd(), 'plugins'),
)

let loadPaths = [...corePaths, ...basePlugins, ...extraPlugins]

console.log(loadPaths)

module.exports = loadPaths