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

export default class App extends Component {

  isMaximized () {
    let store = this.props.store
    return objectPath.get(store.getState(), 'session.interactive.isMaximized',
      false)
  }

  render () {

    let titleBarHandlers = {
      onCloseClick: () => ipcRenderer.send('window', 'close'),
      onMaximizeClick: () => ipcRenderer.send('window', 'maximize'),
      onMinimizeClick: () => ipcRenderer.send('window', 'minimize'),
      onRestoreDownClick: () => ipcRenderer.send('window', 'restore'),
    }

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

    return <Window theme="light">
      <TitleBar
        title="GX META Agent"
        color='#42a1f4'
        controls
        isMaximized={this.isMaximized()}
        {...titleBarHandlers}
      />
      <Provider store={this.props.store}>
        <Tab panes={panes} style={{width: '100%'}}/>
      </Provider>
    </Window>
  }
}

App.contextTypes = {
  store: PropTypes.object,
}
