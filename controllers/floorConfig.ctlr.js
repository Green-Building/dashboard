const db = require('../models');
const _ = require('lodash');
const { generateNest } = require('../utils');

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
  const { fetch_nested } = req.query;
  let queryObj = {
    where: {
      floor_id: floor_id,
    },
  };
  if(fetch_nested) {
    queryObj.include = generateNest('cluster', fetch_nested, db);
    console.log("nesting 0 is>>>", queryObj.include[0]);
    console.log("nesting 1 is>>>", queryObj.include[1]);
  }
  return db.cluster.findOne(queryObj)
  .then(cluster => {
    console.log("cluster is >>>", cluster);
    res.json(cluster);
  })
  .catch(err => {
    console.log("err fetching cluster from floor>>>", err);
  })
}

const getFloorStats = (req, res) => {
  const { floor_id: floorId } = req.params;
  return db.sequelize.query(`
  SELECT count(DISTINCT sensor.id) as sensor_count,
  count(DISTINCT sensor.node_id) as node_count,
  count(DISTINCT node.cluster_id) as cluster_count
  FROM sensor
  INNER JOIN node ON sensor.node_id = node.id
  INNER JOIN cluster ON node.cluster_id = cluster.id
  INNER JOIN floor ON cluster.floor_id = :floorId;`,
    { replacements: { floorId: +floorId }, type: db.sequelize.QueryTypes.SELECT }
  )
  .then(results => {
    res.json(results[0]);
  })
  .catch(err => {
    console.log("err getting floor Stats");
  })
}

module.exports = {
  addFloor,
  getClusterFromFloor,
  getFloorStats,
}