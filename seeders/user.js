'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Users', [
      {
        username: 'matzy',
        password: 'beth',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'kanBan',
        password: 'banKan',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.bulkDelete('Users', null, {});

  }
};
