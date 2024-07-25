/* eslint-disable strict */
/* eslint-disable lines-around-directive */
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: 'VARCHAR',
        notNull: true,
      },
      address: {
        type: 'VARCHAR',
        notNull: true,
      },
      email: {
        type: 'VARCHAR',
        notNull: true,
      },
      phone: {
        type: 'VARCHAR',
        notNull: true,
      },
      password: {
        type: 'VARCHAR',
        notNull: true,
      },
      level: {
        type: 'VARCHAR',
        defaultValue: 'user',
        notNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
