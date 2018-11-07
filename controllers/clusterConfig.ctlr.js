const db = require('../models');
const _ = require('lodash');

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
  const floor_number = req.query.floor_number;
  const building_id = +req.query.building_id;
  return db.floor.findOne({
    floor: floor_number,
    building_id: building_id,
  })
  .then(floor => {
    if (!floor) {
      throw new Error(`floor not found`);
    }
    console.log("floor is >>>", floor);

    return db.cluster.findOne({
      where: {
        floor_id: floor.get('id'),
        building_id: building_id,
      },
      include : [{
        model: db.node,
      }],
    })
    .then(cluster => {
      let room_ids  = _.reduce(cluster.nodes, (result, node, key) => {
        result.push(node.room_id);
        return result;
      }, []);
      return db.room.findAll({
        where: {
          id: {
            in: room_ids,
          },
        },
        raw: true,
      })
      .then(rooms => {
        console.log("rooms is>>>", rooms);
        cluster = JSON.parse(JSON.stringify(cluster));
        console.log('cluster is...', cluster);
        _.forEach(cluster.nodes, node => {
          node.room_name = _.find(rooms, {id: node.room_id}).room_number;
          console.log("_.find(rooms, {id: node.room_id}).name>>>", _.find(rooms, {id: node.room_id}).room_number)
        });
        return cluster;
      })
    })
  })
  .then(cluster => {
    //console.log("cluster is>>>", cluster);
    res.json(cluster);
  })
  .catch(err => {
    console.log("err fetching cluster from floor>>>", err);
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
  getClusterFromFloor,
  addCluster,
  updateCluster,
  deleteCluster,
}
