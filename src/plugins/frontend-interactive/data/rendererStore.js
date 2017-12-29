import { ipcRenderer } from 'electron';
import { createStore } from 'redux';

const localStore = (state = {}, action) => {
  switch (action.type) {
    case 'SET_STATE':
      return action.state;
    default:
      ipcRenderer.send('store-dispatch', action);
      return state; // Will be updated whenever the data comes back from upstream
  }
};

const rendererStore = createStore(localStore);

ipcRenderer.on('store-state', (event, state) => {
  rendererStore.dispatch({
    type: 'SET_STATE',
    state,
  });
});

ipcRenderer.send('store-ping');

export default rendererStore;
