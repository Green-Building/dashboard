const router = require('express').Router();
const sensorConfig = require('../controllers/sensorConfig.ctlr');
const nodeConfig = require('../controllers/nodeConfig.ctlr');
const clusterConfig = require('../controllers/clusterConfig.ctlr');
const buildingConfig = require('../controllers/buildingConfig.ctlr');
const sensorDataMgmt = require('../controllers/sensorData.ctlr');
const floorConfig = require('../controllers/floorConfig.ctlr');
const roomConfig = require('../controllers/roomConfig.ctlr');

router
  .get('/sensors/:sensor_id', sensorConfig.getSensor)
  .post('/sensors/add', sensorConfig.addSensor)

  .get('/nodes/:node_id', nodeConfig.getNode)
  .post('/nodes/add', nodeConfig.addNode)
  .put('/nodes/:node_id', nodeConfig.updateNode)
  .delete('/nodes/:node_id', nodeConfig.deleteNode)

  .get('/floors/:floor_id', floorConfig.getClusterFromFloor)
  .get('/clusters/:cluster_id', clusterConfig.getCluster)
  .post('/clusters/add', clusterConfig.addCluster)
  .put('/clusters/:cluster_id', clusterConfig.updateCluster)
  .delete('/clusters/:cluster_id', clusterConfig.deleteCluster)

  .post('/floors/add', floorConfig.addFloor)
  .post('/rooms/add', roomConfig.addRoom)

  .get('/buildings/search/location', buildingConfig.searchBuildingByCity)
  .get('/buildings/search/geocode', buildingConfig.searchBuildingByLatLng)
  .get('/buildings/:building_id', buildingConfig.getBuilding)
  .post('/buildings/add', buildingConfig.addBuilding)

  .post('/sensor-data/add', sensorDataMgmt.insertSensorData)
  .post('/sensor-data/bulk-add', sensorDataMgmt.bulkInsertSensorData)
  .get('/sensor-data/search-data', sensorDataMgmt.searchSensorData)

module.exports = router;