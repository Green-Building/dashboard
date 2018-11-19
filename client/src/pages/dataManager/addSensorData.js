import React, { Component } from 'react';
import moment from 'moment-timezone';
import CSVReader from 'react-csv-reader';
import { Container, Form, Input, Button, Dropdown, Icon, Segment, Label } from 'semantic-ui-react';

import client from '../../client';
import {
  DATA_MANAGER_HOST
} from '../../api-config';

class AddSensorData extends Component {
  state = {
    sensorData: null,
    sensorId: null,
    unit: null,
    model: null,
    seriesNum: null,
    data: null,
    type: null,
    date: null,
    nodeId: null,
    clusterId: null,
    roomId: null,
    floorId: null,
    buildingId: null,
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
    const tz = moment.tz.guess();
    return client.post(`${DATA_MANAGER_HOST}/sensor-data/add`, {
      sensorId: this.state.sensorId,
      unit: this.state.unit,
      model: this.state.model,
      seriesNum: this.state.seriesNum,
      data: +this.state.data,
      type: this.state.type,
      date: moment(this.state.date).tz(tz).format("ddd MMM DD hh:mm:ss zz YYYY"),
      nodeId: this.state.nodeId,
      clusterId: this.state.clusterId,
      roomId: this.state.roomId,
      floorId: this.state.floorId,
      buildingId: this.state.buildingId,
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

    return client.post(`${DATA_MANAGER_HOST}/sensor-data/bulk-add`, this.state.sensorData)
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
        <Segment>
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
                <label>Date</label>
                <Input name='date' value={this.state.date} type='datetime-local' placeholder='Date' onChange={this.handleChange} />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Model</label>
                <Input name='model' value={this.state.model} placeholder='Model' onChange={this.handleChange} />
              </Form.Field>
              <Form.Field>
                <label>Series Number</label>
                <Input name='seriesNum' value={this.state.seriesNum} placeholder='Series Number' onChange={this.handleChange} />
              </Form.Field>
              <Form.Field>
                <label>Type</label>
                <Input name='type' value={this.state.type}  placeholder='type' onChange={this.handleChange} />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Sensor ID</label>
                <Input name='sensorId' value={this.state.sensorId} placeholder='Sensor ID' onChange={this.handleChange} />
              </Form.Field>
              <Form.Field>
                <label>Cluster ID</label>
                <Input name='clusterId' value={this.state.clusterId} placeholder='Cluster ID' onChange={this.handleChange} />
              </Form.Field>

            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Room ID</label>
                <Input name='roomId' value={this.state.roomId} placeholder='Room ID' onChange={this.handleChange} />
              </Form.Field>
              <Form.Field>
                <label>Floor ID</label>
                <Input name='floorId' value={this.state.floorId} placeholder='Floor ID' onChange={this.handleChange} />
              </Form.Field>
              <Form.Field>
                <label>Building ID</label>
                <Input name='buildingId' value={this.state.buildingID} placeholder='Building ID' onChange={this.handleChange} />
              </Form.Field>
            </Form.Group>
            <Form.Field control={Button}>Submit</Form.Field>
          </Form>
        </Segment>
        <Segment>
          <Form onSubmit={this.handleBulkSubmit}>
          <Form.Group >
            <Form.Field>
              <label>Select CSV to import</label>
              <CSVReader
                parserOptions={{ header: true, skipEmptyLines: true, trimHeaders: true }}
                onFileLoaded={this.handleUpload}
              />
            </Form.Field>
          </Form.Group>
            {this.state.sensorData &&
              <Form.Button type="submit" color='green'><Icon name='upload' />Upload</Form.Button>
            }
          </Form>
        </Segment>
      </Container>
    )
  }
}

export default AddSensorData;