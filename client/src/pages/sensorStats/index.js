import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import SelectTimeRange from './SelectTimeRange';
import BarChart from './BarChart';
import LineChart from './LineChart';
import ScatterChart from './ScatterChart';
import PieChart from './PieChart';

class sensorStats extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <SelectTimeRange />
            </Grid.Column>
            <Grid.Column width={8}>
              <LineChart />
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
      </div>
    );
  }
}

export default sensorStats;