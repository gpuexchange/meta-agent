import jest from 'jest-mock'
import sleep from 'sleep-promise'
import MPubSub from './MPubSub'

describe('MPubSub', function () {
  it('should send data back to subscribers', async () => {
    let pubSub = new MPubSub()

    let subscriber1 = jest.fn()
    let subscriber2 = jest.fn()
    let irrelevantSubscriber = jest.fn()

    pubSub.subscribe('test.topic', subscriber1)
    pubSub.subscribe('test', subscriber2)
    pubSub.subscribe('other', irrelevantSubscriber)

    pubSub.publish('test.topic', 'hello')

    await sleep(50) // Add a small delay to ensure message delivery

    expect(subscriber1).toHaveBeenCalled()
    expect(subscriber2).toHaveBeenCalled()
    expect(irrelevantSubscriber).not.toHaveBeenCalled()
  })
})
