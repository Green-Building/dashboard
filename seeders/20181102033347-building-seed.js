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
        address: '1 Washington Sq', // SJSU
        city: 'San Jose',
        state: 'CA',
        zipcode: 95192,
        longitude: -121.88107150000002,
        latitude: 37.3351874,
        num_of_floors:7,
      },
      {
        address: '500 El Camino Real', // SCU
        city: 'Santa Clara',
        state: 'CA',
        zipcode: 95053,
        longitude: -121.9389875,
        latitude: 37.34964180000001,
        num_of_floors:3,
      },
      {
        address: '450 Serra Mall', // Stanford
        city: 'Stanford',
        state: 'CA',
        zipcode: 94305,
        longitude: -122.16971899999999,
        latitude: 37.4274745,
        num_of_floors:4,
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
