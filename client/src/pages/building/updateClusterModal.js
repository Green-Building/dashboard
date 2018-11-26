import React, { Component } from 'react';
import Promise from 'bluebird';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { Form, Button, Header, Image, Modal, Input, Icon } from 'semantic-ui-react';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';

class UpdateClusterModal extends Component {
  state = {
    cluster: this.props.cluster,
    modalOpen: false,
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  handleChange = (event, data) => {;
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
    const { updateClusterConfig } = this.props;
    console.log("this.state.cluster is >>>", this.state.cluster);
    return Promise.resolve(updateClusterConfig(this.state.cluster.id, this.state.cluster))
    .then(() => {
      this.handleClose();
      toast.info("🔔 Cluster successfully updated");
    })
  }
  render() {
    const { cluster } = this.props;
    return (
      <Modal trigger={<Icon name="edit" onClick={this.handleOpen} />}>
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