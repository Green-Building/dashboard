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