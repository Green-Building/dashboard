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
    console.log("err fetching building>>>", err);
  })
}

module.exports = {
  getCluster,
}
