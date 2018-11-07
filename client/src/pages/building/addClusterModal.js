import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { Form, Button, Header, Image, Modal, Input, Dropdown } from 'semantic-ui-react';

class AddClusterModal extends Component {
  state = {
    selectedFloor: null,
    cluster: {},
  }

  handleChange = (event, data) => {
    let cluster = this.state.cluster;
    cluster[data.name] = data.value;
    this.setState({cluster});
  }

  handleFloorChange = (event, data) => {
    this.setState({selectedFloor: data.value});
  }

  handleSubmit = (event) => {
  event.preventDefault();
    console.log("this.props is>>>", this.props);
    const { params } = this.props;
    const building_id = +params.building_id;
    let newClusterData = _.assign({}, this.state.cluster, { building_id }, {floor_number: +this.state.selectedFloor});
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
  }
  render() {
    const { cluster, availableFloors } = this.props;
    const floorOptions = _.map(availableFloors, floor => {
      return {
        key: `Floor ${floor}`,
        value: floor,
        text: `Floor ${floor}`,
      }
    });
    return (
      <Modal trigger={<Button>Add Cluster</Button>}>
        <Modal.Header>Add a Cluster Config</Modal.Header>
        <Modal.Content>
          <Modal.Description>
          <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Dropdown
                  placeholder='Select a floor'
                  value={this.state.selectedFloor}
                  options={floorOptions}
                  onChange={this.handleFloorChange} />
              </Form.Group>
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