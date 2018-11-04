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

const addSensor = (req, res) => {
  console.log("req.body is>>>", req.body.data);
  const newSensor = req.body.data;
  return db.sensor.create(newSensor)
  .then(response =>{
    console.log("response creating a new sensor is >>>", response);
    res.json(response);
  })
  .catch(err => {
    console.log("error creating a new sensor>>", err);
  })
}

module.exports = {
  getSensor,
  addSensor,
}