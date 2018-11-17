import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import { Table, Label, Button } from 'semantic-ui-react';
import Auth from '../../modules/Auth';

export default class SensorDataTable extends Component {
  render() {
    const { data, sensorId } = this.props;
    return (
      <Table celled style={{borderRadius: '2px', boxShadow: '2px 3px 4px #666'}}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Data</Table.HeaderCell>
            <Table.HeaderCell>Unit</Table.HeaderCell>
            <Table.HeaderCell>Timestamp</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {_.map(data, (datum, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>
                <Label ribbon={index===0}>{index}</Label>
              </Table.Cell>
              <Table.Cell>{datum.data}</Table.Cell>
              <Table.Cell>{datum.unit}</Table.Cell>
              <Table.Cell>{datum.timeStamp}</Table.Cell>
            </Table.Row>
          )
        })}
        { Auth.getUser()!=='client' &&
          <Table.Row>
            <Table.Cell colSpan='4'>
              <Link to={`/sensor-data-manager?sensor_id=${sensorId}`}><Button>Add Sensor Data</Button></Link>
            </Table.Cell>
          </Table.Row>
        }
        </Table.Body>
      </Table>
    )
  }
}