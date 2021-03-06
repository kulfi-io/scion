"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Resources", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
                trim: true,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            createdById: {
                type: Sequelize.INTEGER,
                references: {
                  model: 'Users',
                  key: 'id'
                }
            },
            updatedById: {
                type: Sequelize.INTEGER,
                references: {
                  model: 'Users',
                  key: 'id'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            },
        });

    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Resources");
    },
};
