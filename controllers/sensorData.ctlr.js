const SensorDataModel = require('../mongoModels/SensorData');

const insertSensorData = (req, res) => {
  const sensorData = req.body.data;

  console.log("sensorData is >>>", sensorData);
  return SensorDataModel.create(sensorData)
  .then(response => {
    console.log("insert sensor data successful>>", response);
    res.json(response);
  })
  .catch(err => {
    console.log("error inserting sensor data >>>", err);
  });
};

const bulkInsertSensorData = (req, res) => {
  const sensorData = req.body.data;

  console.log("sensorData is >>>", sensorData);
  return SensorDataModel.collection.insert(sensorData)
  .then(response => {
    console.log("bulk insert sensor data successful>>", response);
    res.json(response);
  })
  .catch(err => {
    console.log("error bulk inserting sensor data >>>", err);
  });
};

module.exports = {
  insertSensorData,
  bulkInsertSensorData,
}