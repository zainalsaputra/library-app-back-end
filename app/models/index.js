const { Sequelize } = require('sequelize');

const { DataTypes } = Sequelize;
// const Schemas = require('./schema');
const libraryDB = require('../config');

// const Models = new Schemas(libraryDB, DataTypes, Sequelize);

class Schemas {
  static roles = libraryDB.define('roles', {
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

  static users = libraryDB.define('users', {
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
      unique: false,
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
    // bookId: {
    //   type: DataTypes.UUID,
    //   allowNull: true,
    // },
  });

  static books = libraryDB.define('books', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1',
    },
    // userId: {
    //   type: DataTypes.UUID,
    //   allowNull: true,
    // },
  });

  static rentalLogs = libraryDB.define('rentalLogs', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    rentalDate: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    returnDate: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    // userId: {
    //   type: DataTypes.UUID,
    //   allowNull: true,
    // },
    bookId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
}

Schemas.roles.hasMany(Schemas.users);
Schemas.users.belongsTo(Schemas.roles);
// Schemas.books.belongsTo(Schemas.users);
// Schemas.users.belongsToMany(Schemas.books, { through: 'rentalLogs' });
// Schemas.books.belongsToMany(Schemas.users, { through: 'rentalLogs' });

Schemas.books.hasMany(Schemas.rentalLogs);
Schemas.rentalLogs.belongsTo(Schemas.books, { foreignKey: 'bookId' });

(async () => {
  libraryDB.sync();
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
