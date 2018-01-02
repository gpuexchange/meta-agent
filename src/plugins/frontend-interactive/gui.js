import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import rendererStore from './data/rendererStore';
import App from './components/App';

/** global document */
rendererStore.subscribe(() => {
  console.log('Rerendering');
  render(
    React.createElement(App, {
      store: rendererStore,
    }),
    document.getElementById('app'),
  );
});
