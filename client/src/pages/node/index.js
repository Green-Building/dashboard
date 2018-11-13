import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import client from '../../client';
import {ForceGraph, ForceGraphNode, ForceGraphLink} from 'react-vis-force';
import { Container, Button, Grid, Form, Input } from 'semantic-ui-react';

import NodeNetwork from './nodeNetwork';
import NodeSummary from './nodeSummary';
import SensorTable from './sensorTable';
import AddSensorModal from './addSensorModal';

import { fetchNodeConfig, addSensorConfig, updateSensorConfig, deleteSensorConfig } from '../../reducers/nodeConfig';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';

class Node extends Component {

  componentDidMount() {
    const  { node_id } = this.props.params;
    return this.props.fetchNodeConfig(node_id);
  }

  render() {
    const { nodeConfig, router, addSensorConfig, updateSensorConfig, deleteSensorConfig } = this.props;
    const { node, sensors } = nodeConfig;
    return (
      <Container>
        <Grid columns={2} celled style={{'backgroundColor': '#f7f7f7'}}>
          <Grid.Row stretched>
            <Grid.Column width={6} >
              <Grid>
                <Grid.Row>
                  <NodeSummary node={node} />
                </Grid.Row>
                <Grid.Row>
                  <NodeNetwork node={node} router={router}/>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column width={10} >
              <SensorTable
                sensors={sensors}
                addSensorConfig={addSensorConfig}
                updateSensorConfig={updateSensorConfig}
                deleteSensorConfig={deleteSensorConfig}
              />
              <AddSensorModal node={node} addSensorConfig={addSensorConfig} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    nodeConfig: state.nodeConfig,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchNodeConfig: (nodeId) => {
      dispatch(fetchNodeConfig(nodeId));
    },
    addSensorConfig: (newSensorData) => {
      dispatch(addSensorConfig(newSensorData));
    },
    updateSensorConfig: (sensorId, updatedSensorData) => {
      dispatch(updateSensorConfig(sensorId, updatedSensorData));
    },
    deleteSensorConfig: (sensorId) => {
      dispatch(deleteSensorConfig(sensorId));
    }
  }
}

Node = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Node));

export default Node;