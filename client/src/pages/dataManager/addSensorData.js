import React, { Component } from 'react';
import axios from 'axios';
import CSVReader from 'react-csv-reader';
import { Container, Form, Input, Button, Dropdown } from 'semantic-ui-react';

import {
  DATA_MANAGER_HOST
} from '../../api-config';

class AddSensorData extends Component {
  state = {
    sensorData: null,
    sensorID: null,
    unit: null,
    data: null,
    timeStamp: null,
    clusterID: null,
    floor: null,
    roomID: null,
    buildingID: null,
    zipcode: null,
  }

  handleUpload = data => {
    console.log("data is >>>", data);
    this.setState({sensorData: data});
  }

  handleChange = (event, data) => {
    this.setState({[data.name]: data.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    return axios.post(`${DATA_MANAGER_HOST}/sensor-data/add`, {
      data: {
        sensorID: this.state.sensorID,
        unit: this.state.unit,
        data: +this.state.data,
        timeStamp: new Date(this.state.timeStamp),
        date: new Date(this.state.timeStamp),
        clusterID: this.state.clusterID,
        floor: this.state.floor,
        roomID: this.state.roomID,
        buildingID: this.state.buildingID,
        zipcode: this.state.zipcode,
      }
    })
    .then(response => {
      console.log("response from adding sensor data is >>>", response);
    })
    .catch(err => {
      console.log("err from adding sensor data is >>", err);
    })
  }

  handleBulkSubmit = (event) => {
    event.preventDefault();

    return axios.post(`${DATA_MANAGER_HOST}/sensor-data/bulk-add`, {
      data: this.state.sensorData,
    })
    .then(response => {
      console.log("response from adding sensor data is >>>", response);
    })
    .catch(err => {
      console.log("err from adding sensor data is >>", err);
    })
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>

            <Form.Field>
              <label>Unit</label>
              <Input name='unit' value={this.state.unit} placeholder='Unit' onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Data</label>
              <Input name='data' value={this.state.data} placeholder='Data' onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Timestamp</label>
              <Input name='timeStamp' value={this.state.timeStamp} type='datetime-local' placeholder='Timestamp' onChange={this.handleChange} />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Sensor ID</label>
              <Input name='sensorID' value={this.state.sensorID} placeholder='Sensor ID' onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Cluster ID</label>
              <Input name='clusterID' value={this.state.clusterID} placeholder='Cluster ID' onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Room ID</label>
              <Input name='roomID' value={this.state.roomID} placeholder='Room ID' onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Building ID</label>
              <Input name='buildingID' value={this.state.buildingID} placeholder='Building ID' onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Floor</label>
              <Input name='floor' value={this.state.floor} placeholder='Floor' onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Zipcode</label>
              <Input name='zipcode' value={this.state.zipcode} placeholder='Zipcode' onChange={this.handleChange} />
            </Form.Field>
          </Form.Group>
          <Form.Field control={Button}>Submit</Form.Field>
        </Form>
        <CSVReader
          parserOptions={{ header: true, skipEmptyLines: true, trimHeaders: true }}
          label="Select CSV to import"
          onFileLoaded={this.handleUpload}
        />
        <Button onClick={this.handleBulkSubmit}>Submit</Button>
      </Container>
    )
  }
}

export default AddSensorData;