import React, { Component } from 'react';
import _ from 'lodash';
import client from '../../client';
import { Form, Button, Header, Image, Modal, Input, Dropdown, Icon } from 'semantic-ui-react';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';

class AddSensorModal extends Component {
  state = {
    sensor: {},
  }

  handleChange = (event, data) => {
    let sensor = this.state.sensor;
    sensor[data.name] = data.value;
    this.setState({sensor});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { addSensorConfig, node } = this.props;
    let sensor = this.state.sensor;
    //sensor.install_time = new Date(sensor.install_time).toISOString();
    let newSensorData = _.assign({}, this.state.sensor, { node_id: node.id, cluster_id: node.cluster_id});
    console.log("newSensorData is>>>", newSensorData);
    return addSensorConfig(newSensorData);
  }
  render() {
    const{ node } = this.props;
    return (
      <Modal trigger={<Button>Add Sensor</Button>}>
        <Modal.Header>Add a Sensor Config</Modal.Header>
        <Modal.Content>
          <Modal.Description>
          <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Field>
                  <label>Sensor Name</label>
                  <Input name='name' placeholder='Name' value={this.state.sensor.name} onChange={this.handleChange} />
                </Form.Field>
                <Form.Field>
                  <label>Type</label>
                  <Input name='type' placeholder='Type' value={this.state.sensor.type} onChange={this.handleChange} />
                </Form.Field>
                <Form.Field>
                  <label>Status</label>
                  <Input name='status' placeholder='Status' value={this.state.sensor.status} onChange={this.handleChange} />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field>
                  <label>Series Number</label>
                  <Input name='series_number' placeholder='Series Number' value={this.state.sensor.series_number} onChange={this.handleChange} />
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
export default AddSensorModal;