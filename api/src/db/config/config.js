const dotenv = require("dotenv");
dotenv.config({
    path: `.env.${process.env.NODE_ENV ? process.env.NODE_ENV : "development"}`,
});

const config = {
    dialect: "postgres",
    dialectOptions: {
        prependSearchPath: true,
    },
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    schema: process.env.DB_SCHEMA,
    searchPath: process.env.DB_SEARCH_PATH,
    logging: process.env.DB_LOGGING === "true" ? true : false,
};

module.exports = config;
