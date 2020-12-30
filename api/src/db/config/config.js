const env = require("../../../env.config");

module.exports = {
    dialect: "postgres",
    dialectOptions: {
        prependSearchPath: true,
    },
    username: env.dbUsername,
    password: env.dbPassword,
    database: env.dbDatabase,
    host: env.dbHost,
    schema: env.dbSchema,
    searchPath: env.dbSearchPath,
    logging: env.dbLogging,
};
