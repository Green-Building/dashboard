import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import {
  DateTimeInput,
} from 'semantic-ui-calendar-react';

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