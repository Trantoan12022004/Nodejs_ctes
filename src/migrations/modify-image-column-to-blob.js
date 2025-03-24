'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'image', {
      type: Sequelize.MEDIUMTEXT,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'image', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
