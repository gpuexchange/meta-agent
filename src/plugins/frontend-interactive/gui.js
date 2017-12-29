import React from 'react';
import { render } from 'react-dom';
import rendererStore from './data/rendererStore';
import App from './components/App';

/** global document */
rendererStore.subscribe(() => {
  render(
    React.createElement(App, { store: rendererStore }, null), // <App store={rendererStore} />,
    document.getElementById('app'),
  );
});
