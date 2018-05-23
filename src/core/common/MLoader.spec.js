'use strict'

import jest from 'jest-mock'
import MLoader from './MLoader'

describe('MLoader', () => {
  it('should return the loaded and named module', async () => {
    let loader = new MLoader()
    let mockModule = {
      setup: jest.fn().mockImplementationOnce(
        async function () { return {loadedName: this} }
      ),
      getName: jest.fn().mockReturnValue('loadedName'),
      getDependencies: jest.fn().mockReturnValue([])
    }

    let loadedModules = await loader.loadModules([mockModule])
    let loadedModuleNames = Object.keys(loadedModules)
    expect(loadedModuleNames).toContain('loadedName')
    expect(mockModule.getName).toHaveBeenCalled()
    expect(mockModule.getDependencies).toHaveBeenCalled()
  })
})
