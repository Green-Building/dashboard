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

const upsertCluster = (req, res) => {
  const clusterToUpsert = req.body;
  if (clusterToUpsert.id) {
    // update
    return updateCluster(clusterToUpsert)
    .then(cluster => {
      res.json(cluster);
    })
  } else {
    // add
    return addCluster(clusterToUpsert)
    .then(cluster => {
      res.json(cluster);
    })
  }
}
const addCluster = newCluster => {
  return db.floor.findOne({
    where: {
      building_id: newCluster.building_id,
      id: newCluster.floor_id,
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
  .catch(err => {
    console.log("error creating a new cluster>>", err);
  });
}

const updateCluster = updatedCluster => {
  const { id: cluster_id } = updatedCluster;
  return db.cluster.update(_.omit(updatedCluster, 'id'),{
    returning: true,
    plain: true,
    where: {id: cluster_id}
  })
  .then(response => {
    return db.cluster.findOne({
      where: {
        id: cluster_id,
      }
    })
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
  upsertCluster,
}
