import React, { Component } from 'react';
import Promise from 'bluebird';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { Form, Button, Header, Image, Modal, Input, Icon } from 'semantic-ui-react';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';

class UpdateSensorModal extends Component {
  state = {
    sensor: this.props.sensor,
    modalOpen: false,
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  handleChange = (event, data) => {
    let sensor = this.state.sensor;
    sensor[data.name] = data.value;
    this.setState({sensor});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { updateSensorConfig } = this.props;
    return Promise.resolve(updateSensorConfig(this.props.sensor.id, this.state.sensor))
    .then(() => {
      this.handleClose();
      toast.info("🔔 Sensor successfully updated");
    })
  }
  render() {
    const { sensor } = this.props;
    return (
      <Modal
        trigger={<Icon name="edit" onClick={this.handleOpen} />}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
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