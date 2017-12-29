import React, { Component } from 'react';
import PropTypes from 'prop-types';

import objectPath from 'object-path';
import { Button, Card, Image } from 'semantic-ui-react';

class MinerStatus extends Component {
  render() {
    const miner = this.props.miner;
    return (<Card color="green" key={miner.id}>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="./assets/pick.svg"
        />
        <Card.Header>
          MINER_TYPE
        </Card.Header>
        <Card.Meta>
          Running
        </Card.Meta>
        <Card.Description>
          <strong>Last update</strong>: 1 seconds ago
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green">Start</Button>
          <Button basic color="red">Stop</Button>
        </div>
      </Card.Content>
    </Card>);
  }
}

export default class MinersTab extends Component {
  getMiners() {
    return objectPath.get(
      this.context.store.getState(), 'session.miners',
      ['placeholder_please_remove'],
    );
  }

  render() {
    return (<Card.Group>
      {this.getMiners().map(miner => <MinerStatus miner={miner} />)}
    </Card.Group>);
  }
}

MinersTab.contextTypes = {
  store: PropTypes.object,
};
