import React, { Component } from 'react';
import _ from 'lodash';
import { Table, Label } from 'semantic-ui-react';;

export default class SensorTable extends Component {
  render() {
    const { sensors } = this.props;
    console.log("sensors>>>", sensors);
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
          {_.map(sensors, (sensor, index) => {
            return (
              <Table.Row>
                <Table.Cell>
                  <Label ribbon={index===0}>{sensor.id}</Label>
                </Table.Cell>
                <Table.Cell>{sensor.name}</Table.Cell>
                <Table.Cell>{sensor.type}</Table.Cell>
                <Table.Cell>{sensor.install_time}</Table.Cell>
              </Table.Row>
            )
          })}

        </Table.Body>
      </Table>
    )
  }
}