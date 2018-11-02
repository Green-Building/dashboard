const db = require('../models');

const getSensor = (req, res) => {
  const sensor_id= req.params.sensor_id;
  return db.sensor.findOne({
    where: {
      id: sensor_id
    },
    include: [ {model: db.node, as: 'node'} ]
  })
  .then(sensor => {
    res.json(sensor);
  })
  .catch(err => {
    console.log("err fetching building>>>", err);
  })
};

module.exports = {
  getSensor,
}