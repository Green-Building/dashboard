import React, { Component } from 'react';
import _ from 'lodash';
import { Card, Image, List, Icon } from 'semantic-ui-react';

import floorPlan from '../../assets/floorplan.jpg';

export default class ClusterSummary extends Component {
  render() {
    const { cluster, nodes, rooms, floorStats } = this.props;
    return (
      <Card className="centered">
        <Image src={floorPlan} alt="floor Plan"/>
        <Card.Content>
          <Card.Header>Floor # {_.get(cluster, 'floor.floor_number', '')}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='cogs' />
            {cluster.name}
          </a>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='warehouse' />
            {rooms.length} rooms
          </a>
        </Card.Content>
        <Card.Content extra>
          <List>
            <List.Item>
              <List.Icon name='certificate' />
              <List.Content># of nodes: {floorStats.node_count}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='lightbulb' />
              <List.Content># of sensors: {floorStats.sensor_count}</List.Content>
            </List.Item>
          </List>
        </Card.Content>
      </Card>
    );
  }
}