"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Permission extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Permission.belongsTo(models.User, {
                as: "createdBy",
                foreignkey: "createdById",
                foreignKeyConstraint: true,
            });
            Permission.belongsTo(models.User, {
                as: "updatedBy",
                foreignkey: "updatedById",
                foreignKeyConstraint: true,
            });
            Permission.belongsToMany(models.Role, {
                through: models.ResourceRole,
                foreignKey: "permissionId",
                foreignKeyConstraint: true,
            });
            Permission.belongsToMany(models.Resource, {
                through: models.ResourceRole,
                foreignKey: "permissionId",
                foreignKeyConstraint: true,
            });
        }
    }
    Permission.init(
        {
            name: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Permission",
        }
    );
    return Permission;
};
