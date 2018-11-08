import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { Form, Button, Header, Image, Modal, Input, Dropdown } from 'semantic-ui-react';

class AddFloorModal extends Component {
  state = {
    floor_number: null,
  }

  handleChange = (event, data) => {
    let floor_number = this.state.floor_number;
    floor_number = +data.value;
    this.setState({floor_number});
  }

  handleSubmit = (event) => {
  event.preventDefault();
    console.log("this.props is>>>", this.props);
    const { params } = this.props;
    const building_id = +params.building_id;
    let newFloorData = _.assign({}, this.state, { building_id });
    console.log("newFloorData is>>>", newFloorData);
    return axios.post('http://localhost:4001/floors/add', {
      data: newFloorData
    })
    .then(response => {
      console.log("response adding a floor>>>", response);
    })
    .catch(err => {
      console.log("err adding a floor>>>", err);
    })
  }
  render() {
    return (
      <Modal trigger={<Button>Add Floor</Button>}>
        <Modal.Header>Add a Floor </Modal.Header>
        <Modal.Content>
          <Modal.Description>
          <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Field>
                  <label>Floor Number</label>
                  <Input name='floor_number' placeholder='Floor Number' value={this.state.floor_number} onChange={this.handleChange} />
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
export default AddFloorModal;