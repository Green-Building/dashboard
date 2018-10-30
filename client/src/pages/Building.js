import React, { Component } from 'react';
import { Grid, Button, Card, Icon, Image, Select } from 'semantic-ui-react';

// [{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }, ...{}]
const floorOptions =[
  {
    key: "First Floor",
    value: 1,
    flag: 'us',
    text: 'First Floor',
  },
  {
    key: "Second Floor",
    value: 2,
    flag: 'us',
    text: "Second Floor"
  },
  {
    key: "Third Floor",
    value: 3,
    flag: 'us',
    text: "Third Floor",
  },
];
const SelectFloor = () => <Select placeholder='Select a floor' options={floorOptions} />

class Building extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
            <Card>
              <Image src='https://c2.staticflickr.com/4/3076/2849949216_dbf836dec1_z.jpg?zz=1' />
              <Card.Content>
                <Card.Header>San Jose MLK Library</Card.Header>
                <Card.Description>San Jose MLK Library is library next to SJSU.</Card.Description>
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
              <SelectFloor />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Building;