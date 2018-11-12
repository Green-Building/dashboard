import _ from 'lodash';
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

//
// ACTIONS
//

export const fetchBuildingConfig = (buildingId) => (dispatch, getState) => {
  dispatch({
    type: 'GET_BUILDING_CONFIG',
  });

  return client.get(`${INFRA_MANAGER_HOST}/api/buildings/${buildingId}?fetch_nested=floor,cluster`)
  .then(
    response => {
      let building = response.data;
      _.forEach(building.floors, floor => {
        floor.cluster = _.find(building.clusters, {floor_id: floor.id}) || null;
      });
      let floors = _.sortBy(building.floors, ['floor_number']);
      console.log("floors >>>", floors);
      dispatch({
        type: 'SUCCESS_GET_BUILDING_CONFIG',
        building,
        floors,
      });
    },
    error => {
      dispatch({
        type: 'ERROR_GET_BUILDING_CONFIG',
        message: error.message || 'Something went wrong.',
      });
    }
  );
};


const buildingConfig = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUCCESS_GET_BUILDING_CONFIG:
      return _.assign({}, state, {building: action.building, floors: action.floors, isLoading: false});
    case ERROR_GET_BUILDING_CONFIG:
      return _.assign({}, state, {isLoading: false, errorMessage: action.message})
    default:
      return state;
  }
};

export default buildingConfig;