import React, { Component } from 'react';
import { Container, Grid, Button, Card, Icon, Image, Dropdown } from 'semantic-ui-react';
import axios from 'axios';

const floorOptions =[
  {
    key: "First Floor",
    value: 1,
    text: 'First Floor',
  },
  {
    key: "Second Floor",
    value: 2,
    text: 'Second Floor',
  },
  {
    key: "Third Floor",
    value: 3,
    text: 'Third Floor',
  },
];

class Building extends Component {
  state ={ building: {}, floor: null};
  componentDidMount() {
    const { building_id } = this.props.params;
    return axios.get(`/buildings/${building_id}`)
    .then(response => {
      console.log("building is >>>", response.data);
      this.setState({ building: response.data });
    })
    .catch()
  }

  handleFloorChange = (event, data) => {
    console.log("event>>", event.target.value);
    console.log('data is >>>', data);
    this.setState({floor: data.value});
  }

  goToFloor = () => {
    this.props.router.push(`/floor/${this.state.floor}`);
  }
  render() {
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
            <Card>
              <Image src='https://c2.staticflickr.com/4/3076/2849949216_dbf836dec1_z.jpg?zz=1' />
              <Card.Content>
                <Card.Header>San Jose MLK Library</Card.Header>
                <Card.Description>{this.state.building.address}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='user' />
                  8 Floors
                </a>
              </Card.Content>
            </Card>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Dropdown
                placeholder='Select a floor'
                value={this.state.floor}
                options={floorOptions}
                onChange={this.handleFloorChange} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Button onClick={this.goToFloor}>Goto Floor</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Building;