import React, { Component } from 'react';
import _ from 'lodash';
import { Card, Image, List, Icon } from 'semantic-ui-react';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';

export default class BuildingSummary extends Component {
  render() {
    const { building } = this.props;
    return (
      <Card>
        <Image src={building.image_url} />
        <Card.Content>
          <Card.Header>{building.name}</Card.Header>
          <Card.Description>{building.address}</Card.Description>
          <Card.Meta>
            <span className='date'>{building.city}, {building.state} {building.zipcode}</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='building' />
            {building.num_of_floors} floors
          </a>
        </Card.Content>
        <Card.Content extra>
          <List>
            <List.Item>
              <List.Icon name='cogs' />
              <List.Content># of Clusters</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='certificate' />
              <List.Content># of Node</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='lightbulb' />
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