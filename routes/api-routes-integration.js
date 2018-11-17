const router = require('express').Router();
const forwardingConfig = require('../controllers/forwarding.ctlr');

router
  .get('/buildings/statistics/:building_id', forwardingConfig.getBuildingStats)
  .get('/buildings/search/location', forwardingConfig.searchBuildingByCity)
  .get('/buildings/search/geocode', forwardingConfig.searchBuildingByLatLng)
  .get('/buildings/:building_id', forwardingConfig.getBuilding)

  .get('/floors/:floor_id', forwardingConfig.getClusterFromFloor)
  .get('/floors/statistics/:floor_id', forwardingConfig.getFloorStats)
  .get('/clusters/:cluster_id', forwardingConfig.getCluster)
  .post('/clusters', forwardingConfig.upsertCluster)
  .delete('/clusters/:cluster_id', forwardingConfig.deleteCluster)

  .get('/nodes/:node_id', forwardingConfig.getNode)
  .post('/nodes', forwardingConfig.upsertNode)
  .delete('/nodes/:node_id', forwardingConfig.deleteNode)

  .get('/sensors/:sensor_id', forwardingConfig.getSensor)
  .post('/sensors', forwardingConfig.upsertSensor)
  .delete('/sensors/:sensor_id', forwardingConfig.deleteSensor)

module.exports = router;