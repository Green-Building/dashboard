const router = require('express').Router();
const forwardingConfig = require('../controllers/forwarding.ctlr');

router
  .get('/buildings/statistics/:building_id', forwardingConfig.getBuildingStats)
  .get('/buildings/search/location', forwardingConfig.searchBuildingByCity)
  .get('/buildings/search/geocode', forwardingConfig.searchBuildingByLatLng)
  .get('/buildings/:building_id', forwardingConfig.getBuilding)

module.exports = router;