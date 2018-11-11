import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import { Container, Grid, Button, Card, Icon, Image, Dropdown, Table, Label } from 'semantic-ui-react';

const mapStatusToColor = status => {
  switch(status) {
    case 'active':
      return 'blue';
    case 'maintenance':
      return 'grey';
    case 'inactive':
      return 'red';
    case 'turn-on':
      return 'green';
    case 'turn-off':
      return 'yellow';
    default:
      return 'white';
  }
}

class ClusterTable extends Component {
  render() {
    const { cluster } = this.props;
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Node</Table.HeaderCell>
            <Table.HeaderCell>Node Name</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
            <Table.HeaderCell colSpan='2'>Add/Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(cluster.nodes, (node, index)=>{
            return (
              <Table.Row>
                <Table.Cell>
                  <Label ribbon={index===0}>{node.room_number}</Label>
                </Table.Cell>
                <Table.Cell><Link to={`/node/${node.id}`}>{node.name}</Link></Table.Cell>
                <Table.Cell>
                  <Label color={mapStatusToColor(node.status)}>
                    {node.status}
                  </Label>
                </Table.Cell>
                <Table.Cell>
                  Update
                </Table.Cell>
                <Table.Cell ><Icon name="trash alternate"/></Table.Cell>
                <Table.Cell>
                  <Label>
                    <Icon name="chart area" />Sensor Data
                  </Label>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    )
  }
}

export default ClusterTable;