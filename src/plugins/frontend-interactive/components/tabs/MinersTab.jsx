import React, { Component } from 'react';
import PropTypes from 'prop-types';

import objectPath from 'object-path';
import JSONTree from 'react-json-tree';

export default class MinersTab extends Component {
  getMiners() {
    return objectPath.get(
      this.context.store.getState(), 'session.miners',
      ['placeholder_please_remove'],
    );
  }

  render() {
    const minerStatuses = objectPath.get(
      this.context.store.getState(),
      'session.miners.status', {},
    );
    return (
      <div>
        <JSONTree data={minerStatuses} />
      </div>
    );
  }
}

MinersTab.contextTypes = {
  store: PropTypes.object,
};
