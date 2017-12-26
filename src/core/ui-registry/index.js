import Registry from '../../common/Registry'

module.exports = function setup (options, imports, register) {

  const uiRegistry = new Registry(
    'ui-',
    [],
    [],
  )

  uiRegistry.autoSetup(imports, register)
}