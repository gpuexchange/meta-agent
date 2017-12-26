import Registry from '../../common/Registry'

export default (options, imports, register) => {

  const uiRegistry = new Registry(
    'ui-',
    [],
    [],
  )

  uiRegistry.autoRegister(imports, register)
}