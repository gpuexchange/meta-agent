import Registry from './Registry'

describe('Registry', () => {

  describe('::autoSetup', () => {
    it('should only load modules with the specified prefix', () => {
      let registry = new Registry('prefix-')

      let legitSetup = jest.fn()

      let illegalSetup = jest.fn()

      let testImports = {
        'prefix-module': legitSetup,
        'otherPrefix-module': legitSetup,
      }

      let fakeRegister = jest.fn()
      registry.autoSetup(testImports, fakeRegister)

      expect(legitSetup.mock.calls.length).toBe(1)
      expect(illegalSetup.mock.calls.length).toBe(0)

    })

    it('should only expose itself and nothing else to the submodule', () => {
      let registry = new Registry('prefix-')
      let submodule = jest.fn()

      registry.autoSetup({
        'prefix-module': submodule,
      }, jest.fn())

      // Only one call
      expect(submodule.mock.calls.length).toBe(1)
      // Which is the module initialisation
      expect(submodule.mock.calls[0].length).toBe(3)
      // Whose "imports" block (second param) to contain the registry only
      expect(Object.keys(submodule.mock.calls[0][1])).toContain('registry')
    })
  })
})