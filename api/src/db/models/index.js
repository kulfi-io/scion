import Permission from "./permission";
import ResourceRole from "./resource-role";
import Resource from "./resource";
import Role from "./role";
import UserRole from "./user-role";
import User from "./user";
import dotenv from "dotenv";
import Sequelize from "sequelize";
import Config from "../config/config";

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

const db = {};

const sequelize = new Sequelize(
    Config.database,
    Config.username,
    Config.password,
    Config
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
