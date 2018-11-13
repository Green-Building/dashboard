const _ = require('lodash');
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

const upsertSensor = (req, res) => {
  const sensorToUpsert = req.body;
  if(sensorToUpsert.id) {
    //update
    return updateSensor(sensorToUpsert);
  } else {
    //insert
    return addSensor(sensorToUpsert);
  }
}

const addSensor = newSensor => {
  return db.sensor.create(newSensor)
  .then(response => {
    console.log("response creating a new sensor is >>>", response);
    res.json(response);
  })
  .catch(err => {
    console.log("error creating a new sensor>>", err);
  })
}

const updateSensor = updatedSensor => {
  const { id: sensor_id } = updatedSensor;
  const updatedSensor = req.body;

  return db.sensor.update(_.omit(updatedSensor, 'id'),{
    returning: true,
    plain: true,
    where: {id: sensor_id}
  })
  .then(response => {
    return db.sensor.findOne({
      where: {
        id: sensor_id,
      }
    })
  })
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    console.log("err updating sensor is >>>", err);
  })
}

const deleteSensor = (req, res) => {
  const { sensor_id } = req.params;
  return db.sensor.destroy({
    where: {id: sensor_id}
  })
  .then((response) => {
    console.log("deleting sensor response is>>>", response);
    res.json(response);
  })
  .catch(err => {
    console.log("err deleting sensor is >>>", err);
  })
}

module.exports = {
  getSensor,
  addSensor,
  updateSensor,
  deleteSensor,
  upsertSensor,
}