'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Cards', [
      {
        Person: "Gail",
        ProjTitle: "Initial Commit",
        ProjDescrip: "Setup Express, Database, and routes",
        CurrentStatus: "Pending",
        CompletionDueDate: 'Sat Feb 27 2016',
        LastUpdated: new Date(),
      }
    ], {});
},

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cards', null, {});
  }
};
