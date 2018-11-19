import _ from 'lodash';
import moment from 'moment-timezone';
import client from '../client';

import {
  DATA_MANAGER_HOST,
  INFRA_MANAGER_HOST,
} from '../api-config';

//
// INITIAL STATE
//
const INITIAL_STATE = {
  device: {},
  device_type: null,
  data: {},
  isLoading: true,
};

//
// CONSTANTS
//
const UPDATE_TIME = 'UPDATE_TIME';
const FETCH_SENSOR_DATA = 'FETCH_SENSOR_DATA';
const SUCCESS_SENSOR_DATA = 'SUCCESS_SENOSR_DATA';
const ERROR_SENSOR_DATA = 'ERROR_SENSOR_DATA';
const FETCH_DEVICE = 'FETCH_DEVICE';
const SUCCESS_DEVICE  = 'SUCCESS_DEVICE';
const ERROR_DEVICE  = 'ERROR_DEVICE';

//
// ACTIONS
//

export const fetchSensorData = (type, id, startTime, endTime) => (dispatch, getState) => {
  dispatch({
    type: 'FETCH_SENSOR_DATA',
  });
  const tz = moment.tz.guess();

  return client(`${DATA_MANAGER_HOST}/sensor_data/${type}/${id}`, {
    method: 'GET',
    params: {
      startTime: moment(startTime).tz(tz).format("ddd MMM DD hh:mm:ss zz YYYY"),
      endTime: moment(endTime).tz(tz).format("ddd MMM DD hh:mm:ss zz YYYY")
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

export const fetchDevice = (type, id) => (dispatch, getState) => {
  dispatch({
    type: 'FETCH_DEVICE',
  });
  let fetchDeviceUrl;
  if(type === "cluster") {
    fetchDeviceUrl = `${INFRA_MANAGER_HOST}/clusters/${id}?fetch_nested=node,sensor`;
  } else if (type === "node") {
    fetchDeviceUrl = `${INFRA_MANAGER_HOST}/nodes/${id}?fetch_nested=sensor`;
  } else {
    fetchDeviceUrl = `${INFRA_MANAGER_HOST}/sensors/${id}`;
  }
  return client.get(fetchDeviceUrl)
  .then(
    response => {
      dispatch({
        type: 'SUCCESS_DEVICE',
        device_type: type,
        device: response.data,
      });
    },
    error => {
      dispatch({
        type: 'ERROR_DEVICE',
        message: error.message || 'Something went wrong.',
      });
    }
  );
};

function groupSensorData(sensorData) {
  return _.groupBy(sensorData, 'sensorId');
}

const sensorData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUCCESS_SENSOR_DATA:
      let groupedSensorData = groupSensorData(action.result);
      return _.assign({}, state, { data: groupedSensorData, isLoading: false });
    case ERROR_SENSOR_DATA:
      return INITIAL_STATE;
    case SUCCESS_DEVICE:
      return _.assign({}, state, { device: action.device, device_type: action.device_type });
    case ERROR_DEVICE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default sensorData;