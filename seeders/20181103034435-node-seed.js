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
    return queryInterface.bulkInsert('node', [
      {
        name: "node room 202 floor 2 SJSU",
        room: "202",
        status: "active",
        cluster_id: 1,
      },
      {
        name: "node room 291 floor 2 SJSU",
        room: "291",
        status: "active",
        cluster_id: 1,
      },
      {
        name: "node room 705 floor 7 SJSU",
        room: "705",
        status: "active",
        cluster_id: 3,
      },
      {
        name: "node room 30A floor 3 SCU",
        room: "30A",
        status: "active",
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
    return queryInterface.bulkDelete('node', null, {});
  }
};
