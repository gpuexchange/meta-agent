import Registry from '../../common/Registry'

module.exports = function setup (options, imports, register) {

  const registry = new Registry(
    'strategy-',
    [],
    [],
  )

  registry.autoSetup(imports, register)
}