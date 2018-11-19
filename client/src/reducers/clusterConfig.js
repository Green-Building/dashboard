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
  cluster: {},
  floorStats: {},
  nodes: [],
  rooms: [],
  roomMap: [],
  isLoading: true,
  errorMessage: null,
};

//
// CONSTANTS
//

const GET_FLOOR_CONFIG = 'GET_FLOOR_CONFIG';
const SUCCESS_GET_FLOOR_CONFIG = 'SUCCESS_GET_FLOOR_CONFIG';
const ERROR_GET_FLOOR_CONFIG = 'ERROR_GET_FLOOR_CONFIG';

const GET_FLOOR_STATISTICS = 'GET_FLOOR_STATISTICS';
const SUCCESS_GET_FLOOR_STATISTICS = 'SUCCESS_GET_FLOOR_STATISTICS';
const ERROR_GET_FLOOR_STATISTICS = 'ERROR_GET_FLOOR_STATISTICS';

const ADD_NODE_CONFIG = 'ADD_NODE_CONFIG';
const SUCCESS_ADD_NODE_CONFIG = 'SUCCESS_ADD_NODE_CONFIG';
const ERROR_ADD_NODE_CONFIG = 'ERROR_ADD_NODE_CONFIG';

const UPDATE_NODE_CONFIG = 'UPDATE_NODE_CONFIG';
const SUCCESS_UPDATE_NODE_CONFIG = 'SUCCESS_UPDATE_NODE_CONFIG';
const ERROR_UPDATE_NODE_CONFIG = 'ERROR_UPDATE_NODE_CONFIG';

const DELETE_NODE_CONFIG = 'DELETE_NODE_CONFIG';
const SUCCESS_DELETE_NODE_CONFIG = 'SUCCESS_DELETE_NODE_CONFIG';
const ERROR_DELETE_NODE_CONFIG = 'ERROR_DELETE_NODE_CONFIG';

const alphabet = ['A', 'B', 'C', 'D'];
//
// ACTIONS
//
export const fetchFloorConfig = (floorId) => (dispatch, getState) => {
  dispatch({
    type: 'GET_FLOOR_CONFIG',
  });
  let url;
  if (INFRA_MANAGER_HOST.indexOf('v0') !== -1) {
    url = `${INFRA_MANAGER_HOST}/floors/${floorId}?fetch_nested=floor,room,node,sensor`;
  } else {
    url = `${INFRA_MANAGER_HOST}/floors/${floorId}?fetch_nested=room,node,sensor`;
  }

  return client.get(url)
  .then(cluster => {
    cluster = cluster.data;
    if (!cluster.rooms && cluster.floor.rooms) {
      cluster.rooms = cluster.floor.rooms;
    }
    let rooms = cluster.rooms;//cluster.floor.rooms;
    let nodes = cluster.nodes;
    _.forEach(rooms, room => {
      room.node = _.find(nodes, {id: room.id}) || {};
    })

    const roomMap = alphabet.reduce((acc, letter1, idx) => {
      return acc.concat(
        alphabet.map((letter2, jdx) => ({
          x: `${letter1}1`,
          y: `${letter2}2`,
          color: 0,
          label: ''
        }))
      );
    }, []);
    _.forEach(rooms, (room, i) => {
      roomMap[i].color = _.get(room.node, 'sensors', []).length;
      roomMap[i].label = room.room_number;
    })
    console.log("here>>>", cluster, rooms, nodes, roomMap)
    dispatch({
      type: 'SUCCESS_GET_FLOOR_CONFIG',
      cluster,
      rooms,
      nodes,
      roomMap,
    });
  })
  .catch(error => {
    dispatch({
      type: 'ERROR_GET_FLOOR_CONFIG',
      message: error.message || 'Something went wrong.',
    });
  });
};

export const fetchFloorStats = (floorId) => (dispatch, getState) => {
  dispatch({
    type: 'GET_FLOOR_STATISTICS',
  });
  return client.get(`${INFRA_MANAGER_HOST}/floors/statistics/${floorId}`)
  .then(floorStats => {
    dispatch({
      type: 'SUCCESS_GET_FLOOR_STATISTICS',
      floorStats: floorStats.data,
    });
  })
  .catch(error => {
    dispatch({
      type: 'ERROR_GET_FLOOR_STATISTICS',
      message: error.message || 'Something went wrong.',
    });
  });
}

export const addNodeConfig = (newNodeData) => (dispatch, getState) => {
  dispatch({
    type: 'ADD_NODE_CONFIG',
  });

  return client.post(`${INFRA_MANAGER_HOST}/nodes`, newNodeData)
  .then(
    response => {
      let node = response.data;
      dispatch({
        type: 'SUCCESS_ADD_NODE_CONFIG',
        node,
      });
    },
    error => {
      dispatch({
        type: 'ERROR_ADD_NODE_CONFIG',
        message: error.message || 'Something went wrong.',
      });
    }
  );
};

export const updateNodeConfig = (nodeId, updatedNodeData) => (dispatch, getState) => {
  dispatch({
    type: 'UPDATE_NODE_CONFIG',
  });

  return client.put(`${INFRA_MANAGER_HOST}/nodes/${nodeId}`, _.omit(updatedNodeData, 'id'))
  .then(
    response => {
      let node = response.data;
      dispatch({
        type: 'SUCCESS_UPDATE_NODE_CONFIG',
        nodeId,
        node: node,
      });
    },
    error => {
      dispatch({
        type: 'ERROR_UPDATE_NODE_CONFIG',
        message: error.message || 'Something went wrong.',
      });
    }
  );
};

export const deleteNodeConfig = (nodeId) => (dispatch, getState) => {
  dispatch({
    type: 'DELETE_NODE_CONFIG',
  });

  return client.delete(`${INFRA_MANAGER_HOST}/nodes/${nodeId}`)
  .then(
    response => {
      dispatch({
        type: 'SUCCESS_DELETE_NODE_CONFIG',
        nodeId,
      });
    },
    error => {
      dispatch({
        type: 'ERROR_DELETE_NODE_CONFIG',
        message: error.message || 'Something went wrong.',
      });
    }
  );
};


const clusterConfig = (state = INITIAL_STATE, action) => {
  let node, nodeId, nodes;
  switch (action.type) {
    case SUCCESS_GET_FLOOR_CONFIG:
      return _.assign({}, state, { cluster: action.cluster, rooms: action.rooms, nodes: action.nodes, roomMap: action.roomMap, isLoading: false});
    case SUCCESS_GET_FLOOR_STATISTICS:
      return _.assign({}, state, { floorStats: action.floorStats, isLoading: false });
    case SUCCESS_ADD_NODE_CONFIG:
      node = action.node;
      nodes = state.nodes;
      nodes = nodes.concat(node);
      return _.assign({}, state, { nodes: nodes, isLoading: false });
    case SUCCESS_UPDATE_NODE_CONFIG:
      nodeId = action.nodeId;
      nodes = state.nodes;
      let index = _.findIndex(nodes, { id: nodeId });
      nodes[index] = action.node;
      return _.assign({}, state, { nodes: nodes, isLoading: false });
    case SUCCESS_DELETE_NODE_CONFIG:
      nodeId = action.nodeId;
      nodes = state.nodes;
      nodes = _.filter(nodes, node => node.id !== nodeId);
      return _.assign({}, state, { nodes: nodes, isLoading: false });
    case ERROR_GET_FLOOR_CONFIG:
    case ERROR_ADD_NODE_CONFIG:
    case ERROR_UPDATE_NODE_CONFIG:
    case ERROR_DELETE_NODE_CONFIG:
    case ERROR_GET_FLOOR_STATISTICS:
      return _.assign({}, state, { isLoading: false, errorMessage: action.message });
    default:
      return state;
  }
};

export default clusterConfig;