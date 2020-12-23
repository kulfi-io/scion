import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { Schema } from "./gql/resolvers";
import db from "./db/models";
import { getLoginTokenData } from "./utils";

const app = express();

app.use("/gql", bodyparser.json({ limit: "1000mb" }));
app.use("/gql", bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use("/gql/v1", cors(), (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    graphqlHTTP({
        schema: Schema,
        graphiql: process.env.NODE_ENV === "development",
        context: { models: db.conn.models, user: getLoginTokenData(req) },
    })(req, res);
});

app.get("/", (req, res) => {
    res.send("Express is working!");
});

export default app;
