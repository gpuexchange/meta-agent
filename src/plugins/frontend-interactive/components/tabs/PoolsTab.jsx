import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as Table from 'reactabular-table';
import * as edit from 'react-edit';

import { v4 as uuidV4 } from 'uuid';

import objectPath from 'object-path';

import { Segment, Button } from 'semantic-ui-react';

export default class PoolsTab extends Component {
  render() {
    const columns = [
      {
        property: 'url',
        header: {
          label: 'Connection URL',
        },
      },
      {
        property: 'username',
        header: {
          label: 'username',
        },
      },
      {
        property: 'password',
        header: {
          label: 'password',
        },
      },
    ];
    const rows = objectPath.get(this.context.store.getState(), 'config.pools', []);

    const addPool = () => {
      this.context.store.dispatch({
        type: 'PUSH',
        path: 'config.pools',
        value: {
          uuid: uuidV4(),
          url: '<enter url>',
          username: '<enter username>',
          password: '<enter password>',
        },
      });
    };

    return (
      <Segment padded>
        <Table.Provider
          className="pure-table pure-table-striped"
          columns={columns}
        >
          <Table.Header />
          <Table.Body rows={rows} rowKey="uuid" />
        </Table.Provider>
        <Button onClick={addPool}>Add new</Button>
      </Segment>
    );
  }
}

PoolsTab.contextTypes = {
  store: PropTypes.object,
};
