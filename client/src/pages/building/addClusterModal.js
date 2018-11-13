import React, { Component } from 'react';
import _ from 'lodash';
import client from '../../client';
import { Form, Button, Header, Image, Modal, Input, Dropdown, Icon } from 'semantic-ui-react';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';

class AddClusterModal extends Component {
  state = {
    cluster: {},
  }

  handleChange = (event, data) => {
    let cluster = this.state.cluster;
    cluster[data.name] = data.value;
    this.setState({cluster});
  }

  handleSubmit = (event) => {
  event.preventDefault();
    const { params, floor, addClusterConfig } = this.props;
    const building_id = +params.building_id;
    let newClusterData = _.assign({}, this.state.cluster, { building_id, floor_id: floor.id });
    console.log("newClusterData is>>>", newClusterData);
    return addClusterConfig(newClusterData);
  }
  render() {
    const { floor } = this.props;
    return (
      <Modal trigger={<Icon name="add" />}>
        <Modal.Header>Add a Cluster Config</Modal.Header>
        <Modal.Content>
          <Modal.Description>
          <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Field>
                  <label>Cluster Name</label>
                  <Input name='name' placeholder='Name' value={this.state.cluster.name} onChange={this.handleChange} />
                </Form.Field>
                <Form.Field>
                  <label>Status</label>
                  <Input name='status' placeholder='Status' value={this.state.cluster.status} onChange={this.handleChange} />
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
export default AddClusterModal;