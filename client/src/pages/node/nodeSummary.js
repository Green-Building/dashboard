import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { Card, Image, List, Icon } from 'semantic-ui-react';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';

export default class NodeSummary extends Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>Node Name</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            X sensors
          </a>
        </Card.Content>
        <Card.Content extra>
          <List>
            <List.Item>
              <List.Icon name='users' />
              <List.Content>Location</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='marker' />
              <List.Content># of Sensors</List.Content>
            </List.Item>
          </List>
        </Card.Content>
      </Card>
    );
  }
}