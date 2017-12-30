import React, { Component } from 'react';
import PropTypes from 'prop-types';

import objectPath from 'object-path';

export default class AlgorithmsTab extends Component {
  getAlgorithmTable() {
    const algorithms = objectPath.get(
      this.context.store.getState(),
      'session.supportedAlgorithms', [],
    );

    return algorithms.map(handle => (
      <div>{handle}</div>
    ));
  }

  render() {
    return (
      <div>
        {this.getAlgorithmTable()}
      </div>
    );
  }
}

AlgorithmsTab.contextTypes = {
  store: PropTypes.object,
};
