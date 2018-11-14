import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { Container, Grid, Button, Card, Icon, Image, Dropdown, Table, Label } from 'semantic-ui-react';
import client from '../../client';
import { fetchBuildingConfig, addClusterConfig, updateClusterConfig, deleteClusterConfig } from '../../reducers/buildingConfig';

import Loading from '../../component/Loading';
import ClusterTable from './clusterTable';
import BuildingSummary from './buildingSummary';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';

class Building extends Component {

  componentDidMount() {
    const { fetchBuildingConfig } = this.props;
    const { building_id } = this.props.params;
    return fetchBuildingConfig(building_id);
  }

  render() {
    const { isLoading, building, floors, buildingStats } = this.props.buildingConfig;
    return isLoading ? <Loading /> :
      (
        <Container>
          <Grid celled verticalAlign='middle' style={{'minHeight': '80vh', 'backgroundColor': '#f7f7f7'}}>
            <Grid.Row>
              <Grid.Column width={4}>
                <BuildingSummary building={building} buildingStats={buildingStats}/>
              </Grid.Column>
              <Grid.Column width={12}>
                <ClusterTable
                  params={this.props.params}
                  addClusterConfig={this.props.addClusterConfig}
                  updateClusterConfig={this.props.updateClusterConfig}
                  deleteClusterConfig={this.props.deleteClusterConfig}
                  floors={floors}
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
    buildingConfig: state.buildingConfig,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBuildingConfig: (buildingId) => {
      dispatch(fetchBuildingConfig(buildingId));
    },
    addClusterConfig: (newClusterData) => {
      dispatch(addClusterConfig(newClusterData));
    },
    updateClusterConfig: (clusterId, updatedClusterData) => {
      dispatch(updateClusterConfig(clusterId, updatedClusterData));
    },
    deleteClusterConfig: (clusterId, floorId) => {
      dispatch(deleteClusterConfig(clusterId, floorId));
    }
  }
}

Building = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Building));

export default Building;