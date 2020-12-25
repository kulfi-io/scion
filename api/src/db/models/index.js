import Permission from "./permission";
import ResourceRole from "./resource-role";
import Resource from "./resource";
import Role from "./role";
import UserRole from "./user-role";
import User from "./user";
import Sequelize from "sequelize";
import config from "../config/config";

const db = {};

let sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

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

export default db;
