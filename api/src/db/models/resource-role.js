import { Model } from "sequelize";

const resourceRole = (sequelize, DataTypes) => {
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
                foreignKeyConstraint: true,
            });
            ResourceRole.belongsTo(models.User, {
                as: "updatedBy",
                foreignkey: "updatedById",
                foreignKeyConstraint: true,
            });
        }
    }
    ResourceRole.init(
        {
            roleId: DataTypes.INTEGER,
            resourceId: DataTypes.STRING,
            permissionId: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
            createdById: DataTypes.INTEGER,
            updatedById: DataTypes.INTEGER,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "ResourceRole",
        }
    );
    return ResourceRole;
};

export default resourceRole;
