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
  .post('/clusters', forwardingConfig.addCluster)
  .put('/clusters/:clsuter_id', forwardingConfig.updateCluster)
  .delete('/clusters/:cluster_id', forwardingConfig.deleteCluster)

  .get('/nodes/:node_id', forwardingConfig.getNode)
  .post('/nodes', forwardingConfig.addNode)
  .put('/nodes/:node_id', forwardingConfig.updateNode)
  .delete('/nodes/:node_id', forwardingConfig.deleteNode)

  .get('/sensors/:sensor_id', forwardingConfig.getSensor)
  .post('/sensors', forwardingConfig.addSensor)
  .put('/sensors/:sensor_id', forwardingConfig.updateSensor)
  .delete('/sensors/:sensor_id', forwardingConfig.deleteSensor)

  .post('/sensor_data', forwardingConfig.bulkInsertSensorData)
  .delete('/sensor_data/:id', forwardingConfig.deleteSensorData)
  .get('/sensor_data/sensor/:sensor_id', forwardingConfig.searchSensorData)
  .get('/sensor_data/cluster/:cluster_id', forwardingConfig.searchSensorDataByCluster)
  .get('/sensor_data/node/:node_id', forwardingConfig.searchSensorDataByNode)

module.exports = router;