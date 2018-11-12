import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import { Table, Label, Icon } from 'semantic-ui-react';

import AddClusterModal from './addClusterModal';
import UpdateClusterModal from './updateClusterModal';
import { mapStatusToColor } from '../../utils';

export default function({ floors, params, addClusterConfig, updateClusterConfig, deleteClusterConfig }) {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Floor</Table.HeaderCell>
          <Table.HeaderCell>Cluster Name</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Update</Table.HeaderCell>
          <Table.HeaderCell colSpan='2'>Add/Delete</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {_.map(floors, (floor, index) => {
          return (
            <Table.Row key={floor.id}>
              <Table.Cell>
                <Label ribbon={index===0}>{floor.floor_number}</Label>
              </Table.Cell>
              <Table.Cell>
              { floor.cluster ?
                <Link to={`/floor/${floor.id}`}>{floor.cluster.name}</Link> :
                null
              }
              </Table.Cell>
              <Table.Cell>
              { floor.cluster ?
                (<Label color={mapStatusToColor(floor.cluster.status)}>
                  {floor.cluster.status}
                </Label>) : null
              }
              </Table.Cell>
              <Table.Cell>
              { floor.cluster ?
                <UpdateClusterModal
                  buildingId={params.building_id}
                  floor={floor}
                  cluster={floor.cluster}
                  updateClusterConfig={updateClusterConfig}
                /> : null
              }
              </Table.Cell>
              <Table.Cell >
              { floor.cluster ?
                <Icon onClick={() => deleteClusterConfig(floor.cluster.id, floor.id)} name="trash alternate"/> :
                <AddClusterModal params={params} floor={floor} addClusterConfig={addClusterConfig} />
              }
              </Table.Cell>
              <Table.Cell>
                <Label>
                { floor.cluster ?
                  (<Link to={`/sensor?type=cluster&id=${floor.cluster.id}`}>
                    <Icon name="chart area" />Sensor Data
                  </Link>) : null
                }
                </Label>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}