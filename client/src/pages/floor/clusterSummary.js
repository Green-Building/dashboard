import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { Card, Image, List, Icon } from 'semantic-ui-react';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';

export default class ClusterSummary extends Component {
  render() {
    const { cluster } = this.props;
    return (
      <Card>
        <Card.Content>
          <Card.Header>{cluster.name}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            {_.get(cluster, 'nodes', []).length} nodes
          </a>
        </Card.Content>
        <Card.Content extra>
          <List>
            <List.Item>
              <List.Icon name='users' />
              <List.Content>Floor#: {_.get(cluster,'floor.floor_number')}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='marker' />
              <List.Content>Building: {cluster.building_id}</List.Content>
            </List.Item>
          </List>
        </Card.Content>
      </Card>
    );
  }
}