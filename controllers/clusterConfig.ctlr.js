const db = require('../models');

const getCluster = (req, res) => {
  const cluster_id= req.params.cluster_id;
  return db.cluster.findOne({
    where: {
      id: cluster_id
    },
    include: [ {model: db.building, as: 'building'} ]
  })
  .then(cluster => {
    res.json(cluster);
  })
  .catch(err => {
    console.log("err fetching cluster>>>", err);
  })
}

const getClusterFromFloor = (req, res) => {
  console.log("req.query>>>", req.query);
  const floor_num = req.query.floor;
  const building_id = +req.query.building_id;
  return db.cluster.findOne({
    where: {
      floor: String(floor_num),
      building_id: building_id,
    },
    include : [ db.node ]
  })
  .then(cluster => {
    console.log("cluster is>>>", cluster);
    res.json(cluster);
  })
  .catch(err => {
    console.log("err fetching cluster from floor>>>", err);
  })
}

const addCluster = (req, res) => {
  console.log("req.body is>>>", req.body.data);
  const newCluster = req.body.data;
  return db.cluster.create(newCluster)
  .then(response =>{
    console.log("response creating a new cluster is >>>", response);
    res.json(response);
  })
  .catch(err => {
    console.log("error creating a new cluster>>", err);
  })
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

module.exports = {
  getCluster,
  getClusterFromFloor,
  addCluster,
  updateCluster,
}
