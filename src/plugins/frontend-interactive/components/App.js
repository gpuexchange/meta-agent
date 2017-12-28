import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Tab } from 'semantic-ui-react'
import { DebugTab } from './tabs/DebugTab'
import { AlgorithmsTab } from './tabs/AlgorithmsTab'
import { Provider } from 'react-redux'
import { MinersTab } from './tabs/MinersTab'
import { CoinsTab } from './tabs/CoinsTab'

export default class App extends Component {

  render () {
    let panes = [
      {
        menuItem: 'Miners',
        render: () => <Tab.Pane><MinersTab/></Tab.Pane>,
      },
      {
        menuItem: 'Coins & Pools',
        render: () => <Tab.Pane><CoinsTab/></Tab.Pane>,
      }, {
        menuItem: 'Algorithms',
        render: () => <Tab.Pane><AlgorithmsTab/></Tab.Pane>,
      },
      {
        menuItem: 'Debug',
        render: () => <Tab.Pane><DebugTab/></Tab.Pane>,
      },
    ]

    return <Provider store={this.props.store}>
      <Tab panes={panes}/>
    </Provider>
  }
}

App.contextTypes = {
  store: PropTypes.object,
}
