import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import objectPath from 'object-path';
import * as Table from 'reactabular-table';
import { Divider } from 'semantic-ui-react';

import algorithmNames from '../../data/algorithms.json';
import hardwareHashRates from '../../data/hardware';
import PreviewSettingForm from './coins/PreviewSettingForm';

export default class CoinsTab extends Component {
  static getAlgorithmCode(algorithmName) {
    if (!this.algorithmNameToCode) {
      this.algorithmNameToCode = {};
      Object.keys(algorithmNames).forEach((code) => {
        this.algorithmNameToCode[algorithmNames[code]] = code;
      });
    }
    return typeof this.algorithmNameToCode[algorithmName] === 'string'
      ? this.algorithmNameToCode[algorithmName]
      : null;
  }

  render() {
    const storeState = this.context.store.getState();
    const hardware = objectPath.get(
      storeState,
      'session.gpu_exchange.interactive.previewHardware',
      '1080ti',
    );

    const exchangeRate = objectPath.coalesce(
      storeState,
      [
        'session.gpu_exchange.interactive.previewExchangeRate',
        'session.gpu_exchange.btcExchangeRates.USD',
      ],
      0,
    );

    const onHardwareChange = (newHardware) => {
      this.context.store.dispatch({
        type: 'SET',
        path: 'session.gpu_exchange.interactive.previewHardware',
        value: newHardware,
      });
    };

    const onExchangeRateChange = (newExchangeRate) => {
      this.context.store.dispatch({
        type: 'SET',
        path: 'session.gpu_exchange.interactive.previewExchangeRate',
        value: newExchangeRate,
      });
    };

    const columns = [
      {
        property: 'coinName',
        header: {
          label: 'Coin',
        },
      },
      {
        property: 'algorithm',
        header: {
          label: 'Algorithm',
        },
      },
      {
        property: 'hardwareHashRate',
        header: {
          label: 'Hardware Hash/s',
        },
      },
      {
        property: 'dailyBtcEarning',
        header: {
          label: 'BTC/day',
        },
      },
      {
        property: 'dailyFiatEarning',
        header: {
          label: 'Fiat/day',
        },
      },
    ];

    const rows = objectPath.get(
      this.context.store.getState(),
      'session.coinData', [],
    ).map((coinData) => {
      const algorithmCode = CoinsTab.getAlgorithmCode(coinData.algorithm);
      const hardwareHashRate = objectPath.get(
        hardwareHashRates,
        [hardware, algorithmCode, 'hashRate'].join('.'),
        0,
      );

      const dailyBtcEarning = hardwareHashRate *
          coinData.convertedEarningPerHash * 3600 * 24;
      const dailyFiatEarning = dailyBtcEarning * exchangeRate;
      return Object.assign(
        {}, coinData,
        {
          hardwareHashRate,
          dailyBtcEarning: parseFloat(dailyBtcEarning.toPrecision(4)),
          dailyFiatEarning: parseFloat(dailyFiatEarning.toPrecision(2)),
        },
      );
    }).sort((a, b) => b.dailyBtcEarning - a.dailyBtcEarning);

    return (
      <div>

        <PreviewSettingForm
          hardware={hardware}
          onHardwareChange={onHardwareChange}
          exchangeRate={exchangeRate}
          onExchangeRateChange={onExchangeRateChange}
        />

        <Divider />
        <p>Data by <em>WhatToMine.com</em> and <em>CryptoCompare.com</em>.</p>

        <Table.Provider
          className="pure-table pure-table-striped"
          columns={columns}
        >

          <Table.Header />

          <Table.Body rows={rows} rowKey="coinName" />
        </Table.Provider>
      </div>
    );
  }
}

CoinsTab.contextTypes = {
  store: PropTypes.object,
};
