import Registry from '../../common/Registry'

module.exports = function setup (options, imports, register) {

  const registry = new Registry(
    'ui-',
    [],
    [],
  )

  registry.autoSetup(imports, register)
}