import React, { Component } from 'react';
import _ from 'lodash';
import { Table, Label } from 'semantic-ui-react';;

export default class SensorTable extends Component {
  render() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Sensor Name</Table.HeaderCell>
            <Table.HeaderCell>Sensor Type</Table.HeaderCell>
            <Table.HeaderCell>Instllation time</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Label ribbon>#</Label>
            </Table.Cell>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>Type</Table.Cell>
            <Table.Cell>Instllation time</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
  }
}