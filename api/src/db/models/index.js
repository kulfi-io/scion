import Permission from "./permission";
import ResourceRole from "./resource-role";
import Resource from "./resource";
import Role from "./role";
import UserRole from "./user-role";
import User from "./user";

import Sequelize from "sequelize";
import Config from "../config/config.json";

const env = process.env.NODE_ENV || "development";
const config = Config[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

const models = {
    User: User(sequelize, Sequelize),
    Role: Role(sequelize, Sequelize),
    UserRole: UserRole(sequelize, Sequelize),
    Resource: Resource(sequelize, Sequelize),
    ResourceRole: ResourceRole(sequelize, Sequelize),
    Permission: Permission(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
    if ("associate" in models[key]) {
        models[key].associate(models);
    }
});

db.conn = sequelize;
db.ORM = Sequelize;

export default db;
