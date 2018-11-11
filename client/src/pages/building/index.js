import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import { Container, Grid, Button, Card, Icon, Image, Dropdown, Table, Label } from 'semantic-ui-react';
import client from '../../client';

import UpdateClusterModal from './updateClusterModal';
import AddClusterModal from './addClusterModal';
import AddFloorModal from './addFloorModal';
import AddRoomModal from './addRoomModal';
import BuildingSummary from './buildingSummary';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';

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

class Building extends Component {
  state = {
    building: {},
    floor: {selected: null},
    availableFloors: [],
    usedFloors: [],
    showModal: false,
  }

  componentDidMount() {
    const { building_id } = this.props.params;
    return client.get(`${INFRA_MANAGER_HOST}/api/buildings/${building_id}?fetch_nested=floor,cluster`)
    .then(response => {
      let building = response.data;
      _.forEach(building.clusters, cluster => {
        cluster.floor_number = _.find(building.floors, {id: cluster.floor_id}).floor_number;
      })
      let floors = _.range(1, building.num_of_floors+1);
      let usedFloors = _.map(building.floors, floor => {
        return +floor.floor_number;
      })
      let unusedFloors = _.difference(floors, usedFloors);
      this.setState({ building: response.data, clusters: response.data.clusters, availableFloors: unusedFloors, usedFloors: usedFloors });
    })
    .catch(err => {
      console.log("error is>>", err);
    })
  }

  showModal = () => {
    this.setState({showModal: true})
  }

  handleFloorChange = (event, data) => {
    console.log("event>>", event.target.value);
    console.log('data is >>>', data);
    this.setState({floor: {selected: data.value}});
  }

  handleDelete(cluster) {
    console.log("cluster is>>>", cluster);
    return client.delete(`${INFRA_MANAGER_HOST}/clusters/${cluster.id}`)
    .then(() => {
      let clusters = this.state.building.clusters;
      clusters = _.filter(clusters, c => c.id !== cluster.id);
      console.log("clusters is >>>", clusters);
      let building = this.state.building;
      building.clusters = clusters;
      this.setState({building});
    })
  }

  goToFloor = () => {
    const floorNumber = this.state.floor.selected;
    let floors = this.state.building.floors;
    let floor = _.find(floors, {floor_number: floorNumber});

    this.props.router.push(`/floor/${floor.id}`);
  }
  render() {
    const floorOptions = _.map(this.state.usedFloors, floor => {
      return {
        key: `Floor ${floor}`,
        value: floor,
        text: `Floor ${floor}`,
      }
    })
    return (
      <Container>
        <Grid celled verticalAlign='middle' style={{'height': '80vh', 'backgroundColor': '#f7f7f7'}}>
          <Grid.Row>
            <Grid.Column width={4}>
              <BuildingSummary building={this.state.building} />
            </Grid.Column>
            <Grid.Column width={12}>
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
                  {_.map(this.state.building.clusters, (cluster, index)=>{
                    return (
                      <Table.Row>
                        <Table.Cell>
                          <Label ribbon={index===0}>{cluster.floor_number}</Label>
                        </Table.Cell>
                        <Table.Cell><Link to={`/floor/${cluster.floor_id}`}>{cluster.name}</Link></Table.Cell>
                        <Table.Cell>
                          <Label color={mapStatusToColor(cluster.status)}>
                            {cluster.status}
                          </Label>
                        </Table.Cell>
                        <Table.Cell>
                          <UpdateClusterModal buildingId={this.props.params.building_id} floor={this.state.floor} cluster={cluster} />
                        </Table.Cell>
                        <Table.Cell onClick={()=>this.handleDelete(cluster)}><Icon name="trash alternate"/></Table.Cell>
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
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Building;