import { createStore } from 'redux'
import objectPath from 'object-path'
import { moduleWrapper, MetaModule } from '../../common/MetaModule'
import readJsonSync from 'read-json-sync'
import { writeFileSync } from 'fs'
import path from 'path'

class StoreModule extends MetaModule {

  async setup (options, imports) {

    console.log('Setting up Store service')

    let configPath = path.join(process.cwd(), 'config.json')

    let store = createStore(
      (state = {}, action) => {
        switch (action.type) {
          case 'LOAD':
            let fileConfig = readJsonSync(configPath)
            objectPath.set(state, 'config', fileConfig)
            return state
          case 'SAVE':
            writeFileSync(
              configPath,
              JSON.stringify(objectPath.get(state, 'config', {})),
            )
            return state
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

        append: (path, items) => {
          let pathValue = objectPath.get(store.getState(), path, [])
          let updated = false
          for (let i = 0; i < items.length; i++) {
            if (pathValue.indexOf(items[i]) > -1) {
              pathValue.push(items[i])
              updated = true
            }
          }

          if (updated) {
            this.set(path, pathValue)
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