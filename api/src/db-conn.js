import Sequelize from "sequelize";
import dotenv from 'dotenv';

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
});

export const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    pool: {
        max: 5,
        min: 0,
        idle: 1000
    },
    logging: false
});

connection.authenticate().then(() => {
    console.log(`Connection has been established successfully to ${process.env.DB_NAME}`);
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});

