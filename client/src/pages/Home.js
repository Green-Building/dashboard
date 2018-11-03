import React, { Component } from 'react';
import axios from 'axios';
import { Container, Grid, Button } from 'semantic-ui-react';

import MapWithASearchBox from '../component/Map';


class Home extends Component {
  componentDidMount() {
    /*
    axios.get('http://localhost:8080/clusters')
    .then(response => {
      console.log("response is >>>", response.data);
    })
    .catch(err => {
      console.log("err is>>>", err);
    })
    console.log("hi>>>");
    */
  }
  render() {
    console.log("this.props>>>", this.props);
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <MapWithASearchBox router={this.props.router}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Home;
