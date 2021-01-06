const dotenv = require("dotenv");

dotenv.config({
    path: `.env.${process.env.NODE_ENV ? process.env.NODE_ENV : "development"}`,
});

const config = {
    port: process.env.PORT,
    apiBase: process.env.API_BASE,
    cryptSalt: process.env.CRYPT_SALT,
    jwtSecret: process.env.JWT_SECRET,
    originWhitelist: process.env.ORIGIN_WHITELIST,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbDatabase: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    dbSchema: process.env.DB_SCHEMA,
    dbSearchPath: process.env.DB_SEARCH_PATH,
    dbLogging:
        process.env.DB_LOGGING && process.env.DB_LOGGING === "true"
            ? true
            : false,
};

module.exports = config;
