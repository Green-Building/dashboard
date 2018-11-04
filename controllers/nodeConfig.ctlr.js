const db = require('../models');

const getNode = (req, res) => {
  const node_id = req.params.node_id;
  return db.node.findOne({
    where: {
      id: node_id
    },
    include: [ {model: db.cluster, as: 'cluster'} ]
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
  const newNode = req.body.data;
  return db.node.create(newNode)
  .then(response =>{
    console.log("response creating a new Node is >>>", response);
    res.json(response);
  })
  .catch(err => {
    console.log("error creating a new node>>", err);
  })
}

module.exports = {
  getNode,
  addNode,
}