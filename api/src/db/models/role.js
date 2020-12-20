import { Model } from "sequelize";
const role = (sequelize, DataTypes) => {
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
                foreignKeyConstraint: true,
            });
            Role.belongsTo(models.User, {
                as: "updatedBy",
                foreignKey: "updatedById",
                foreignKeyConstraint: true,
            });
            Role.belongsToMany(models.User, {
                through: models.UserRole,
                foreignKey: "roleId",
                foreignKeyConstraint: true,
            });
            Role.belongsToMany(models.Resource, {
                through: models.ResourceRole,
                foreignKey: "roleId",
            });
            Role.belongsToMany(models.Permission, {
                through: models.ResourceRole,
                foreignKey: "roleId",
                foreignKeyConstraint: true,
            });
        }
    }
    Role.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
            createdById: DataTypes.INTEGER,
            updatedById: DataTypes.INTEGER,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Role",
        }
    );
    return Role;
};

export default role;
