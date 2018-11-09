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

const getClusterFromFloor = (req, res) => {
  console.log("req.params>>>", req.params);
  const floor_id = +req.params.floor_id;
  return db.cluster.findOne({
    where: {
      floor_id: floor_id,
    },
    include : [{
      model: db.node,
    }, {
      model: db.floor,
      include: [{
        model: db.room,
      }]
    }],
  })
  .then(cluster => {
    console.log("cluster is >>>", cluster);
    res.json(cluster);
  })
  .catch(err => {
    console.log("err fetching cluster from floor>>>", err);
  })
}

module.exports = {
  addFloor,
  getClusterFromFloor,
}