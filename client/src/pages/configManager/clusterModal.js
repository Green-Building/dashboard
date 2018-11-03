import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { Form, Button, Header, Image, Modal, Input } from 'semantic-ui-react';

class ClusterModal extends Component {
  state = {
    cluster: this.props.cluster
  }

  handleChange = (event, data) => {
    let cluster = this.state.cluster;
    cluster[data.name] = data.value;
    //cluster['floor'] = 1;
    this.setState({cluster});
    console.log("this.state.cluster is>>>", this.state.cluster);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { isNew } = this.props;
    console.log("this.state.cluster is>>>", this.state.cluster)
    if (isNew) {
      return axios.post('http://localhost:4001/clusters/add', {
        data: this.state.cluster
      })
      .then(response => {
        console.log("response adding a cluster>>>", response);
      })
      .catch(err => {
        console.log("err adding a cluster>>>", err);
      })
    } else {
      console.log("this.state.cluster is>>>", this.state.cluster);
      return axios.put(`http://localhost:4001/clusters/${this.state.cluster.id}`, {
        data: _.omit(this.state.cluster, 'id'),
      })
      .then(response => {
        console.log("response adding a cluster>>>", response);
      })
      .catch(err => {
        console.log("err adding a cluster>>>", err);
      })
    }
  }
  render() {

    return (
      <Modal trigger={<Button>Add</Button>}>
        <Modal.Header>Add/Update a Sensor</Modal.Header>
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
export default ClusterModal;