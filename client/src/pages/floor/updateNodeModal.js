import React, { Component } from 'react';
import _ from 'lodash';
import client from '../../client';
import { Form, Button, Header, Image, Modal, Input, Icon } from 'semantic-ui-react';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';

class UpdateNodeModal extends Component {
  state = {
    node: this.props.node,
  }

  handleChange = (event, data) => {
    console.log("data is>>>", data);

    let node = this.state.node;
    node[data.name] = data.value;
    this.setState({node});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { updateNodeConfig } = this.props;
    console.log("updateNodeConfig is>>>", updateNodeConfig);
    return updateNodeConfig(this.props.node.id, this.state.node);
  }
  render() {
    const { node } = this.props;
    return (
      <Modal trigger={<Icon name="edit" />}>
        <Modal.Header>Update a Node Config</Modal.Header>
        <Modal.Content>
          <Modal.Description>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
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
export default UpdateNodeModal;