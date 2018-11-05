const router = require('express').Router();
const sensorConfig = require('../controllers/sensorConfig.ctlr');
const nodeConfig = require('../controllers/nodeConfig.ctlr');
const clusterConfig = require('../controllers/clusterConfig.ctlr');
const buildingConfig = require('../controllers/buildingConfig.ctlr');
const sensorDataMgmt = require('../controllers/sensorData.ctlr');

router
  .get('/sensors/:sensor_id', sensorConfig.getSensor)
  .post('/sensors/add', sensorConfig.addSensor)

  .get('/nodes/:node_id', nodeConfig.getNode)
  .post('/nodes/add', nodeConfig.addNode)

  .get('/clusters/cluster_from_floor', clusterConfig.getClusterFromFloor)
  .get('/clusters/:cluster_id', clusterConfig.getCluster)
  .post('/clusters/add', clusterConfig.addCluster)
  .put('/clusters/:cluster_id', clusterConfig.updateCluster)

  .get('/buildings/search', buildingConfig.searchBuildingByCity)
  .get('/buildings/:building_id', buildingConfig.getBuilding)
  .post('/buildings/add', buildingConfig.addBuilding)
  .post('/buildings', buildingConfig.searchBuildingByLatLng)

  .post('/sensor-data/add', sensorDataMgmt.insertSensorData)
  .post('/sensor-data/bulk-add', sensorDataMgmt.bulkInsertSensorData)
  .get('/sensor-data/search-data', sensorDataMgmt.searchSensorData)

module.exports = router;