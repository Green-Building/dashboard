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
    return queryInterface.bulkInsert('building', [
      {
        address: '1 Washington Sq, San Jose, CA 95192', // SJSU
        longitude: -121.88107150000002,
        latitude: 37.3351874,
      },
      {
        address: '500 El Camino Real, Santa Clara, CA 95053', // SCU
        longitude: -121.9389875,
        latitude: 37.34964180000001,
      },
      {
        address: '450 Serra Mall, Stanford, CA 94305', // Stanford
        longitude: -122.16971899999999,
        latitude: 37.4274745,
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
    return queryInterface.bulkDelete('building', null, {});
  }
};
