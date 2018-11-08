import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';

import {
  DATA_MANAGER_HOST,
} from '../api-config';

//
// INITIAL STATE
//
const INITIAL_STATE = [];

//
// CONSTANTS
//
const UPDATE_TIME = 'UPDATE_TIME';
const FETCH_SENSOR_DATA = 'FETCH_SENSOR_DATA';
const SUCCESS_SENSOR_DATA = 'SUCCESS_SENOSR_DATA';
const ERROR_SENSOR_DATA = 'ERROR_SENSOR_DATA';

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

const sensorData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUCCESS_SENSOR_DATA:
      return [].concat(action.result);
    case ERROR_SENSOR_DATA:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default sensorData;