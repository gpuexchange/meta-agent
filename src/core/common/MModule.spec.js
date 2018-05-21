import MModule from './MModule'

describe('MModule', () => {
  describe('getOption', () => {
    it('should retains options throughout its lifecycle', () => {
      let m = new MModule({hello: 'world'})
      expect(m.getOption('hello')).toBe('world')
      expect(m.getOption('other')).toBe(null)
    })
  })
  describe('setup', () => {
    it('should, by default, export a service under its class name', async () => {
      class SubModule extends MModule {}

      let sm = new SubModule()
      let exports = await sm.setup({})
      expect(Object.keys(exports)[0]).toBe('SubModule')
    })
  })
})
