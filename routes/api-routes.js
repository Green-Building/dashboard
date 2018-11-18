const router = require('express').Router();
const sensorConfig = require('../controllers/sensorConfig.ctlr');
const nodeConfig = require('../controllers/nodeConfig.ctlr');
const clusterConfig = require('../controllers/clusterConfig.ctlr');
const buildingConfig = require('../controllers/buildingConfig.ctlr');
const sensorDataMgmt = require('../controllers/sensorData.ctlr');
const floorConfig = require('../controllers/floorConfig.ctlr');
const roomConfig = require('../controllers/roomConfig.ctlr');

router
  .get('/buildings/statistics/:building_id', buildingConfig.getBuildingStats)
  .get('/buildings/search/location', buildingConfig.searchBuildingByCity)
  .get('/buildings/search/geocode', buildingConfig.searchBuildingByLatLng)
  .get('/buildings/:building_id', buildingConfig.getBuilding)
  .post('/buildings/add', buildingConfig.addBuilding)

  .get('/floors/:floor_id', floorConfig.getClusterFromFloor)
  .get('/floors/statistics/:floor_id', floorConfig.getFloorStats)
  .get('/clusters/:cluster_id', clusterConfig.getCluster)
  .post('/clusters', clusterConfig.upsertCluster)
  .delete('/clusters/:cluster_id', clusterConfig.deleteCluster)

  .get('/rooms/statistics/:room_id', roomConfig.getRoomStats)
  .post('/floors/add', floorConfig.addFloor)
  .post('/rooms/add', roomConfig.addRoom)

  .get('/nodes/:node_id', nodeConfig.getNode)
  .post('/nodes', nodeConfig.upsertNode)
  .delete('/nodes/:node_id', nodeConfig.deleteNode)

  .get('/sensors/:sensor_id', sensorConfig.getSensor)
  .post('/sensors', sensorConfig.upsertSensor)
  .delete('/sensors/:sensor_id', sensorConfig.deleteSensor)


  .post('/sensor-data/add', sensorDataMgmt.insertSensorData)
  .post('/sensor-data/bulk-add', sensorDataMgmt.bulkInsertSensorData)
  .get('/sensor-data/search-data', sensorDataMgmt.searchSensorData)


module.exports = router;