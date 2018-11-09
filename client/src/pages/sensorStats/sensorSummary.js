import React, { Component } from 'react';
import { List, Card, Image } from 'semantic-ui-react';;

export default class SensorSummary extends Component {
  render() {
    const { sensorData } = this.props;
    const sensor = sensorData.sensor;
    console.log("senosr is>>>", sensor);
    return (
      <Card>
        <Image src="https://via.placeholder.com/150"/>
        <Card.Content>
          <Card.Header>{sensor.name}</Card.Header>
          <Card.Meta>
            {sensor.type}
          </Card.Meta>
          <Card.Description>
            Install Time: <span className='date'>{sensor.install_time}</span>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <List>
            <List.Item>
              <List.Icon name='users' />
              <List.Content>Building Name</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='marker' />
              <List.Content>Floor Number</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='mail' />
              <List.Content>
                Node Number
              </List.Content>
            </List.Item>
          </List>
        </Card.Content>
      </Card>
    )
  }
}