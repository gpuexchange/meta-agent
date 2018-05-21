'use strict'

import MModule from './MModule'
import PubSub from 'pubsub-js'

export default class MPubSub extends MModule {
  publish (topic, data) {
    PubSub.publish(topic, data)
  }

  subscribe (topic, callback) {
    PubSub.subscribe(topic, callback)
  }
}
