import express from "express";
import bodyparser from "body-parser";
import cors from "cors";

import { graphqlHTTP } from "express-graphql";
import { Schema } from "./gql/resolvers";
import db from "./db/models";
import { getLoginTokenData } from "./utils";
import config from "../env.config";

const app = express();

const whitelist = config.originWhitelist;

const options = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

app.use("/gql", bodyparser.json({ limit: "1000mb" }));
app.use("/gql", bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use("/gql/v1", cors(options), (req, res) => {
    res.setHeader("Strict-Transport-Security", "max-age=31536000;");
    res.setHeader("Content-Security-Policy", "script-src 'self'");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin",
        "Accept",
        "X-Requested-With, Content-Type, Authorization"
    );
    res.setHeader("Content-Type", "application/json");

    graphqlHTTP({
        schema: Schema,
        graphiql: process.env.NODE_ENV === "development",
        context: { models: db.conn.models, user: getLoginTokenData(req) },
    })(req, res);
});

app.get("/", (req, res) => {
    res.send("Express is working!");
});

app.post("/gql/v1", (req, res) => {
    res.status(200).send({ message: "hello from gql" });
});

const handler = app;

export default handler;
