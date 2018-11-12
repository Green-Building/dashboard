import React, { Component } from 'react';
import _ from 'lodash';
import client from '../../client';
import { Form, Button, Header, Image, Modal, Input } from 'semantic-ui-react';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';

class UpdateClusterModal extends Component {
  state = {
    cluster: this.props.cluster,
  }

  handleChange = (event, data) => {
    console.log("data is>>>", data);
    if(this.props.isNew) {
      this.props.cluster[data.name] = data.value;
    } else {
      let cluster = this.state.cluster;
      cluster[data.name] = data.value;
      this.setState({cluster});
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("this.props.cluster is>>>", this.props.cluster);
    return client.put(`${INFRA_MANAGER_HOST}/api/clusters/${this.props.cluster.id}`, _.omit(this.props.cluster, 'id'))
    .then(response => {
      console.log("response adding a cluster>>>", response);
    })
    .catch(err => {
      console.log("err adding a cluster>>>", err);
    })
    //}
  }
  render() {
    const { cluster } = this.props;
    return (
      <Modal trigger={<Button>Update</Button>}>
        <Modal.Header>Update a Cluster Config</Modal.Header>
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
export default UpdateClusterModal;