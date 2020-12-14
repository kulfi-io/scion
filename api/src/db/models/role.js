"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Role.belongsTo(models.User, {
                as: "createdBy",
                foreignKey: "createdById",
            });
            Role.belongsTo(models.User, {
                as: "updatedBy",
                foreignKey: "updatedById",
            });
            Role.belongsToMany(models.User, {
                through: models.UserRole,
                foreignKey: 'roleId'
            });
            Role.belongsToMany(models.Resource, {
                through: models.ResourceRole,
                foreignKey: 'roleId'
            });
        }
    }
    Role.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Role",
        }
    );
    return Role;
};
