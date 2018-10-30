import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Button } from 'semantic-ui-react';

import MapWithASearchBox from '../component/Map';


class Home extends Component {
  componentDidMount() {
    /*
    axios.get('/api/cars')
    .then(response => {
      console.log("response is >>>", response);
    })
    .catch(err => {
      console.log("err is>>>", err);
    })
    */
   console.log("hi>>>");
  }
  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
            <MapWithASearchBox />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
