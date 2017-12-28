import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Tab } from 'semantic-ui-react'
import { TitleBar, Window } from 'react-desktop/windows'
import { DebugTab } from './tabs/DebugTab'
import { AlgorithmsTab } from './tabs/AlgorithmsTab'
import { Provider } from 'react-redux'
import { MinersTab } from './tabs/MinersTab'
import { CoinsTab } from './tabs/CoinsTab'
import objectPath from 'object-path'
import { ipcRenderer } from 'electron'
import { PoolsTab } from './tabs/PoolsTab'

export default class App extends Component {

  render () {

    let tabContentComponents = {
      'Miners': <MinersTab/>,
      'Pools': <PoolsTab/>,
      'Coins': <CoinsTab/>,
      'Algorithms': <AlgorithmsTab/>,
      'Debug': <DebugTab/>,
    }

    let panes = Object.keys(tabContentComponents).map(title => {
        return {
          menuItem: title,
          render: () => <div
            style={{
              overflow: 'auto',
              height: 'calc(100% - 25px)',
              padding: '20px',
            }}>
            {tabContentComponents[title]}
          </div>,
        }
      },
    )
    return <Provider store={this.props.store}>
      <Tab menu={{
        color: 'blue',
        secondary: true,
        pointing: true,
        fluid: true,
        vertical: true,
        tabular: true,
      }}
           panes={panes}
           style={{width: '100%'}}/>
    </Provider>
  }
}

App.contextTypes = {
  store: PropTypes.object,
}
