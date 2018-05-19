// TODO: Add appropriate SASS/LESS loader to this JS file
// import './styles/main.scss'

import React from 'react'
import ReactDOM from 'react-dom'

import './styles/main.less'

// TODO: Investigate why JSX syntax is not loaded by Webpack

ReactDOM.render(
  React.createElement('div', {}, 'META UI is Ready'),
  document.getElementById('app')
)
