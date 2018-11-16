import React, { Component } from 'react';
import _ from 'lodash';
import { Card, Image, List, Icon } from 'semantic-ui-react';

import roomImage from '../../assets/room_1.jpg';
import {
  INFRA_MANAGER_HOST
} from '../../api-config';

export default class NodeSummary extends Component {
  render() {
    const { node } = this.props;
    return (
      <Card className="centered" style={{boxShadow: '2px 3px 4px #666'}}>
        <Image src={roomImage} alt="room"/>
        <Card.Content>
          <Card.Header>{node.name}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            {_.get(node, 'sensors', []).length} sensors
          </a>
        </Card.Content>
      </Card>
    );
  }
}