'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('building', {
      id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      address: {
        type: Sequelize.STRING
      },
      num_of_floors: {
        type: Sequelize.INT,
        allowNull:false,
        defaultValue: 1,
      }
      latitude: {
        type: Sequelize.DOUBLE,
      },
      longitude: {
        type: Sequelize.DOUBLE,
      },
    },{timestamps: false});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('building');
  }
};