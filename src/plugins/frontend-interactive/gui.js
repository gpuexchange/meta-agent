import React from 'react'
import { render } from 'react-dom'
import rendererStore from './data/rendererStore'
import App from './components/App'

rendererStore.subscribe(
  () => {

    render(<App store={rendererStore}/>,
      document.getElementById('app'))
  },
)