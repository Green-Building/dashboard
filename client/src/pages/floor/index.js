import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { scaleLinear } from 'd3-scale';
import { Container, Button, Grid, Form, Input } from 'semantic-ui-react';
import {XYPlot, XAxis, YAxis, HeatmapSeries, LabelSeries} from 'react-vis';

import ClusterSummary from './clusterSummary';
import ClusterNetwork from './clusterNetwork';
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
    return axios.get(`${INFRA_MANAGER_HOST}/floors/${floor_id}?fetch_nested=floor,room,node`)
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

  handleValueClick(d, event) {
    console.log("d is>>>", d);
    console.log("event is>>>", event);
    console.log(this.state.nodes);
    let node = _.find(this.state.nodes, {room_number: d.label});
    console.log("node is >>>", node);
    console.log("this.state.cluster is>>>", this.state.cluster);
    this.props.router.push(`/node/${node.id}`);
  }

  handleChange = (event, data) => {
    let newNode = this.state.newNode;
    newNode[data.name] = data.value;
    this.setState({newNode});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    return axios.post(`${INFRA_MANAGER_HOST}/nodes/add`, {
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
    const {min, max} = this.state.data.reduce(
      (acc, row) => ({
        min: Math.min(acc.min, row.color),
        max: Math.max(acc.max, row.color)
      }),
      {min: Infinity, max: -Infinity}
    );

    const exampleColorScale = scaleLinear()
        .domain([min, (min + max) / 2, max])
        .range(['orange', 'yellow', 'cyan']);

    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group >
                  <Form.Field>
                    <label>Name</label>
                    <Input name='name' value={this.state.newNode.name} placeholder='Name' onChange={this.handleChange} />
                  </Form.Field>
                  <Form.Field>
                    <label>Room</label>
                    <Input name='room' value={this.state.newNode.room} placeholder='Room' onChange={this.handleChange} />
                  </Form.Field>
                  <Form.Field>
                    <label>Status</label>
                    <Input name='status' value={this.state.newNode.status} placeholder='Status' onChange={this.handleChange} />
                  </Form.Field>
                </Form.Group>
                <Form.Field control={Button}>Submit</Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column width={8}>
              <ClusterSummary />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <XYPlot
                xType="ordinal"
                xDomain={this.state.alphabet.map(letter => `${letter}1`)}
                yType="ordinal"
                yDomain={this.state.alphabet.map(letter => `${letter}2`).reverse()}
                width={500}
                height={500}
                style={{display: 'inline-block'}}
              >
                <XAxis orientation="top" />
                <YAxis />
                <HeatmapSeries
                  colorType="literal"
                  getColor={d => exampleColorScale(d.color)}
                  style={{
                    stroke: 'white',
                    strokeWidth: '2px',
                    rectStyle: {
                      rx: 10,
                      ry: 10
                    }
                  }}
                  className="heatmap-series-example"
                  data={this.state.data}
                  onValueClick={(d, {event})=>this.handleValueClick(d, event)}
                />
                <LabelSeries
                  data={this.state.data}
                  labelAnchorX="middle"
                  labelAnchorY="baseline"
                  getLabel={d => `${d.label}`}
                />
              </XYPlot>
            </Grid.Column>
            <Grid.Column width={8}>
              <ClusterNetwork />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/*<Button onClick={this.goToSensorStats}>Goto Sensor Stats</Button>*/}
      </Container>
    );
  }
}
export default Floor;