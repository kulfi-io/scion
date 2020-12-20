"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("ResourceRoles", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            roleId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Roles",
                    key: "id",
                },
            },
            resourceId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Resources",
                    key: "id",
                },
            },
            permissionId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Permissions",
                    key: "id",
                },
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
                    model: "Users",
                    key: "id",
                },
            },
            updatedById: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("NOW"),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("NOW"),
            }
        });

    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("ResourceRoles");
    },
};
