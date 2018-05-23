import { run as appRun } from '../src/core/app'
import fetch from 'isomorphic-fetch'

describe('application', () => {
  it('should listen on the port specified by process.env.PORT', async () => {
    process.env.PORT = '8001'
    const customServer = await appRun()

    let customResponse = await fetch('http://localhost:8001')
    expect(customResponse.status).toBe(200)

    customServer.close()
  })
})
