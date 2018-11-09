import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import {ForceGraph, ForceGraphNode, ForceGraphLink} from 'react-vis-force';
import { Container, Button, Grid, Form, Input } from 'semantic-ui-react';

import NodeNetwork from './nodeNetwork';
import NodeSummary from './nodeSummary';
import SensorTable from './sensorTable';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';

class Node extends Component {
  state = {
    node: {},
    sensors: [],
    newSensor: {}
  }

  componentDidMount() {
    const  { node_id } = this.props.params;
    return axios.get(`${INFRA_MANAGER_HOST}/nodes/${node_id}`)
    .then(response => {
      console.log("response getting node is>>>", response);
      let node = response.data;
      this.setState({node, sensors: node.sensors});
    })
    .catch(err => {
      console.log("err getting node is >>>", err);
    })
  }

  handleChange = (event, data) => {
    let newSensor = this.state.newSensor;
    newSensor[data.name] = data.value;
    this.setState({newSensor});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let newSensor = _.assign({}, this.state.newSensor, {node_id: this.props.params.node_id});
    return axios.post(`${INFRA_MANAGER_HOST}/sensors/add`, {
      data: newSensor
    })
    .then(response => {
      console.log("response adding sensor is>>>", response);
    })
    .catch(err => {
      console.log("err adding sensor is >>>", err);
    })
  }

  handleNodeClick = (event, data) => {
    console.log("node clicked!!!!", data);
  }

  handleSensorClick = (event, data) => {
    let id = event.target.getAttribute('name');
    console.log(event.target.getAttribute('name'))
    this.props.router.push(`/sensor-data/${id}`);
  }

  render() {
    console.log("this.state.sensors>>>", this.state.sensors);
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8} >
              {
                this.state.sensors.length > 0  ?
                <ForceGraph zoom simulationOptions={{ height: 300, width: 300 }}>
                  <ForceGraphNode node={{ id: this.state.node.id }} fill="cyan" r="15" onClick={this.handleNodeClick} />
                  {_.map(this.state.sensors, sensor => {
                    return <ForceGraphNode node={{ id: `${sensor.id}:${sensor.name}` }} name={sensor.id} fill="orange" r="10" onClick={this.handleSensorClick} />
                  })}

                  {_.map(this.state.sensors, sensor => {
                    return <ForceGraphLink link={{ source: this.state.node.id, target: `${sensor.id}:${sensor.name}` }} />
                  })}
                </ForceGraph> :
                null
              }
            </Grid.Column>
            <Grid.Column width={8} >
              <Form onSubmit={this.handleSubmit}>
                <Form.Group >
                  <Form.Field>
                    <label>Name</label>
                    <Input name='name' value={this.state.newSensor.name} placeholder='Name' onChange={this.handleChange} />
                  </Form.Field>
                  <Form.Field>
                    <label>Type</label>
                    <Input name='type' value={this.state.newSensor.type} placeholder='Type' onChange={this.handleChange} />
                  </Form.Field>
                  <Form.Field>
                    <label>Status</label>
                    <Input name='status' value={this.state.newSensor.status} placeholder='Status' onChange={this.handleChange} />
                  </Form.Field>
                </Form.Group>
                <Form.Field control={Button}>Submit</Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5}>
              <NodeSummary />
            </Grid.Column>
            <Grid.Column width={5}>
              <NodeNetwork />
            </Grid.Column>
            <Grid.Column width={5}>
              <SensorTable />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default Node;