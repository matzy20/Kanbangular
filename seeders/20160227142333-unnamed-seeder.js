'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Cards', [
      {
        title: 'Initial Setup',
        priority: 'High',
        status: 'Queue',
        createdBy: 'Gail',
        assignedTo: 'Dave',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Routing',
        priority: 'Medium',
        status: 'In Progress',
        createdBy: 'Dave',
        assignedTo: 'Joe',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Create Tests',
        priority: 'Medium',
        status: 'In Progress',
        createdBy: 'Joe',
        assignedTo: 'Zaran',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
},

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cards', null, {});
  }
};
