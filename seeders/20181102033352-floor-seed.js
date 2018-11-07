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
    return queryInterface.bulkInsert('floor', [
      {
        building_id: 1,
        floor_number: 2,
      },
      {
        building_id: 1,
        floor_number: 3,
      },
      {
        building_id: 1,
        floor_number: 7,
      },
      {
        building_id: 2,
        floor_number: 3,
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
    return queryInterface.bulkDelete('floor', null, {});
  }
};
