"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Resource extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Resource.belongsTo(models.User, {
                as: "createdBy",
                foreignkey: "createdById",
                foreignKeyConstraint: true,
            });
            Resource.belongsTo(models.User, {
                as: "updatedBy",
                foreignkey: "updatedById",
                foreignKeyConstraint: true,
            });
            Resource.belongsToMany(models.Role, {
                through: models.ResourceRole,
                foreignKey: "resourceId",
            });
            Resource.belongsToMany(models.Permission, {
                through: models.ResourceRole,
                foreignKey: "resourceId",
                foreignKeyConstraint: true,
            });
        }
    }
    Resource.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Resource",
        }
    );
    return Resource;
};
