import React, { Component, Fragment } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import { Container, Grid, Button, Card, Icon, Image, Dropdown, Table, Label } from 'semantic-ui-react';

import { mapStatusToColor } from '../../utils';
import UpdateNodeModal from './updateNodeModal';
import AddNodeModal from './addNodeModal';
import Auth from '../../modules/Auth';

class NodeTable extends Component {
  render() {
    const { cluster, params, rooms, nodes, addNodeConfig, updateNodeConfig, deleteNodeConfig } = this.props;
    console.log("here>>>", updateNodeConfig)
    return (
      <Table celled style={{boxShadow: '2px 3px 4px #666'}}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Node ID</Table.HeaderCell>
            <Table.HeaderCell>Node Name</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            { Auth.getUser()!=='client' &&
              <Table.HeaderCell colSpan='2'>Operation</Table.HeaderCell>
            }
            <Table.HeaderCell>Data</Table.HeaderCell>
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
                { Auth.getUser()!=='client' &&
                  <Fragment>
                    <Table.Cell>
                    <UpdateNodeModal node={node} updateNodeConfig={updateNodeConfig}/>
                    </Table.Cell>
                    <Table.Cell>
                      <Icon name="trash alternate" onClick={() => deleteNodeConfig(node.id)}/>
                    </Table.Cell>
                  </Fragment>
                }
                <Table.Cell>
                  <Label>
                    <Link to={`/sensor-data?type=node&id=${node.id}`}>
                      <Icon name="chart area" />Sensor Data
                    </Link>
                  </Label>
                </Table.Cell>
              </Table.Row>
            )
          })}
          { Auth.getUser()!=='client' &&
            <Table.Row>
              <Table.Cell colSpan='6'>
              <AddNodeModal params={params} cluster={cluster} rooms={rooms} addNodeConfig={addNodeConfig} />
              </Table.Cell>
            </Table.Row>
          }
        </Table.Body>
      </Table>
    )
  }
}

export default NodeTable;