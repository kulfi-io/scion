import { Model } from "sequelize";
const userRole = (sequelize, DataTypes) => {
    class UserRole extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            UserRole.belongsTo(models.User, {
                as: "createdBy",
                foreignKey: "createdById",
                foreignKeyConstraint: true,
            });
            UserRole.belongsTo(models.User, {
                as: "updatedBy",
                foreignKey: "updatedById",
                foreignKeyConstraint: true,
            });
        }
    }
    UserRole.init(
        {
            userId: DataTypes.INTEGER,
            roleId: DataTypes.INTEGER,
            isDefault: DataTypes.BOOLEAN,
            active: DataTypes.BOOLEAN,
            createdById: DataTypes.INTEGER,
            updatedById: DataTypes.INTEGER,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "UserRole",
        }
    );
    return UserRole;
};

export default userRole;
