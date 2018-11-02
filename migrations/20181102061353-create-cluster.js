'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cluster', {
      id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      floor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      building_id: {
        type: Sequelize.BIGINT,
        references: {
            model: 'building',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cluster');
  }
};