const db = require('../models');
const _ = require('lodash');

const addFloor = (req, res) => {
  console.log("request.body is>>>", req.body);
  const newFloor = req.body;

  return db.floor.create(newFloor)
  .then(response => {
    console.log("created new Floor>>>", response);
    res.json(response);
  })
  .catch(err => {
    console.log("error inserting building>>>", err);
  })

}

module.exports = {
  addFloor,
}