const router = require('express').Router();
const sensorConfig = require('../controllers/sensorConfig.ctlr');
const nodeConfig = require('../controllers/nodeConfig.ctlr');
const clusterConfig = require('../controllers/clusterConfig.ctlr');
const buildingConfig = require('../controllers/buildingConfig.ctlr');

router
  .get('/sensors/:sensor_id', sensorConfig.getSensor)

  .get('/nodes/:node_id', nodeConfig.getNode)

  .get('/clusters/:cluster_id', clusterConfig.getCluster)

  .get('/buildings/:building_id', buildingConfig.getBuilding)
  .post('/buildings', buildingConfig.searchBuildingByLatLng)

module.exports = router;