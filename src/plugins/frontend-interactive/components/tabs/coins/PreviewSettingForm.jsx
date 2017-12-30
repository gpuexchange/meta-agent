import React, { PureComponent } from 'react';
import { Select, Input, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import hardwareHashRates from '../../../data/hardware.json';

export default class PreviewSettingForm extends PureComponent {
  render() {
    const {
      hardware, onHardwareChange, exchangeRate, onExchangeRateChange,
    } = this.props;

    const hardwareOptions = Object.keys(hardwareHashRates)
      .map(handle => ({ text: handle, value: handle }));

    return (
      <Form>
        <Form.Field inline>
          <label>Select hardware</label>
          <Select
            value={hardware}
            fluid
            search
            selection
            options={hardwareOptions}
            onChange={(e, { name, value }) => onHardwareChange(value)}
          />
        </Form.Field>
        <Form.Field inline>
          <label>Exchange Rate (&lt;Fiat&gt;/BTC)</label>
          <Input
            value={exchangeRate}
            onChange={(e, { name, value }) => onExchangeRateChange(parseFloat(value))}
          />
        </Form.Field>
      </Form>
    );
  }
}

PreviewSettingForm.propTypes = {
  hardware: PropTypes.string.isRequired,
  onHardwareChange: PropTypes.func.isRequired,
  exchangeRate: PropTypes.number.isRequired,
  onExchangeRateChange: PropTypes.func.isRequired,
};
