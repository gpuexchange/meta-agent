import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button, Header, Segment, Divider } from 'semantic-ui-react'

export class CoinsTab extends Component {
  render () {
    return <Segment padded>
      List of all coins
    </Segment>
  }
}

CoinsTab.contextTypes = {
  store: PropTypes.object,
}
