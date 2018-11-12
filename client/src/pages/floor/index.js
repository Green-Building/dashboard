import React, { Component } from 'react';
import client from '../../client';
import _ from 'lodash';
import { Container, Button, Grid, Form, Input } from 'semantic-ui-react';

import ClusterSummary from './clusterSummary';
import FloorRoomMap from './floorRoomMap';
import ClusterNetwork from './clusterNetwork';
import ClusterTable from './clusterTable';
import {
  INFRA_MANAGER_HOST
} from '../../api-config';


class Floor extends Component {
  state = {
    cluster: {},
    nodes: [],
    data: [],
    alphabet: ['A', 'B', 'C', 'D', 'E'],
    newNode: {}
  }

  componentDidMount() {
    console.log("this.props>>>", this.props);
    const  { building_id, floor_id } = this.props.params;
    return client.get(`${INFRA_MANAGER_HOST}/api/floors/${floor_id}?fetch_nested=floor,room,node`)
    .then(response => {
      console.log("response is >>>", response);
      let cluster = response.data;
      cluster.nodes = _.map(cluster.nodes, node => {
        node.room_number = _.find(cluster.floor.rooms, {id: node.room_id}).room_number;
        console.log("_.find(rooms, {id: node.room_id}).name>>>", node.room_number);
        return node;
      });

      const data = this.state.alphabet.reduce((acc, letter1, idx) => {
        return acc.concat(
          this.state.alphabet.map((letter2, jdx) => ({
            x: `${letter1}1`,
            y: `${letter2}2`,
            color: 0,
            label: ''
          }))
        );
      }, []);

      _.forEach(cluster.nodes, (node, i) => {
        data[i].color = 1;
        data[i].label = node.room_number;
      })

      this.setState({cluster, nodes: cluster.nodes, data: data});
    })
    .catch(err => {
      console.log("err retrieving clusters from floor>>", err);
    })
  }

  handleChange = (event, data) => {
    let newNode = this.state.newNode;
    newNode[data.name] = data.value;
    this.setState({newNode});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    return client.post(`${INFRA_MANAGER_HOST}/api/nodes/add`, {
      data: _.assign({}, this.state.newNode, {cluster_id: this.state.cluster.id}),
    })
    .then(response => {
      console.log("response inserting new node is >>>", response);
    })
    .catch(err => {
      console.log("err inserting new node is >>>", err);
    });
  }

  render() {
    const { router } = this.props;

    return (
      <Container>
        <Grid columns={2} celled style={{'backgroundColor': '#f7f7f7'}}>
          <Grid.Row stretched>
            <Grid.Column width={6}>
              <ClusterSummary cluster={this.state.cluster}/>
              <FloorRoomMap data={this.state.data} alphabet={this.state.alphabet} nodes={this.state.nodes} router={router}/>
            </Grid.Column>
            <Grid.Column width={10}>
              <ClusterTable cluster={this.state.cluster} router={router}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
export default Floor;