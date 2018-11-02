const db = require('../models');

const getBuilding = (req, res) => {
  const building_id = req.params.building_id;
  return db.building.findOne({
    where: {
      id: building_id
    },
  })
  .then(building => {
    res.json(building);
  })
  .catch(err => {
    console.log("err fetching building>>>", err);
  })
};

module.exports = {
  getBuilding,
}