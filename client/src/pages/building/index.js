import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { Container, Grid, Button, Card, Icon, Image, Dropdown, Table, Label } from 'semantic-ui-react';
import client from '../../client';
import { fetchBuildingConfig } from '../../reducers/buildingConfig';

import Loading from '../../component/Loading';
import ClusterTable from './clusterTable';
import BuildingSummary from './buildingSummary';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';

class Building extends Component {
  state = {
    building: {},
    floors: [],
    loading: true,
  }

  async componentDidMount() {
    const { fetchBuildingConfig } = this.props;
    const { building_id } = this.props.params;
    return fetchBuildingConfig(building_id);
  }

  handleDelete(cluster) {
    return client.delete(`${INFRA_MANAGER_HOST}/api/clusters/${cluster.id}`)
    .then(() => {
      let clusters = this.state.building.clusters;
      clusters = _.filter(clusters, c => c.id !== cluster.id);
      let building = this.state.building;
      building.clusters = clusters;
      this.setState({building});
    })
  }

  render() {
    const { isLoading, building, floors } = this.props.buildingConfig;
    return isLoading ? <Loading /> :
      (
        <Container>
          <Grid celled verticalAlign='middle' style={{'height': '80vh', 'backgroundColor': '#f7f7f7'}}>
            <Grid.Row>
              <Grid.Column width={4}>
                <BuildingSummary building={building} />
              </Grid.Column>
              <Grid.Column width={12}>
                <ClusterTable params={this.props.params} handleDelete={this.handleDelete} floors={floors}/>
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
      dispatch(fetchBuildingConfig(buildingId))
    },
  }
}

Building = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Building));

export default Building;