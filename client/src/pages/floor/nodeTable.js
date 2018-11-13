import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import { Container, Grid, Button, Card, Icon, Image, Dropdown, Table, Label } from 'semantic-ui-react';

import { mapStatusToColor } from '../../utils';
import UpdateNodeModal from './updateNodeModal';

class NodeTable extends Component {
  render() {
    const { nodes, updateNodeConfig, deleteNodeConfig } = this.props;
    console.log("here>>>", updateNodeConfig)
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
          {_.map(nodes, (node, index)=>{
            return (
              <Table.Row>
                <Table.Cell>
                  <Label ribbon={index===0}>{node.id}</Label>
                </Table.Cell>
                <Table.Cell><Link to={`/node/${node.id}`}>{node.name}</Link></Table.Cell>
                <Table.Cell>
                  <Label color={mapStatusToColor(node.status)}>
                    {node.status}
                  </Label>
                </Table.Cell>
                <Table.Cell>
                 <UpdateNodeModal node={node} updateNodeConfig={updateNodeConfig}/>
                </Table.Cell>
                <Table.Cell>
                  <Icon name="trash alternate" onClick={() => deleteNodeConfig(node.id)}/>
                </Table.Cell>
                <Table.Cell>
                  <Label>
                    <Link to={`/sensor?type=node&id=${node.id}`}>
                      <Icon name="chart area" />Sensor Data
                    </Link>
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

export default NodeTable;