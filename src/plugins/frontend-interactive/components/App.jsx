import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Tab } from 'semantic-ui-react';
import DebugTab from './tabs/DebugTab';
import AlgorithmsTab from './tabs/AlgorithmsTab';
import MinersTab from './tabs/MinersTab';
import CoinsTab from './tabs/CoinsTab';
import PoolsTab from './tabs/PoolsTab';
import { Provider } from 'react-redux';

import { Store } from 'redux';

export default class App extends Component {
  render() {
    const tabContentComponents = {
      Miners: <MinersTab />,
      Pools: <PoolsTab />,
      Coins: <CoinsTab />,
      Algorithms: <AlgorithmsTab />,
      Debug: <DebugTab />,
    };

    const panes = Object.keys(tabContentComponents).map(title => ({
      menuItem: title,
      render: () => (
        <div
          style={{
              overflow: 'auto',
              height: 'calc(100% - 25px)',
              padding: '20px',
            }}
        >
          {tabContentComponents[title]}
        </div>
      ),
    }));
    return (
      <Provider store={this.props.store}>
        <Tab
          menu={{
        color: 'blue',
        secondary: true,
        pointing: true,
        fluid: true,
        vertical: true,
        tabular: true,
      }}
          panes={panes}
          style={{ width: '100%' }}
        />
      </Provider>
    );
  }
}

App.propTypes = {
  store: Store,
};
