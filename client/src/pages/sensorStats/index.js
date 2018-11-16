import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { updateTime } from '../../reducers/sensorData';
import SelectTimeRange from './SelectTimeRange';
import BarChart from './BarChart';
import LineChart from './RLineChart';
import ScatterChart from './ScatterChart';
import RadarChart from './RadarChart';
import PieChart from './PieChart';
import AreaChart from './AreaChart';
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
        <Grid columns={2} celled style={{'backgroundColor': '#F2F6EB', boxShadow: '1px 2px 3px #666'}}>
          <Grid.Row stretched>
            <Grid.Column width={8}>
              <SelectTimeRange params={params} />
            </Grid.Column>
            <Grid.Column width={8}>
              <SensorSummary sensorData={sensorData} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns={2} celled  style={{'backgroundColor': '#F2F6EB', boxShadow: '1px 2px 3px #666'}}>
          <Grid.Row>
            <Grid.Column width={8}>
              <LineChart sensorData={sensorData} />
            </Grid.Column>
            <Grid.Column width={8}>
              <BarChart />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns={2} celled  style={{'backgroundColor': '#F2F6EB', boxShadow: '1px 2px 3px #666'}}>
          <Grid.Row>
            <Grid.Column width={8}>
              <PieChart sensorData={sensorData} />
            </Grid.Column>
            <Grid.Column width={8}>
              <RadarChart sensorData={sensorData} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns={2} celled style={{'backgroundColor': '#F2F6EB', boxShadow: '1px 2px 3px #666'}}>
          <Grid.Row>
            <Grid.Column width={8}>
              <AreaChart />
            </Grid.Column>
            <Grid.Column width={8}>
              <ScatterChart />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns={1} celled  style={{'backgroundColor': '#F2F6EB', boxShadow: '1px 2px 3px #666'}}>
          <Grid.Row>
            <Grid.Column width={16}>
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