"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ResourceRole extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ResourceRole.belongsTo(models.User, {
                as: "createdBy",
                foreignkey: "createdById",
            });
            ResourceRole.belongsTo(models.User, {
                as: "updatedBy",
                foreignkey: "updatedById",
            });
           
        }
    }
    ResourceRole.init(
        {
            roleId: DataTypes.INTEGER,
            resourceId: DataTypes.STRING,
            permissionId: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "ResourceRole",
        }
    );
    return ResourceRole;
};
