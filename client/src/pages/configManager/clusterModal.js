import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { Form, Button, Header, Image, Modal, Input } from 'semantic-ui-react';

class ClusterModal extends Component {
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
    const { isNew } = this.props;

    if (isNew) {
      console.log("this.props is>>>", this.props);
      let newClusterData = _.assign({}, this.props.cluster, {building_id: +this.props.buildingId}, {floor: +this.props.floor.selected});
      console.log("newClusterData is>>>", newClusterData);
      return axios.post('http://localhost:4001/clusters/add', {
        data: newClusterData
      })
      .then(response => {
        console.log("response adding a cluster>>>", response);
      })
      .catch(err => {
        console.log("err adding a cluster>>>", err);
      })

    } else {
      console.log("this.props.cluster is>>>", this.props.cluster);
      return axios.put(`http://localhost:4001/clusters/${this.props.cluster.id}`, {
        data: _.omit(this.props.cluster, 'id'),
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
        <Modal.Header>Add/Update a Cluster</Modal.Header>
        <Modal.Content>
          <Modal.Description>
          <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Field>
                  <label>Cluster Name</label>
                  {this.props.isNew ?
                    <Input name='name' placeholder='Name' value={this.props.cluster.name} onChange={this.handleChange} /> :
                    <Input name='name' placeholder='Name' value={this.state.cluster.name} onChange={this.handleChange} />
                  }

                </Form.Field>
                <Form.Field>
                  <label>Status</label>
                  { this.props.isNew ?
                    <Input name='status' placeholder='Status' value={this.props.cluster.status} onChange={this.handleChange} /> :
                    <Input name='status' placeholder='Status' value={this.state.cluster.status} onChange={this.handleChange} />
                  }

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