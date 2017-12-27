import { createStore } from 'redux'
import objectPath from 'object-path'
import { moduleWrapper, MetaModule } from '../../common/MetaModule'
import _ from 'lodash'

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

    let lastValues = {}

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

        dispatch: (action) => store.dispatch(action),
        subscribe: (callback, path) => store.subscribe(
          () => {
            callback(store.getState())
          },
        ),
      },
    }
  }
}

module.exports = moduleWrapper(StoreModule)