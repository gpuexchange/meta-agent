import React, { Component } from 'react';
import PropTypes from 'prop-types';

import JSONTree from 'react-json-tree';
import { Button, Header, Segment, Divider } from 'semantic-ui-react';
import { ScrollBox } from 'react-scroll-box';

export default class DebugTab extends Component {
  render () {
    return (<Segment padded>
      <div>

        <Button
          primary
          onClick={() => {
            this.context.store.dispatch({
              type: 'LOAD',
            });
          }}
        >Load config.json
        </Button>

        <Button
          secondary
          onClick={() => {
          this.context.store.dispatch({
            type: 'SAVE',
          });
        }}
        >Save to config.json
        </Button>

      </div>

      <Divider horizontal />

      <div>
        <Header as="h1">Storage content</Header>
        <div style={{ overflow: 'auto', height: '300px' }}>
          <JSONTree data={this.context.store.getState()} invertTheme />
        </div>
      </div>

    </Segment>);
  }
}

DebugTab.contextTypes = {
  store: PropTypes.object,
};
