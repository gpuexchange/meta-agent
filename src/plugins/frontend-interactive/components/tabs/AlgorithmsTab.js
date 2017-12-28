import React, { Component } from 'react'
import PropTypes from 'prop-types'

import objectPath from 'object-path'

import { Card, Image } from 'semantic-ui-react'

export class AlgorithmCard extends Component {
  render () {
    <Card>
      <Image src='assets/pick.svg'/>
    </Card>
  }
}

export class AlgorithmsTab extends Component {

  getAlgorithmTable () {
    let algorithms = objectPath.get(this.context.store.getState(),
      'session.supportedAlgorithms', [],
    )

    return algorithms.map(handle => {
      return (
        <div>{handle}</div>
      )
    })
  }

  render (props) {
    return <div>
      {this.getAlgorithmTable()}

    </div>
  }
}

AlgorithmsTab.contextTypes = {
  store: PropTypes.object,
}
