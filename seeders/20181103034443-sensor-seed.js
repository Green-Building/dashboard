'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('sensor', [
      {
        name: "temperature sensor from node room 202 floor 2 SJSU",
        status: "active",
        type: "temperature",
        node_id: 1,
        cluster_id: 1,
      },
      {
        name: "motion sensor from node room 202 floor 2 SJSU",
        status: "active",
        type: "motion",
        node_id: 1,
        cluster_id: 1,
      },
      {
        name: "light sensor from node room 202 floor 2 SJSU",
        status: "maintenance",
        type: "light",
        node_id: 1,
        cluster_id: 1,
      },
      {
        name: "motion sensor from node room 291 floor 2 SJSU",
        status: "inactive",
        type: "motion",
        node_id: 2,
        cluster_id: 1,
      },
      {
        name: "light sensor from node room 291 floor 2 SJSU",
        status: "active",
        type: "light",
        node_id: 2,
        cluster_id: 1,
      },
      {
        name: "light sensor from node room 705 floor 7 SJSU",
        status: "active",
        type: "light",
        node_id: 3,
        cluster_id: 3,
      },
      {
        name: "temperature sensor from node room 705 floor 7 SJSU",
        status: "active",
        type: "temperature",
        node_id: 3,
        cluster_id: 3,
      },
      {
        name: "motion sensor from node room 30A floor 3 SCU",
        status: "active",
        type: "motion",
        node_id: 4,
        cluster_id: 4,
      },
      {
        name: "light sensor from node room 30A floor 3 SCU",
        status: "turn-on",
        type: "light",
        node_id: 4,
        cluster_id: 4,
      },
      {
        name: "temperature sensor from node room 30A floor 3 SCU",
        status: "active",
        type: "temperature",
        node_id: 4,
        cluster_id: 4,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
