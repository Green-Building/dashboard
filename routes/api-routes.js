const router = require('express').Router();
const sensorConfig = require('../controllers/sensorConfig.ctlr');

router
  .get('/sensors/:sensor_id', sensorConfig.getSensor);

module.exports = router;