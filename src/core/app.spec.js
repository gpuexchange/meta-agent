import app from './app'
import fetch from 'isomorphic-fetch'

describe('application', () => {
  it('should listen on the port specified by process.env.PORT', async () => {
    const defaultServer = await app.run()

    let response = await fetch('http://localhost:8000')
    expect(response.status).toBe(200)

    defaultServer.close()

    process.env.PORT = '8001'
    const customServer = await app.run()

    let customResponse = await fetch('http://localhost:8001')
    expect(customResponse.status).toBe(200)

    customServer.close()
  })
})
