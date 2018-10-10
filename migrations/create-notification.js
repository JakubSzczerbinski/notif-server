'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
			title: {
        type: Sequelize.STRING
      },
      subtitle: {
        type: Sequelize.STRING
      },
      valid: {
        type: Sequelize.BOOLEAN
      },
      source: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.TEXT
      },
      createdAt:{
      	type: Sequelize.DATE
      },
      updatedAt:{
      	type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Notifications');
  }
};
