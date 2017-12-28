import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'

import * as Table from 'reactabular-table'

import { Select, Input, Divider, Form } from 'semantic-ui-react'
import objectPath from 'object-path'

import algorithmNames from '../../data/algorithms.json'
import hardwareHashRates from '../../data/hardware.json'

export class PreviewSettingForm extends PureComponent {
  render () {
    let {hardware, onHardwareChange, exchangeRate, onExchangeRateChange} = this.props

    let hardwareOptions = Object.keys(hardwareHashRates).map(
      handle => ({text: handle, value: handle}),
    )

    return (
      <Form>
        <Form.Field inline>
          <label>Select hardware</label>
          <Select
            value={hardware}
            fluid search selection
            options={hardwareOptions}
            onChange={(e, {name, value}) => onHardwareChange(value)}
          />
        </Form.Field>
        <Form.Field inline>
          <label>Exchange Rate (&lt;Fiat&gt;/BTC)</label>
          <Input
            value={exchangeRate}
            onChange={(e, {name, value}) => onExchangeRateChange(
              parseFloat(value))}
          />
        </Form.Field>
      </Form>
    )
  }
}

export class CoinsTab extends Component {
  static getAlgorithmCode (algorithmName) {
    if (!this.algorithmNameToCode) {
      this.algorithmNameToCode = {}
      for (var code in algorithmNames) {
        this.algorithmNameToCode[algorithmNames[code]] = code
      }

      console.log('Ready ', this.algorithmNameToCode)

    }
    return this.algorithmNameToCode.hasOwnProperty(algorithmName)
      ? this.algorithmNameToCode[algorithmName]
      : null
  }

  render () {
    let storeState = this.context.store.getState()
    let hardware = objectPath.get(storeState,
      'session.gpu_exchange.interactive.previewHardware',
      '1080ti',
    )

    let exchangeRate = objectPath.coalesce(storeState,
      [
        'session.gpu_exchange.interactive.previewExchangeRate',
        'session.gpu_exchange.btcExchangeRates.USD',
      ],
      0,
    )

    let onHardwareChange = (hardware) => {

      this.context.store.dispatch(
        {
          type: 'SET',
          path: 'session.gpu_exchange.interactive.previewHardware',
          value: hardware,
        },
      )
    }

    let onExchangeRateChange = (exchangeRate) => {
      this.context.store.dispatch(
        {
          type: 'SET',
          path: 'session.gpu_exchange.interactive.previewExchangeRate',
          value: exchangeRate,
        },
      )
    }

    let columns = [
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
    ]

    let rows = objectPath.get(this.context.store.getState(),
      'session.gpu_exchange.coinData', []).map(
      coinData => {
        let algorithmCode = CoinsTab.getAlgorithmCode(coinData.algorithm)
        console.log(hardwareHashRates, hardware, algorithmCode)
        let hardwareHashRate = objectPath.get(
          hardwareHashRates,
          [hardware, algorithmCode].join('.') + '_hr',
          0,
        )

        let dailyBtcEarning = hardwareHashRate *
          coinData.convertedEarningPerHash * 3600 * 24
        let dailyFiatEarning = dailyBtcEarning * exchangeRate
        return Object.assign({}, coinData,
          {
            hardwareHashRate,
            dailyBtcEarning: parseFloat(dailyBtcEarning.toPrecision(4)),
            dailyFiatEarning: parseFloat(dailyFiatEarning.toPrecision(2)),
          })
      },
    ).sort((a, b) => {
      if (a.dailyBtcEarning > b.dailyBtcEarning) {
        return -1
      } else if (a.dailyBtcEarning == b.dailyBtcEarning) {
        return 0
      } else {
        return 1
      }
    })

    return (
      <div>

        <PreviewSettingForm
          hardware={hardware}
          onHardwareChange={onHardwareChange}
          exchangeRate={exchangeRate}
          onExchangeRateChange={onExchangeRateChange}
        />

        <Divider/>
        <p>Data by <em>WhatToMine.com</em> and <em>CryptoCompare.com</em>.</p>

        <Table.Provider
          className="pure-table pure-table-striped"
          columns={columns}
        >

          <Table.Header/>

          <Table.Body rows={rows} rowKey="coinName"/>
        </Table.Provider>
      </div>
    )
  }
}

CoinsTab.contextTypes = {
  store: PropTypes.object,
}
