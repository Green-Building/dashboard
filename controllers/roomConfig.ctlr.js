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
  count(DISTINCT node.id) as node_count
  FROM room
  LEFT JOIN node ON room.id = node.room_id
  LEFT JOIN sensor ON node.id = sensor.node_id
  WHERE room.id = :roomId;`,
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