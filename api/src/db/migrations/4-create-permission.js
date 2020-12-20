"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Permissions", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
                unoque: true,
                allowNull: false,
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            createdById: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                  model: 'Users',
                  key: 'id'
                }
            },
            updatedById: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                  model: 'Users',
                  key: 'id'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW')
            },
        });

    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Permissions");
    },
};
