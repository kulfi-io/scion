const dotenv = require("dotenv");

dotenv.config({
    path: `.env.${process.env.NODE_ENV ? process.env.NODE_ENV : "development"}`,
});

module.exports = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    schema: process.env.DB_SCHEMA,
    searchPath: process.env.DB_SEARCH_PATH,
    dialectOptions: process.env.DB_DIALECT_OPTION,
    dialect: process.env.DB_DIALECT,
};
