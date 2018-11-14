const db = require('../models');
const _ = require('lodash');

const addRoom = (req, res) => {
  console.log("request.body is>>>", req.body);
  const newRoom = req.body;
  console.log("newRoom is>>>", newRoom);

  return db.room.create(newRoom)
  .then(response => {
    console.log("created new Room>>>", response);
    res.json(response);
  })
  .catch(err => {
    console.log("error inserting room>>>", err);
  });
}

const getRoomStats = (req, res) => {
  const { room_id: roomId } = req.params;
  return db.sequelize.query(`
  SELECT count(DISTINCT sensor.id) as sensor_count,
  count(DISTINCT sensor.node_id) as node_count
  FROM sensor
  INNER JOIN node ON sensor.node_id = node.id
  INNER JOIN room ON node.room_id = :roomId;`,
    { replacements: { roomId: +roomId }, type: db.sequelize.QueryTypes.SELECT }
  )
  .then(results => {
    res.json(results[0]);
  })
  .catch(err => {
    console.log("err getting room Stats");
  })
}

module.exports = {
  addRoom,
  getRoomStats,
}