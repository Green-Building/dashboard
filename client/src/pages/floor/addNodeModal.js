import React, { Component } from 'react';
import _ from 'lodash';
import client from '../../client';
import { Form, Button, Header, Image, Modal, Input, Dropdown, Icon } from 'semantic-ui-react';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';

class AddNodeModal extends Component {
  state = {
    node: {
      room_id: null,
    },
  }

  handleChange = (event, data) => {
    let node = this.state.node;
    node[data.name] = data.value;
    this.setState({node});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { params, cluster, addNodeConfig, rooms } = this.props;
    console.log("cluster is>>>", cluster);
    console.log("this.state.node is >>>", this.state.node);
    console.log("floors is >>>");

    let newNodeData = _.assign({}, this.state.node, { cluster_id: cluster.id});
    console.log("newNodeData is>>>", newNodeData);
    return addNodeConfig(newNodeData);
  }
  render() {
    const{ rooms } = this.props;
    const roomOptions = _.map(rooms, room => {
      return {
        key: `Room ${room.room_number}`,
        value: room.id,
        text: `Room ${room.room_number}`,
      }
    })
    return (
      <Modal trigger={<Button>Add</Button>}>
        <Modal.Header>Add a Node Config</Modal.Header>
        <Modal.Content>
          <Modal.Description>
          <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Field>
                  <label>Select a floor</label>
                  <Dropdown
                    placeholder='Select a Room'
                    value={this.state.node.room_id}
                    name='room_id'
                    options={roomOptions}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Node Name</label>
                  <Input name='name' placeholder='Name' value={this.state.node.name} onChange={this.handleChange} />
                </Form.Field>
                <Form.Field>
                  <label>Status</label>
                  <Input name='status' placeholder='Status' value={this.state.node.status} onChange={this.handleChange} />
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
export default AddNodeModal;