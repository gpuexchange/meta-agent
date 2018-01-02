import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as Table from 'reactabular-table';
import * as edit from 'react-edit';

import { v4 as uuidV4 } from 'uuid';

import objectPath from 'object-path';

import { Segment, Button } from 'semantic-ui-react';

export default class PoolsTab extends Component {
  constructor(props) {
    super(props);

    const editable = edit.edit({
      isEditing: ({ columnIndex, rowData }) => rowData.editing === columnIndex,
      onActivate: ({ columnIndex, rowData }) => {
        // this.state.editing[rowData.uuid] = columnIndex;
        this.context.store.dispatch({
          type: 'SET',
          path: `session.gpu_exchange.interactive.pools.editing.${rowData.uuid}`,
          value: columnIndex,
        });
      },

      onValue: ({ value, rowData, property }) => {
        const { uuid } = rowData;
        const poolIndex = objectPath.get(this.context.store.getState(), 'config.pools', []).findIndex(pool => pool.uuid === uuid);

        this.context.store.dispatch({
          type: 'SET',
          path: `session.gpu_exchange.interactive.pools.editing.${rowData.uuid}`,
          value: null,
        });

        this.context.store.dispatch({
          type: 'SET',
          path: `config.pools.${poolIndex}.${property}`,
          value,
        });
      },
    });

    const columns = [
      {
        property: 'url',
        header: {
          label: 'Connection URL',
        },
        cell: {
          transforms: [
            (value, extra) => editable(edit.input())(value, extra, {
              className: extra.rowData.edited && 'edited',
            }),
          ],
        },
      },
      {
        property: 'username',
        header: {
          label: 'Username',
        },
        cell: {
          transforms: [
            (value, extra) => editable(edit.input())(value, extra, {
              className: extra.rowData.edited && 'edited',
            }),
          ],
        },
      },
      {
        property: 'password',
        header: {
          label: 'Password',
        },
        cell: {
          transforms: [
            (value, extra) => editable(edit.input())(value, extra, {
              className: extra.rowData.edited && 'edited',
            }),
          ],
        },
      },
      {
        property: 'enabled',
        header: {
          label: 'Enabled',
        },
        cell: {
          formatters: [
            active => active && <span>&#10003;</span>,
          ],
          transforms: [
            (value, extra) => editable(edit.boolean())(value, extra, {
              className: extra.rowData.edited && 'edited',
            }),
          ],
        },
      }, {
        header: {
          laber: 'Delete',
        },
        cell: {
          formatters: [
            (value, { rowData }) =>
              (
                <span
                  className="remove"
                  onClick={() => this.onRemove(rowData.uuid)}
                  style={{ cursor: 'pointer' }}
                >
                [Delete]
                </span>
              ),
          ],
        },
      },
    ];

    this.state = {
      columns,
    };
  }

  onRemove(poolUuid) {
    if (!confirm('Are you sure you want to delete this pool?')) {
      return; // Abort
    }
    const allPools = objectPath.get(this.context.store.getState(), 'config.pools', []);
    const obsoletedPoolIndex = allPools.findIndex(pool => pool.uuid === poolUuid);
    if (obsoletedPoolIndex > -1) {
      delete (allPools[obsoletedPoolIndex]);
      this.context.store.dispatch({
        type: 'SET',
        path: 'config.pools',
        value: allPools,
      });
    }
  }

  render() {
    const addPool = () => {
      this.context.store.dispatch({
        type: 'PUSH',
        path: 'config.pools',
        value: {
          uuid: uuidV4(),
          url: '<enter url>',
          username: '<enter username>',
          password: '<enter password>',
          enabled: false,
        },
      });
    };

    const { columns } = this.state;
    const rows = this.getRowsFromStore(this.context.store);

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

  getRowsFromStore(store) {
    const basePools = objectPath.get(store.getState(), 'config.pools', []);
    const editingMarkers = objectPath.get(store.getState(), 'session.gpu_exchange.interactive.pools.editing', {});
    const processedPools = basePools.map(pool => Object.assign(
      {}, pool,
      { editing: (pool.uuid in editingMarkers ? editingMarkers[pool.uuid] : null) },
    ));

    console.log('Processed pools ', processedPools);
    return processedPools;
  }
}

PoolsTab.contextTypes = {
  store: PropTypes.object,
};
