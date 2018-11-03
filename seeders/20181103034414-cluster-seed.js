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
    return queryInterface.bulkInsert('cluster', [
      {
        floor: 2,
        name: "cluster floor 2 SJSU",
        status: "active",
        building_id: 1,
      },
      {
        floor: 3,
        name: "cluster floor 3 SJSU",
        status: "inactive",
        building_id: 1,
      },
      {
        floor: 7,
        name: "cluster floor 7 SJSU",
        status: "active",
        building_id: 1,
      },
      {
        floor: 3,
        name: "cluster floor 2 SCU",
        status: "active",
        building_id: 2,
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
    return queryInterface.bulkDelete('cluster', null, {});
  }
};
