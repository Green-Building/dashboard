const router = require('express').Router();
const sensorConfig = require('../controllers/sensorConfig.ctlr');
const nodeConfig = require('../controllers/nodeConfig.ctlr');
const clusterConfig = require('../controllers/clusterConfig.ctlr');
const buildingConfig = require('../controllers/buildingConfig.ctlr');
const sensorDataMgmt = require('../controllers/sensorData.ctlr');

router
  .get('/sensors/:sensor_id', sensorConfig.getSensor)

  .get('/nodes/:node_id', nodeConfig.getNode)

  .get('/clusters/:cluster_id', clusterConfig.getCluster)

  .get('/buildings/:building_id', buildingConfig.getBuilding)
  .post('/buildings/add', buildingConfig.addBuilding)
  .post('/buildings', buildingConfig.searchBuildingByLatLng)

  .post('/sensor-data/add', sensorDataMgmt.insertSensorData)
  .post('/sensor-data/bulk-add', sensorDataMgmt.bulkInsertSensorData)

module.exports = router;