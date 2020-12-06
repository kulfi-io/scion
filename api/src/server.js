import express from "express";
import bodyparser from "body-parser";

const app = express();

app.all("*", (req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, PUT, OPTIONS, DELETE, GET",
        "Access-Control-Max-Age": "3600",
        "Access-Control-Allow-Headers":
            "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token",
    });
    next();
});

app.use(bodyparser.json({ limit: "1000mb", type: "application/vnd.api+json" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));

export default app;
