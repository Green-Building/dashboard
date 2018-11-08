import React, { Component } from 'react';
import _ from 'lodash';
import { Container, Grid, Button, Card, Icon, Image, Dropdown, Table, Label } from 'semantic-ui-react';
import axios from 'axios';

import UpdateClusterModal from './updateClusterModal';
import AddClusterModal from './addClusterModal';
import AddFloorModal from './addFloorModal';
import AddRoomModal from './addRoomModal';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';

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
    return axios.get(`${INFRA_MANAGER_HOST}/buildings/${building_id}?fetch_nested=true`)
    .then(response => {
      console.log(_.range(1, response.data.num_of_floors+1))
      let floors = _.range(1, response.data.num_of_floors+1);
      let usedFloors = _.map(response.data.clusters, cluster => {
        return +cluster.floor.floor_number;
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
    return axios.delete(`${INFRA_MANAGER_HOST}/clusters/${cluster.id}`)
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
    this.props.router.push(`/building/${this.props.params.building_id}/floor/${this.state.floor.selected}`);
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
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
            <Card>
              <Image src={this.state.building.image_url} />
              <Card.Content>
                <Card.Header>{this.state.building.name}</Card.Header>
                <Card.Description>{this.state.building.address}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='user' />
                  {this.state.building.num_of_floors}
                </a>
              </Card.Content>
            </Card>
            </Grid.Column>
            <Grid.Column width={8}>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Floor</Table.HeaderCell>
                    <Table.HeaderCell>Cluster Name</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Update</Table.HeaderCell>
                    <Table.HeaderCell>Delete</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {_.map(this.state.building.clusters, (cluster, index)=>{
                    return (
                      <Table.Row>
                        <Table.Cell>
                          <Label ribbon={index===0}>{cluster.floor.floor_number}</Label>
                        </Table.Cell>
                        <Table.Cell>{cluster.name}</Table.Cell>
                        <Table.Cell>{cluster.status}</Table.Cell>
                        <Table.Cell>
                          <UpdateClusterModal buildingId={this.props.params.building_id} floor={this.state.floor} cluster={cluster} />
                        </Table.Cell>
                        <Table.Cell onClick={()=>this.handleDelete(cluster)}>Delete</Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
              <AddFloorModal params={this.props.params} />
              <AddRoomModal params={this.props.params} />
              <AddClusterModal params={this.props.params} availableFloors={this.state.availableFloors} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Dropdown
                placeholder='Select a floor'
                value={this.state.floor.selected}
                options={floorOptions}
                onChange={this.handleFloorChange} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Button onClick={this.goToFloor}>Goto Floor</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Building;