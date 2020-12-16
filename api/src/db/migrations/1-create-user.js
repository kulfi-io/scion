"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            firstName: {
                type: Sequelize.STRING(30),
                allowNull: false,
                trim: true,
            },
            lastName: {
                type: Sequelize.STRING(40),
                allowNull: false,
                trim: true
            },
            email: {
                type: Sequelize.STRING(60),
                unique: true,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(100),
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
        },{
            indexes: [
                {
                    unique: true,
                    fields: ["id"],
                },{
                    unique: true,
                    fields: ["email"]
                },
                {
                    unique: false,
                    fields: ["active"],
                },
            ],
        }
        );
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Users");
    },
};
