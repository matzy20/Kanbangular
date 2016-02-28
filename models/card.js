'use strict';
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define('Card', {
    Person: DataTypes.STRING,
    ProjTitle: DataTypes.STRING,
    ProjDescrip: DataTypes.TEXT,
    CurrentStatus: DataTypes.STRING,
    CompletionDueDate: DataTypes.DATE,
    LastUpdated: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Card;
};