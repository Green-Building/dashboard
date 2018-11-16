const router = require('express').Router();
const forwardingConfig = require('../controllers/forwarding.ctlr');

router
  .get('/buildings/:building_id', forwardingConfig.getBuilding)

module.exports = router;