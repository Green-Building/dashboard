const db = require('../models');
const _ = require('lodash');

const getCluster = (req, res) => {
  const cluster_id = req.params.cluster_id;
  return db.cluster.findOne({
    where: {
      id: cluster_id
    },
    include: [ {model: db.building} ]
  })
  .then(cluster => {
    res.json(cluster);
  })
  .catch(err => {
    console.log("err fetching cluster>>>", err);
  })
}

const addCluster = (req, res) => {
  console.log("req.body is>>>", req.body.data);
  const newCluster = req.body.data;
  console.log("newCluster is>>>", newCluster);
  return db.floor.findOne({
    where: {
      building_id: newCluster.building_id,
      floor_number: newCluster.floor_number,
    }
  })
  .then(floor => {
    if (!floor) {
      return db.floor.create({
        building_id: newCluster.building_id,
        floor_number: newCluster.floor_number,
      })
      .then(floor => {
        const floor_id = floor.get('id');
        return floor_id;
      });
    } else {
      return floor.get('id');
    }
  })
  .then(floor_id => {
    newCluster.floor_id = floor_id;
    return db.cluster.create(newCluster)
  })
  .then(response => {
    console.log("response creating a new cluster is >>>", response);
    res.json(response);
  })
  .catch(err => {
    console.log("error creating a new cluster>>", err);
  });
}

const updateCluster = (req, res) => {
  const { cluster_id } = req.params;
  const updatedCluster = req.body.data;
  console.log("cluster_id>>>", cluster_id);
  console.log("updatedCluster>>>", updatedCluster);

  return db.cluster.update(updatedCluster,{
    returning: true,
    plain: true,
    where: {id: cluster_id}
  })
  .then((response) => {
    console.log("updating cluster response is>>>", response);
    res.json(response[1]);
  })
  .catch(err => {
    console.log("err updating cluster is >>>", err);
  })
}

const deleteCluster = (req, res) => {
  const { cluster_id } = req.params;
  return db.cluster.destroy({
    where: {id: cluster_id}
  })
  .then((response) => {
    console.log("deleting cluster response is>>>", response);
    res.json(response);
  })
  .catch(err => {
    console.log("err deleting cluster is >>>", err);
  })
}

module.exports = {
  getCluster,
  addCluster,
  updateCluster,
  deleteCluster,
}
