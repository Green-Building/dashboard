import React, { Component } from 'react';
import _ from 'lodash';
import { Card, Image, List, Icon } from 'semantic-ui-react';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';

export default class NodeSummary extends Component {
  render() {
    const { node } = this.props;
    return (
      <Card className="centered">
        <Card.Content>
          <Card.Header>{node.name}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            {_.get(node, 'sensors', []).length} sensors
          </a>
        </Card.Content>
        <Card.Content extra>
          <List>
            <List.Item>
              <List.Icon name='users' />
              <List.Content>{node.room_id}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='marker' />
              <List.Content>{_.get(node, ['cluster', 'name'], '')}</List.Content>
            </List.Item>
          </List>
        </Card.Content>
      </Card>
    );
  }
}