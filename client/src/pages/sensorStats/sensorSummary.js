import React, { Component } from 'react';
import { List, Card, Image, Button, Modal } from 'semantic-ui-react';

import DeviceNetwork from './deviceNetwork';

export default class SensorSummary extends Component {
  render() {
    const { sensorData } = this.props;
    const device = sensorData.device;
    const device_type = sensorData.device_type;
    console.log("device is>>>", device);
    return (
      <Card className="centered">
        <Card.Content>
          <Card.Header>{device.name}</Card.Header>
          <Card.Meta>
            Device Type {device_type}
          </Card.Meta>
          <Card.Description>
            Install Time: <span className='date'>{device.install_time}</span>
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <Modal trigger={<Button>See {device_type} Network</Button>}>
            <DeviceNetwork device={device} device_type={device_type} />
          </Modal>
        </Card.Content>
      </Card>
    )
  }
}