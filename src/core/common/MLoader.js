'use strict'

import { DepGraph } from 'dependency-graph'

export default class MLoader {
  static async loadModules (modules) {
    let moduleSpec = modules.reduce(
      (accumulator, m) => Object.assign(accumulator, {[m.getName()]: m}), {})

    let graph = new DepGraph()
    let addNode = graph.addNode.bind(graph)

    modules.map(m => m.getName()).map(addNode)

    Object.keys(moduleSpec).map(
      name => moduleSpec[name].getDependencies().map(dependency => {
        console.log(name, 'depends on', dependency)
        graph.addDependency(name, dependency)
      })
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
