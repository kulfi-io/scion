const path = require("path");
const wp = require("webpack");
const slsw = require("serverless-webpack");
const pkg = require("./package.json");

let dep = {};

const keys = Object.keys(pkg.dependencies);

keys.forEach((key) => {
    dep[key] = key;
});

module.exports = {
    entry: slsw.lib.entries,
    target: "node",
    devtool: "nosources-source-map",
    mode: slsw.lib.webpack.isLocal ? "development" : "production",
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
