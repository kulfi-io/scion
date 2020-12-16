const path = require("path");
const externals = require("webpack-node-externals");

module.exports = {
    entry: "./src/index.js",
    target: "node",
    externals: [externals()],
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "build")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
            
        ]
    }
}