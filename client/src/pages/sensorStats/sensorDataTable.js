import React, { Component } from 'react';
import _ from 'lodash';
import { Table, Label } from 'semantic-ui-react';;

export default class SensorDataTable extends Component {
  render() {
    const { sensorData } = this.props;
    const data = sensorData.data;
    return (
      <Table celled>
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
            <Table.Row>
              <Table.Cell>
                <Label ribbon={index===0}>{index}</Label>
              </Table.Cell>
              <Table.Cell>{datum.data}</Table.Cell>
              <Table.Cell>{datum.unit}</Table.Cell>
              <Table.Cell>{datum.timeStamp}</Table.Cell>
            </Table.Row>
          )
        })}
        </Table.Body>
      </Table>
    )
  }
}