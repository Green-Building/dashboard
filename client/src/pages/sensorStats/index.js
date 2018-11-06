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

class sensorStats extends Component {
  render() {
    const { sensorData } = this.props;
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <SelectTimeRange />
            </Grid.Column>
            <Grid.Column width={8}>
              <LineChart sensorData={sensorData} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5}>
              <BarChart />
            </Grid.Column>
            <Grid.Column width={5}>
              <PieChart />
            </Grid.Column>
            <Grid.Column width={5}>
              <ScatterChart />
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

sensorStats = withRouter(connect(
  mapStateToProps,
  null
)(sensorStats));

export default sensorStats;