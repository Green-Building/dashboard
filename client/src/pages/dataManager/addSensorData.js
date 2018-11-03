import React, { Component } from 'react';
import axios from 'axios';
import CSVReader from 'react-csv-reader';
import { Container, Form, Input, Button, Dropdown } from 'semantic-ui-react';

class AddSensorData extends Component {
  state = {
    sensorData: null,
  }

  handleUpload = data => {
    console.log("data is >>>", data);
    this.setState({sensorData: data});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    return axios.post('http://localhost:4001/sensor-data/add', {
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
        <CSVReader
          parserOptions={{ header: true, skipEmptyLines: true, trimHeaders: true }}
          label="Select CSV to import"
          onFileLoaded={this.handleUpload}
        />
        <Button onClick={this.handleSubmit}>Submit</Button>
      </Container>
    )
  }
}

export default AddSensorData;