import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { Schema } from "./gql/resolvers";
import db from "./db/models";

const app = express();

app.use("/api", bodyparser.json({ limit: "1000mb" }));
app.use("/api", bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use("/api/v1", cors(), (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    graphqlHTTP({
        schema: Schema,
        graphiql: ((environment.match('development')) ? true : false),
        context: { models: db.conn.models },
    })(req, res);
});

app.get("/", (req, res) => {
    res.send("Express is working!");
});

export default app;
