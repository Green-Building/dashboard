const db = require('../models');
const _ = require('lodash');

const addRoom = (req, res) => {
  console.log("request.body is>>>", req.body);
  const newRoom = req.body;
  console.log("newRoom is>>>", newRoom);

  return db.room.create(newRoom)
  .then(response => {
    console.log("created new Room>>>", response);
    res.json(response);
  })
  .catch(err => {
    console.log("error inserting room>>>", err);
  });
}

module.exports = {
  addRoom,
}