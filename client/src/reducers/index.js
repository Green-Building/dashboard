import { combineReducers } from 'redux';
import sensorData from './sensorData';
import buildingConfig from './buildingConfig';
import clusterConfig from './clusterConfig';

const greenBuildingReducer = combineReducers({
  sensorData,
  buildingConfig,
  clusterConfig,
});

export default greenBuildingReducer;