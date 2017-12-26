import { createStore } from 'redux'
import objectPath from 'object-path'

let store = createStore(
  (state = {}, action) => {
    switch (action.type) {
      case 'SET':
        return objectPath.set(state, action.path, action.value)
      default:
        return state
    }
  },
)

module.exports = function setup (options, imports, register) {

  register(null, {
    store: {
      set: (path, value) => {
        store.dispatch({
          type: 'SET',
          path: path,
          value: value,
        })
      },
      get: (path, defaultValue = null) => {
        if (typeof path == 'string') {
          return objectPath.get(store.getState(), path, defaultValue)
        } else {
          return store.getState()
        }
      },
      subscribe: callback => store.subscribe(callback),
    },
  })
}