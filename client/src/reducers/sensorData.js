import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';

import {
  DATA_MANAGER_HOST,
  INFRA_MANAGER_HOST,
} from '../api-config';

//
// INITIAL STATE
//
const INITIAL_STATE = {
  sensor: {},
  data: [],
};

//
// CONSTANTS
//
const UPDATE_TIME = 'UPDATE_TIME';
const FETCH_SENSOR_DATA = 'FETCH_SENSOR_DATA';
const SUCCESS_SENSOR_DATA = 'SUCCESS_SENOSR_DATA';
const ERROR_SENSOR_DATA = 'ERROR_SENSOR_DATA';
const FETCH_SENSOR = 'FETCH_SENSOR';
const SUCCESS_SENSOR = 'SUCCESS_SENOSR';
const ERROR_SENSOR = 'ERROR_SENSOR';

//
// ACTIONS
//

export const fetchSensorData = (startTime, endTime) => (dispatch, getState) => {
  dispatch({
    type: 'FETCH_SENSOR_DATA',
  });

  return axios(`${DATA_MANAGER_HOST}/sensor-data/search-data`, {
    method: 'GET',
    params: {
      idType:'sensor',
      id: 123,
      startTime: new Date(startTime),
      endTime: new Date(endTime)
    },
  })
  .then(
    response => {
      console.log("response is >>>", response)
      dispatch({
        type: 'SUCCESS_SENOSR_DATA',
        result: response.data,
      });
    },
    error => {
      dispatch({
        type: 'ERROR_SENSOR_DATA',
        message: error.message || 'Something went wrong.',
      });
    }
  );
};

export const fetchSensor = (sensorId) => (dispatch, getState) => {
  dispatch({
    type: 'FETCH_SENSOR',
  });

  return axios.get(`${INFRA_MANAGER_HOST}/sensors/${sensorId}`)
  .then(
    response => {
      console.log("response is >>>", response)
      dispatch({
        type: 'SUCCESS_SENOSR',
        result: response.data,
      });
    },
    error => {
      dispatch({
        type: 'ERROR_SENSOR',
        message: error.message || 'Something went wrong.',
      });
    }
  );
};

const sensorData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUCCESS_SENSOR_DATA:
      return _.assign({}, state, {data: action.result});
    case ERROR_SENSOR_DATA:
      return INITIAL_STATE;
    case SUCCESS_SENSOR:
      return _.assign({}, state, {sensor: action.result});
    case ERROR_SENSOR:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default sensorData;