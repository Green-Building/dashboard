import React, { Component } from 'react';
import _ from 'lodash';
import client from '../../client';
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
    return client.get(`${INFRA_MANAGER_HOST}/api/nodes/${node_id}`)
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
    return client.post(`${INFRA_MANAGER_HOST}/api/sensors/add`, {
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
    this.props.router.push(`/sensor/${id}`);
  }

  render() {
    return (
      <Container>
        <Grid columns={2} celled verticalAlign='middle' style={{'backgroundColor': '#f7f7f7'}}>
          <Grid.Row stretched>
            <Grid.Column width={6} >
              <Grid>
                <Grid.Row>
                  <NodeSummary node={this.state.node} />
                </Grid.Row>
                <Grid.Row>
                  <NodeNetwork node={this.state.node} router={this.props.router}/>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column width={10} >
              <SensorTable sensors={this.state.sensors} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default Node;