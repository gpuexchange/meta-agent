import path from 'path';
import fs from 'fs';

function getAllSubPaths(parentDir) {
  return fs.readdirSync(parentDir)
    .filter(f => fs.statSync(path.join(parentDir, f)).isDirectory())
    .map(subDirectory => path.join(parentDir, subDirectory));
}

const corePaths = getAllSubPaths(path.join(__dirname, 'core'));

const basePlugins = getAllSubPaths(path.join(__dirname, 'plugins'));

const extraPlugins = getAllSubPaths(path.join(process.cwd(), 'plugins'));

const loadPaths = [...corePaths, ...basePlugins, ...extraPlugins];

module.exports = loadPaths;
