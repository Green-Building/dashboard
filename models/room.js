module.exports = function(sequelize, DataTypes) {
  var Room = sequelize.define('room', {
    id: {
      allowNull: false,
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    room_number: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'room',
    classMethods: {
      associate: function(models) {
        Room.belongsTo(models.building, {
          foreignKey: 'building_id',
          allowNull: false,
        });
        Room.belongsTo(models.floor, {
          foreignKey: 'floor_id',
          allowNull: false,
        });
      },
    },
  });
  return Room;
};