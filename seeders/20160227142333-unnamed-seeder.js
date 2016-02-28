'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Cards', [
      {
        person: "Gail",
        title: "Initial Commit",
        descrip: "Setup Express, Database, and routes",
        currentStatus: "Pending",
        completionDueDate: new Date(),
        lastUpdated: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
},

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cards', null, {});
  }
};
