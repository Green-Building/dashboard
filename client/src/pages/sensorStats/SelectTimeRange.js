import React, { Component } from 'react';
import { Form, Segment } from 'semantic-ui-react';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchSensorData } from '../../reducers/sensorData';

class SelectTimeRange extends Component {
  state = {
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
    const { fetchSensorData, router, location } = this.props;
    console.log("this.state is >>>", this.state);
    return fetchSensorData(location.query.type, location.query.id, this.state.startTime,this.state.endTime);
  }

  render() {
    return (
      <Segment>
        <Form onSubmit={this.onSubmit}>
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
      </Segment>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSensorData: (type, id, startTime, endTime) => {
      dispatch(fetchSensorData(type, id, startTime, endTime))
    },
  }
}

SelectTimeRange = withRouter(connect(
  null,
  mapDispatchToProps
)(SelectTimeRange));

export default SelectTimeRange;