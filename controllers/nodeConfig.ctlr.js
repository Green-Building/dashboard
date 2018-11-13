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

const addNode = (req, res) => {
  console.log("req.body is>>>", req.body.data);
  const newNode = req.body;
  return db.node.create(newNode)
  .then(response =>{
    console.log("response creating a new Node is >>>", response);
    res.json(response);
  })
  .catch(err => {
    console.log("error creating a new node>>", err);
  })
}

const updateNode = (req, res) => {
  const { node_id } = req.params;
  const updatedNode = req.body;

  return db.node.update(updatedNode,{
    returning: true,
    plain: true,
    where: {id: node_id}
  })
  .then((response) => {
    console.log("updating node response is>>>", response);
    res.json(response[1]);
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
}