import React from 'react';
import { render } from 'react-dom';
import rendererStore from './data/rendererStore';
import { Provider } from 'react-redux';
import App from './components/App';

/** global document */
rendererStore.subscribe(() => {
  render(
    React.createElement(Provider, {
      store: rendererStore,
    }, React.createElement(App)),
    document.getElementById('app'),
  );
});
