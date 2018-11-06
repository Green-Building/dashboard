import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchSensorData } from '../../reducers/sensorData';

class SelectTimeRange extends Component {
  state = {
    sensorId: '',
    startTime: moment().subtract(1, 'd').format("YYYY-MM-DDThh:mm:ss"),
    endTime: moment().format("YYYY-MM-DDThh:mm:ss"),
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
    const { fetchSensorData } = this.props;
    console.log("this.state is >>>", this.state);
    return fetchSensorData(this.state.startTime,this.state.endTime);
    /*
    return axios(`http://localhost:4001/sensor-data/search-data`, {
      method: 'GET',
      params: {
        idType:'sensor',
        id: 123,
        startTime: new Date(this.state.startTime),
        endTime: new Date(this.state.endTime)
      },
    })
    .then(response => {
      console.log("response is >>>", response.data);
    })
    .catch(err => {
      console.log("err is>>>", err);
    })
    */

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
          step="1"
          onChange={this.handleChange}
          name="startTime"
          value={this.state.startTime}
        />
        <Form.Input
          label='EndTime'
          type='datetime-local'
          step="1"
          onChange={this.handleChange}
          name="endTime"
          value={this.state.endTime}
        />
        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSensorData: (startTime, endTime) => {
      dispatch(fetchSensorData(startTime, endTime))
    },
  }
}

SelectTimeRange = withRouter(connect(
  null,
  mapDispatchToProps
)(SelectTimeRange));

export default SelectTimeRange;