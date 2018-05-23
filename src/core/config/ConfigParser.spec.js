'use strict'

import ConfigParser from './ConfigParser'

describe('ConfigParser', () => {
  describe('loadModules', () => {
    it('should return an array', () => {
      let parser = new ConfigParser()
      let modules = parser.loadModules()

      expect(typeof modules).toBe('object')
      expect(typeof modules.length).toBe('number')
    })
  })

  describe('parseCliConfig', () => {
    it('should return the parser object', () => {
      let parser = new ConfigParser()
      expect(parser.parseCliConfig([])).toBe(parser)
    })
  })

  describe('parseJsonConfig', () => {
    it('should return the parser object', () => {
      let parser = new ConfigParser()
      expect(parser.parseJsonConfig([])).toBe(parser)
    })
  })
})
