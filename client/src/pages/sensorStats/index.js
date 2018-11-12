import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { updateTime } from '../../reducers/sensorData';
import SelectTimeRange from './SelectTimeRange';
import BarChart from './BarChart';
import LineChart from './LineChart';
import ScatterChart from './ScatterChart';
import PieChart from './PieChart';
import SensorDataTab from './sensorDataTab';
import SensorSummary from './sensorSummary';

import { fetchDevice } from '../../reducers/sensorData';

class sensorStats extends Component {
  componentDidMount() {
    const { type, id } = this.props.location.query;
    this.props.fetchDevice(type, id);
  }
  render() {
    const { sensorData, params } = this.props;
    return (
      <Container>
        <Grid columns={2} celled  style={{'backgroundColor': '#f7f7f7'}}>
          <Grid.Row stretched>
            <Grid.Column width={6}>
              <SelectTimeRange params={params} />
            </Grid.Column>
            <Grid.Column width={10}>
              <SensorSummary sensorData={sensorData} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <LineChart sensorData={sensorData} />
            </Grid.Column>
            <Grid.Column width={10}>
              <SensorDataTab sensorData={sensorData} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    sensorData: state.sensorData
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchDevice: (type, id) => {
      dispatch(fetchDevice(type, id))
    },
  }
}

sensorStats = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(sensorStats));

export default sensorStats;