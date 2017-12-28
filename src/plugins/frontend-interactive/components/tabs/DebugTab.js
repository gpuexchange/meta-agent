import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button, Header, Segment, Divider } from 'semantic-ui-react'

export class DebugTab extends Component {
  render () {
    return <Segment padded>
      <div>
        <Header as='h1'>Storage content</Header>
        <code>{JSON.stringify(this.context.store.getState(), null,
          2)}</code>
      </div>

      <Divider horizontal></Divider>

      <div>

        <Button primary onClick={(event) => {
          this.context.store.dispatch({
            type: 'LOAD',
          })
        }}>Load config.json
        </Button>

        <Button secondary onClick={(event) => {
          this.context.store.dispatch({
            type: 'SAVE',
          })
        }}>Save to config.json
        </Button>

      </div>

    </Segment>

  }
}

DebugTab.contextTypes = {
  store: PropTypes.object,
}
