'use strict'

import jest from 'jest-mock'
import MRegistry from './MRegistry'

describe('MRegistry', () => {
  describe('batchCall', () => {
    it('should call the specified method for each of the loaded service', async () => {
      let fakeServiceA = {
        testMethod: jest.fn().mockResolvedValue(1)
      }

      let fakeServiceB = {
        testMethod: jest.fn().mockResolvedValue('OK')
      }

      let registry = new MRegistry()
      registry.add(fakeServiceA)
      registry.add(fakeServiceB)

      let callResults = await registry.batchCall('testMethod')
      expect(callResults[0]).toBe(1)
      expect(callResults[1]).toBe('OK')
      expect(fakeServiceA.testMethod).toHaveBeenCalled()
      expect(fakeServiceB.testMethod).toHaveBeenCalled()
    })

    it('should pass parameters along', async () => {
      let fakeServiceA = {
        testMethod: jest.fn().mockResolvedValue(1)
      }

      let registry = new MRegistry()
      registry.add(fakeServiceA)

      let callResults = await registry.batchCall('testMethod', 'hello', 'world')
      expect(callResults[0]).toBe(1)
      expect(fakeServiceA.testMethod).toHaveBeenCalled()
      expect(fakeServiceA.testMethod).toHaveBeenCalledWith('hello', 'world')
    })
  })

  it('should depend on MPubSub', () => {
    let r = new MRegistry()
    expect(r.getDependencies().indexOf('MPubSub')).toBeGreaterThan(-1)
  })
})
