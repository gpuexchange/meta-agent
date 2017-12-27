import { createStore } from 'redux'
import objectPath from 'object-path'
import { moduleWrapper, MetaModule } from '../../common/MetaModule'

class StoreModule extends MetaModule {

  async setup (options, imports) {

    console.log('Setting up Store service')

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

    return {
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
    }
  }
}

module.exports = moduleWrapper(StoreModule)