import { createStore } from 'redux';
import objectPath from 'object-path';
import readJsonSync from 'read-json-sync';
import { writeFileSync } from 'fs';
import { join } from 'path';

import { moduleWrapper, MetaModule } from '../../common/MetaModule';

class StoreModule extends MetaModule {
  async setup() {
    this.printDebug('Setting up Store service');

    const configPath = join(process.cwd(), 'config.json');

    const store = createStore((state = {}, action) => {
      switch (action.type) {
        case 'LOAD': {
          const fileConfig = readJsonSync(configPath);
          objectPath.set(state, 'config', fileConfig);
          return state;
        }
        case 'SAVE': {
          writeFileSync(
            configPath,
            JSON.stringify(objectPath.get(state, 'config', {})),
          );
          return state; }
        case 'SET': {
          objectPath.set(state, action.path, action.value);
          return state; }
        case 'PUSH': {
          const pathValue = objectPath.get(state, action.path, []);
          pathValue.push(action.value);
          objectPath.set(state, action.path, pathValue);
          return state;
        }
        default: {
          return state;
        }
      }
    });

    return {
      store: {
        set: (path, value) => {
          store.dispatch({
            type: 'SET',
            path,
            value,
          });

          return value;
        },

        get: (path, defaultValue = null) => {
          if (typeof path === 'string') {
            return objectPath.get(store.getState(), path, defaultValue);
          }
          return store.getState();
        },

        append: (path, items) => {
          const pathValue = objectPath.get(store.getState(), path, []);
          let updated = false;
          for (let i = 0; i < items.length; i += 1) {
            if (pathValue.indexOf(items[i]) > -1) {
              pathValue.push(items[i]);
              updated = true;
            }
          }

          if (updated) {
            this.set(path, pathValue);
          }
        },

        dispatch: action => store.dispatch(action),
        subscribe: callback => store.subscribe(() => {
          callback(store.getState());
        }),
      },
    };
  }
}

module.exports = moduleWrapper(StoreModule);
