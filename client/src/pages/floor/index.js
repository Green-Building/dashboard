import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import client from '../../client';
import _ from 'lodash';
import { Container, Button, Grid, Form, Input } from 'semantic-ui-react';

import ClusterSummary from './clusterSummary';
import FloorRoomMap from './floorRoomMap';
import ClusterNetwork from './clusterNetwork';
import NodeTable from './nodeTable';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';
import { fetchFloorConfig, addNodeConfig, updateNodeConfig, deleteNodeConfig } from '../../reducers/clusterConfig';

const alphabet = ['A', 'B', 'C', 'D', 'E'];
class Floor extends Component {

  componentDidMount() {
    const  { floor_id } = this.props.params;
    console.log("here>>")
    return this.props.fetchFloorConfig(floor_id);
  }

  render() {
    const { params, router, clusterConfig, addNodeConfig, updateNodeConfig, deleteNodeConfig } = this.props;
    const { cluster, nodes, rooms, roomMap, floorStats } = clusterConfig;
    return (
      <Container>
        <Grid columns={2} celled style={{'backgroundColor': '#f7f7f7'}}>
          <Grid.Row stretched>
            <Grid.Column width={6}>
              <ClusterSummary floorStats={floorStats} cluster={cluster} nodes={nodes} rooms={rooms} />
              <FloorRoomMap roomMap={roomMap} rooms={rooms} router={router}/>
            </Grid.Column>
            <Grid.Column width={10}>
              <NodeTable
                cluster={cluster}
                params={params}
                rooms={rooms}
                nodes={nodes}
                router={router}
                addNodeConfig={addNodeConfig}
                updateNodeConfig={updateNodeConfig}
                deleteNodeConfig={deleteNodeConfig}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    clusterConfig: state.clusterConfig,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchFloorConfig: (floorId) => {
      dispatch(fetchFloorConfig(floorId));
    },
    addNodeConfig: (newNodeData) => {
      dispatch( addNodeConfig(newNodeData));
    },
    updateNodeConfig: (nodeId, updatedNodeData) => {
      dispatch(updateNodeConfig(nodeId, updatedNodeData));
    },
    deleteNodeConfig: (nodeId) => {
      dispatch(deleteNodeConfig(nodeId));
    }
  }
}

Floor = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Floor));

export default Floor;