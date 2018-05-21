'use strict'

import { DepGraph } from 'dependency-graph'

export default class MLoader {
  static async loadModules (moduleSpec = {}) {
    let graph = new DepGraph()
    let addNode = graph.addNode.bind(graph)
    Object.keys(moduleSpec).map(addNode)
    Object.keys(moduleSpec).map(
      name => moduleSpec[name].getDependencies()
        .map(dependency => graph.addDependency(name, dependency))
    )

    let ready = {}
    let loadOrder = graph.overallOrder()

    for (let i = 0; i < loadOrder.length; i++) {
      let moduleName = loadOrder[i]
      let currentModule = moduleSpec[moduleName]
      ready = Object.assign(ready, await currentModule.setup(ready))
    }

    return ready
  }
}