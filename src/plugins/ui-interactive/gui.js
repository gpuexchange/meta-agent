import React from 'react'
import { render } from 'react-dom'

import renderStore from './data/rendererStore'
import App from './components/App'

renderStore.subscribe(
  () => render(<App store={renderStore}/>,
    document.getElementById('app')),
)