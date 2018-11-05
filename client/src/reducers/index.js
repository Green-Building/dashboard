import { combineReducers } from 'redux';
import sensorData from './sensorData';

const greenBuildingReducer = combineReducers({
  sensorData,
});

export default greenBuildingReducer;