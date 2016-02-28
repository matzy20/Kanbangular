'use strict';
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define('Card', {
    person: DataTypes.STRING,
    title: DataTypes.STRING,
    descrip: DataTypes.TEXT,
    currentStatus: DataTypes.STRING,
    completionDueDate: DataTypes.DATE,
    lastUpdated: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Card;
};