// Require dependencies
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const Schema = mongoose.Schema;

// Define Article schema
const SensorDataSchema = new Schema({
  sensorID: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  data: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  clusterID: {
    type: String,
    required: true,
  },
  roomID: {
    type: String,
    required: true,
  },
  floor: {
    type: String,
    required: true,
  },
  buildingID: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  }
});

 // Export the model
module.exports = {
  SensorData1: mongoose.model('SensorData', SensorDataSchema),
  SensorData2: mongoose.model('SensorDataTwo', SensorDataSchema),
}