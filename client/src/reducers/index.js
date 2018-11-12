import { combineReducers } from 'redux';
import sensorData from './sensorData';
import buildingConfig from './buildingConfig';

const greenBuildingReducer = combineReducers({
  sensorData,
  buildingConfig,
});

export default greenBuildingReducer;