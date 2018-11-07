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
    return queryInterface.bulkInsert('room', [
      {
        room_number: '202',
        building_id:1,
        floor_id: 1,
      },
      {
        room_number: '291',
        building_id:1,
        floor_id: 1,
      },
      {
        room_number: '705',
        building_id:1,
        floor_id: 3,
      },
      {
        room_number: '30A',
        building_id:2,
        floor_id: 4,
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
    return queryInterface.bulkDelete('room', null, {});
  }
};
