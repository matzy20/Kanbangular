'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Person: {
        type: Sequelize.STRING
      },
      ProjTitle: {
        type: Sequelize.STRING
      },
      ProjDescrip: {
        type: Sequelize.TEXT
      },
      CurrentStatus: {
        type: Sequelize.STRING
      },
      CompletionDueDate: {
        type: Sequelize.DATE
      },
      LastUpdated: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('cards');
  }
};