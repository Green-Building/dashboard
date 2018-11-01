import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import axios from 'axios';

export default class SelectTimeRange extends Component {
  state = {
    sensorId: '',
    startTime: '',
    endTime: '',
  };

  handleChange = (event, {name, value, type}) => {
    console.log("name is >>>", name);
    console.log("value is >>>", value);
    console.log("type is >>>", type);
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log("this.state is >>>", this.state);
    axios(`http://localhost:8080/proj/DataTransferServlet`, {
      method: 'GET',
      params: {
        idType:'sensor',
        id: 123,
        startTime: new Date('2018-10-04T11:11'),
        endTime: new Date('2018-10-18T17:10')
      },
    })
    .then(response => {
      console.log("response is >>>", response.data);
    })
    .catch(err => {
      console.log("err is>>>", err);
    })
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Input
          label='sensor id'
          type='string'
          onChange={this.handleChange}
          name="sensorId"
          value={this.state.sensorId}
        />
        <Form.Input
          label='StartTime'
          type='datetime-local'
          onChange={this.handleChange}
          name="startTime"
          value={this.state.startTime}
        />
        <Form.Input
          label='EndTime'
          type='datetime-local'
          onChange={this.handleChange}
          name="endTime"
          value={this.state.endTime}
        />
        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }
}