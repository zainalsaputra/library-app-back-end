// class Schemas {
//   constructor(database, datatypes, sequelize) {
//     this._database = database;
//     this._datatypes = datatypes;
//     this._sequelize = sequelize;
//   }

//   async roles() {
//     const response = await this._database.define('roles', {
//       id: {
//         type: this._datatypes.UUID,
//         defaultValue: this._sequelize.UUIDV4,
//         allowNull: false,
//       },
//       level: {
//         type: this._datatypes.STRING,
//         unique: true,
//         allowNull: false,
//         primaryKey: true,
//       },
//     });
//     return response;
//   }

//   async users() {
//     const response = await this._database.define('users', {
//       id: {
//         type: this._datatypes.UUID,
//         defaultValue: this._sequelize.UUIDV4,
//         primaryKey: true,
//         allowNull: false,
//       },
//       username: {
//         type: this._datatypes.STRING,
//         unique: true,
//         allowNull: false,
//       },
//       email: {
//         type: this._datatypes.STRING,
//         unique: true,
//         allowNull: false,
//       },
//       password: {
//         type: this._datatypes.STRING,
//         unique: false,
//         allowNull: false,
//       },
//       roleLevel: {
//         type: this._datatypes.STRING,
//         allowNull: false,
//       },
//     });
//     return response;
//   }
// }

// module.exports = Schemas;
