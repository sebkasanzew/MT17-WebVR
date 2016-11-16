/* global module:true, __dirname:true, require:true */

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    path: __dirname + "/dist", // path.join(__dirname + "/dist"),
    filename: "bundle.js",
  },
  plugins: [new HtmlWebpackPlugin({
    template: "./src/index.html",
  })],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"],
        },
      },
    ],
  },
};
