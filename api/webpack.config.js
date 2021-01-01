const path = require("path");
const slsw = require("serverless-webpack");
const pkg = require("./package.json");

let dep = {};

Object.keys(pkg.dependencies).forEach((key) => (dep[key] = key));

module.exports = {
    entry: slsw.lib.entries,
    target: "node",
    devtool: "nosources-source-map",
    mode: "development",
    externals: dep,
    module: {
        rules: [
            {
                test: /\.js$/,
                include: __dirname,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
        ],
    },
    output: {
        libraryTarget: "umd",
        path: path.join(__dirname, ".webpack"),
        filename: "[name].js",
        sourceMapFilename: "[file].map",
    },
};
