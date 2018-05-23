'use strict'

import ConfigParser from './ConfigParser'

describe('ConfigParser', () => {
  describe('getModules', () => {
    it('should be called after the parser is ready', () => {
      let parser = new ConfigParser()

      parser.prepare()
      expect(parser.getModules()).toEqual([])

      let brokenParser = new ConfigParser()
      expect(() => brokenParser.getModules()).toThrowError(/Parser is not ready./)
    })

    it('should return an array', () => {
      let parser = new ConfigParser()
      parser.prepare()
      let modules = parser.getModules()

      expect(typeof modules).toBe('object')
      expect(typeof modules.length).toBe('number')
    })
  })

  describe('loadCliConfig', () => {
    it('should return the parser object', () => {
      let parser = new ConfigParser()
      expect(parser.loadCliConfig([])).toBe(parser)
    })
  })

  describe('loadJsonConfig', () => {
    it('should return the parser object', () => {
      let parser = new ConfigParser()
      expect(parser.loadJsonConfig([])).toBe(parser)
    })
  })
})
