const _ = require('lodash');
const db = require('../models');

const getNode = (req, res) => {
  const node_id = req.params.node_id;
  return db.node.findOne({
    where: {
      id: node_id
    },
    include: [
      db.cluster,
      db.sensor,
    ]
  })
  .then(node => {
    res.json(node);
  })
  .catch(err => {
    console.log("err fetching building>>>", err);
  })
};

const upsertNode = (req, res) => {
  const nodeToUpsert = req.body;
  if(nodeToUpsert.id) {
    // upate
    return updateNode(nodeToUpsert);
  } else {
    //insert
    return addNode(nodeToUpsert);
  }
}

const addNode = newNode => {
  return db.node.create(newNode)
  .then(response =>{
    console.log("response creating a new Node is >>>", response);
    res.json(response);
  })
  .catch(err => {
    console.log("error creating a new node>>", err);
  })
}

const updateNode = updatedNode => {
  const { id: node_id } = updatedNode;

  return db.node.update(_.omit(updatedNode, 'id'),{
    returning: true,
    plain: true,
    where: {id: node_id}
  })
  .then(response => {
    return db.node.findOne({
      where: {
        id: node_id,
      }
    });
  })
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    console.log("err updating node is >>>", err);
  })
}

const deleteNode = (req, res) => {
  const { node_id } = req.params;
  return db.node.destroy({
    where: {id: node_id}
  })
  .then((response) => {
    console.log("deleting node response is>>>", response);
    res.json(response);
  })
  .catch(err => {
    console.log("err deleting node is >>>", err);
  })
}

module.exports = {
  getNode,
  addNode,
  updateNode,
  deleteNode,
  upsertNode,
}