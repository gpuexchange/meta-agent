import React from 'react'
import { render } from 'react-dom'

import renderStore from './data/rendererStore'
import App from './components/App'

let count = 1
renderStore.subscribe(
  () => render(<App store={renderStore} count={count}/>,
    document.getElementById('app')),
)