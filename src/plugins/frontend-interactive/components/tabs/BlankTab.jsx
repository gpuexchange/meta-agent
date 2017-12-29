import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Header, Segment, Divider } from 'semantic-ui-react';

export default class BlankTab extends Component {
  render() {
    return (<Segment padded />);
  }
}

BlankTab.contextTypes = {
  store: PropTypes.object,
};
