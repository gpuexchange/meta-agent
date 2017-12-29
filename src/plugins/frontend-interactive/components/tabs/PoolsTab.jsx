import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Header, Segment, Divider } from 'semantic-ui-react';

export default class PoolsTab extends Component {
  render() {
    return (<Segment padded />);
  }
}

PoolsTab.contextTypes = {
  store: PropTypes.object,
};
