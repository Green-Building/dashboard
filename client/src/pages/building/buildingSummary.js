import React, { Component } from 'react';
import _ from 'lodash';
import { Card, Image, List, Icon } from 'semantic-ui-react';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';

export default class BuildinSummary extends Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>Building Name</Card.Header>
          <Card.Description>Building Address</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            X floors
          </a>
        </Card.Content>
        <Card.Content extra>
          <List>
            <List.Item>
              <List.Icon name='users' />
              <List.Content># of Clusters</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='marker' />
              <List.Content># of Node</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='mail' />
              <List.Content>
                # of sensors
              </List.Content>
            </List.Item>
          </List>
        </Card.Content>
      </Card>
    );
  }
}