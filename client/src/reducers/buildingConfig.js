import _ from 'lodash';
import Promise from 'bluebird';
import moment from 'moment';
import client from '../client';

import {
  DATA_MANAGER_HOST,
  INFRA_MANAGER_HOST,
} from '../api-config';

//
// INITIAL STATE
//
const INITIAL_STATE = {
  building: {},
  buildingStats: {},
  floors: [],
  isLoading: true,
  errorMessage: null,
};

//
// CONSTANTS
//
const GET_BUILDING_CONFIG = 'GET_BUILDING_CONFIG';
const SUCCESS_GET_BUILDING_CONFIG = 'SUCCESS_GET_BUILDING_CONFIG';
const ERROR_GET_BUILDING_CONFIG = 'ERROR_GET_BUILDING_CONFIG';

const ADD_BUILDING_CONFIG = 'ADD_BUILDING_CONFIG';
const SUCCESS_ADD_BUILDING_CONFIG = 'SUCCESS_ADD_BUILDING_CONFIG';
const ERROR_ADD_BUILDING_CONFIG = 'ERROR_ADD_BUILDING_CONFIG';

const UPDATE_BUILDING_CONFIG = 'UPDATE_BUILDING_CONFIG';
const SUCCESS_UPDATE_BUILDING_CONFIG = 'SUCCESS_UPDATE_BUILDING_CONFIG';
const ERROR_UPDATE_BUILDING_CONFIG = 'ERROR_UPDATE_BUILDING_CONFIG';

const DELETE_BUILDING_CONFIG = 'DELETE_BUILDING_CONFIG';
const SUCCESS_DELETE_BUILDING_CONFIG = 'SUCCESS_DELETE_BUILDING_CONFIG';
const ERROR_DELETE_BUILDING_CONFIG = 'ERROR_DELETE_BUILDING_CONFIG';

const ADD_CLUSTER_CONFIG = 'ADD_CLUSTER_CONFIG';
const SUCCESS_ADD_CLUSTER_CONFIG = 'SUCCESS_ADD_CLUSTER_CONFIG';
const ERROR_ADD_CLUSTER_CONFIG = 'ERROR_ADD_CLUSTER_CONFIG';

const UPDATE_CLUSTER_CONFIG = 'UPDATE_CLUSTER_CONFIG';
const SUCCESS_UPDATE_CLUSTER_CONFIG = 'SUCCESS_UPDATE_CLUSTER_CONFIG';
const ERROR_UPDATE_CLUSTER_CONFIG = 'ERROR_UPDATE_CLUSTER_CONFIG';

const DELETE_CLUSTER_CONFIG = 'DELETE_CLUSTER_CONFIG';
const SUCCESS_DELETE_CLUSTER_CONFIG = 'SUCCESS_DELETE_CLUSTER_CONFIG';
const ERROR_DELETE_CLUSTER_CONFIG = 'ERROR_DELETE_CLUSTER_CONFIG';

//
// ACTIONS
//

export const fetchBuildingConfig = (buildingId) => (dispatch, getState) => {
  dispatch({
    type: 'GET_BUILDING_CONFIG',
  });
  return Promise.all([
    client.get(`${INFRA_MANAGER_HOST}/buildings/${buildingId}?fetch_nested=floor,cluster`),
    client.get(`${INFRA_MANAGER_HOST}/buildings/statistics/${buildingId}`)
  ])
  .spread((buildingConfig, buildingStats) => {
    let building = buildingConfig.data;
    _.forEach(building.floors, floor => {
      floor.cluster = _.find(building.clusters, {floor_id: floor.id}) || null;
    });
    let floors = _.sortBy(building.floors, ['floor_number']);
    console.log("floors >>>", floors);
    dispatch({
      type: 'SUCCESS_GET_BUILDING_CONFIG',
      building,
      floors,
      buildingStats: buildingStats.data,
    });
  })
  .catch( error => {
    dispatch({
      type: 'ERROR_GET_BUILDING_CONFIG',
      message: error.message || 'Something went wrong.',
    });
  });
};

export const addClusterConfig = (newClusterData) => (dispatch, getState) => {
  dispatch({
    type: 'ADD_CLUSTER_CONFIG',
  });

  return client.post(`${INFRA_MANAGER_HOST}/clusters`, newClusterData)
  .then(
    response => {
      let cluster = response.data;
      dispatch({
        type: 'SUCCESS_ADD_CLUSTER_CONFIG',
        cluster,
      });
    },
    error => {
      dispatch({
        type: 'ERROR_ADD_CLUSTER_CONFIG',
        message: error.message || 'Something went wrong.',
      });
    }
  );
};

export const updateClusterConfig = (clusterId, updatedClusterData) => (dispatch, getState) => {
  dispatch({
    type: 'UPDATE_CLUSTER_CONFIG',
  });

  return client.post(`${INFRA_MANAGER_HOST}/clusters`, updatedClusterData)
  .then(
    response => {
      let cluster = response.data;
      dispatch({
        type: 'SUCCESS_UPDATE_CLUSTER_CONFIG',
        clusterId,
        cluster: cluster,
      });
    },
    error => {
      dispatch({
        type: 'ERROR_UPDATE_CLUSTER_CONFIG',
        message: error.message || 'Something went wrong.',
      });
    }
  );
};

export const deleteClusterConfig = (clusterId, floorId) => (dispatch, getState) => {
  dispatch({
    type: 'DELETE_CLUSTER_CONFIG',
  });

  return client.delete(`${INFRA_MANAGER_HOST}/clusters/${clusterId}`)
  .then(
    response => {
      dispatch({
        type: 'SUCCESS_DELETE_CLUSTER_CONFIG',
        clusterId,
        floorId,
      });
    },
    error => {
      dispatch({
        type: 'ERROR_DELETE_CLUSTER_CONFIG',
        message: error.message || 'Something went wrong.',
      });
    }
  );
};


const buildingConfig = (state = INITIAL_STATE, action) => {
  let cluster, floors, floor, clusterId, floorId;
  switch (action.type) {
    case SUCCESS_GET_BUILDING_CONFIG:
      return _.assign({}, state, {building: action.building, buildingStats: action.buildingStats, floors: action.floors, isLoading: false});
    case SUCCESS_ADD_CLUSTER_CONFIG:
      cluster = action.cluster;
      floors = state.floors;
      floor = _.find(floors, {id: cluster.floor_id});
      floor.cluster = cluster;
      return _.assign({}, state, { floors: floors, isLoading: false });
    case SUCCESS_UPDATE_CLUSTER_CONFIG:
      cluster = action.cluster;
      clusterId = action.clusterId;
      floors = state.floors;
      floor = _.find(floors, { id: cluster.floor_id });
      floor.cluster = cluster;
      return _.assign({}, state, { floors: floors, isLoading: false });
    case SUCCESS_DELETE_CLUSTER_CONFIG:
      clusterId = action.clusterId;
      floorId = action.floorId;
      floors = state.floors;
      floor = _.find(floors, { id: floorId });
      floor.cluster = null;
      return _.assign({}, state, { floors: floors, isLoading: false });
    case ERROR_GET_BUILDING_CONFIG:
    case ERROR_ADD_CLUSTER_CONFIG:
    case ERROR_UPDATE_CLUSTER_CONFIG:
    case ERROR_DELETE_CLUSTER_CONFIG:
      return _.assign({}, state, { isLoading: false, errorMessage: action.message });
    default:
      return state;
  }
};

export default buildingConfig;