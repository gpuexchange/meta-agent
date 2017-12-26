import { createStore } from 'redux'
import objectPath from 'object-path'

module.exports = function setup (options, imports, register) {

  let store = createStore(
    (state = {}, action) => {
      switch (action.type) {
        case 'SET':
          objectPath.set(state, action.path, action.value)
          return state
        default:
          return state
      }
    },
  )

  register(null, {
    store: {
      set: (path, value) => {
        store.dispatch({
          type: 'SET',
          path: path,
          value: value,
        })

        return value
      },
      get: (path, defaultValue = null) => {
        if (typeof path == 'string') {
          return objectPath.get(store.getState(), path, defaultValue)
        } else {
          return store.getState()
        }
      },

      subscribe: (callback, path) => store.subscribe(
        () => {
          if (typeof path == 'string') {
            callback(objectPath.get(store.getState(), path))
          } else {
            callback(store.getState())
          }
        },
      ),
    },
  })
}