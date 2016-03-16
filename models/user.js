// 'use strict';
// module.exports = function(sequelize, DataTypes) {
//   var User = sequelize.define('User', {
//     username: DataTypes.STRING,
//     password: DataTypes.STRING
//   }, {
//     classMethods: {
//       associate: function(models) {
//         // associations can be defined here
//       }
//     }
//   });
//   return User;
// };


'use strict';
var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      validate: {
        isAlphanumeric: true
      },
      type: DataTypes.STRING
    },
    password: DataTypes.STRING
  }, {
    setterMethods: {
      password: function (password) {
        var hashed = hashPassword(password);
        this.setDataValue('password', hashed);
      }
    },
    classMethods: {
      hashPassword: hashPassword,
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};

function hashPassword (password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}