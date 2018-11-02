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

module.exports = {
  getNode,
}