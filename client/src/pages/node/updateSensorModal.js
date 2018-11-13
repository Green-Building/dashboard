import React, { Component } from 'react';
import _ from 'lodash';
import client from '../../client';
import { Form, Button, Header, Image, Modal, Input } from 'semantic-ui-react';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';

class UpdateSensorModal extends Component {
  state = {
    sensor: this.props.sensor,
  }

  handleChange = (event, data) => {
    console.log("data is>>>", data);

    let sensor = this.state.sensor;
    sensor[data.name] = data.value;
    this.setState({sensor});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { updateSensorConfig } = this.props;
    console.log("updateSensorConfig is >>", updateSensorConfig);
    return updateSensorConfig(this.props.sensor.id, _.omit(this.state.sensor, 'id'));
  }
  render() {
    const { sensor } = this.props;
    return (
      <Modal trigger={<Button>Update</Button>}>
        <Modal.Header>Update a Sensor Config</Modal.Header>
        <Modal.Content>
          <Modal.Description>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Field>
                <label>Sensor Name</label>
                <Input name='name' placeholder='Name' value={this.state.sensor.name} onChange={this.handleChange} />
              </Form.Field>
              <Form.Field>
                <label>Status</label>
                <Input name='status' placeholder='Status' value={this.state.sensor.status} onChange={this.handleChange} />
              </Form.Field>
            </Form.Group>
            <Form.Field control={Button}>Submit</Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}
export default UpdateSensorModal;