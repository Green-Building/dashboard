'use strict';
module.exports = function(sequelize, DataTypes) {
  var Building = sequelize.define('building', {
    id: {
      allowNull: false,
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    address: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.DOUBLE,
    },
    longitude: {
      type: DataTypes.DOUBLE,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'building',
    classMethods: {
      associate: function(models) {
        Building.hasMany(models.cluster, {
          foreignKey: 'building_id',
        });
      },
    },
  });
  return Building;
};