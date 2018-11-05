import _ from 'lodash';

//
// INITIAL STATE
//
const INITIAL_STATE = {
  queryTime: {
    startTime: null,
    endTime: null,
  }
};

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
export const updateTime = newTime => (dispatch, getState) => {
  dispatch({
    type: UPDATE_TIME,
    result: newTime,
  })
}

const sensorData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_TIME:
      return _.assign(state, { queryTime: action.result });
    default:
      return state;
  }
};

export default sensorData;