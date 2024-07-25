const { Sequelize } = require('sequelize');

const { DataTypes } = Sequelize;
// const Schemas = require('./schema');
const sipenjaruDB = require('../config');

// const Models = new Schemas(sipenjaruDB, DataTypes, Sequelize);

class Schemas {
  static roles = sipenjaruDB.define('roles', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
  });

  static users = sipenjaruDB.define('users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    roleLevel: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'user',
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true,

    },
  });
}

Schemas.roles.hasMany(Schemas.users);
Schemas.users.belongsTo(Schemas.roles);

(async () => {
  sipenjaruDB.sync();
  setTimeout(() => {
    Schemas.roles.findOrCreate({
      where: {
        level: 'admin',
      },
      defaults: {
        level: 'admin',
      },
    });
    Schemas.roles.findOrCreate({
      where: {
        level: 'user',
      },
      defaults: {
        level: 'user',
      },
    });
  }, 5000);
})();

module.exports = Schemas;
