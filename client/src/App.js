import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Button } from 'semantic-ui-react';

import Header from './component/Header';
import MapWithASearchBox from './map';


class App extends Component {
  componentDidMount() {
    axios.get('/api/cars')
    .then(response => {
      console.log("response is >>>", response);
    })
    .catch(err => {
      console.log("err is>>>", err);
    })
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>Column 10</Grid.Column>

            <Grid.Column width={6}>
              <Button primary>Button</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <MapWithASearchBox />
      </div>
    );
  }
}

export default App;
