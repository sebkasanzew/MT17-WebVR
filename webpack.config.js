let path = require("path");
let webpack = require("webpack");
require("babel-polyfill");

let IS_PRODUCTION = process.env.NODE_ENV === "production";

const BUILD_DIR = path.resolve(__dirname, "build");

const APP_DIR = path.resolve(__dirname, "src/js");

let PLUGINS = [];

if (IS_PRODUCTION) {
  // Uglify in production.
  PLUGINS.push(
      new webpack.optimize.UglifyJsPlugin({
        mangle: {
          except: ["$super", "$", "exports", "require"]
        },
        sourcemap: false
      })
  );
}

module.exports = {
  entry: `${APP_DIR}/app.js`,
  output: {
    // Bundle will be served at /bundle.js locally.
    filename: "bundle.js",
    // Bundle will be built at ./src/media/js.
    path: BUILD_DIR,
    publicPath: "/",
  },
  devtool: "source-map",
  module: {
    noParse: [
      __dirname + "./node_modules/aframe/dist/aframe.js/", // for aframe from NPM
      __dirname + "./node_modules/cannon/build/cannon.js/", // for aframe-extras from NPM
    ],
    loaders: [
      {
        // JS.
        exclude: /(node_modules|bower_components)/,
        include: APP_DIR,
        loader: "babel-loader",
        test: /\.js$/,
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        // Images
        test: /\.png|jpg$/,
        loader: "url-loader?limit100000",
      },
      {
        // Sound
        test: /\.ogg|mp3$/,
        loader: "url-loader?limit10000",
      },
      {
        // Models
        test: /\.dae|gltf$/,
        loader: "url-loader?limit10000",
      }
    ],
  },
  plugins: PLUGINS,
  resolve: {
    extensions: ["", ".js", ".jsx", ".json"],
    fallback: path.join(__dirname, "node_modules"),
    modulesDirectories: [
      "src/js",
      "node_modules",
    ]
  },
  resolveLoader: {
    root: path.join(__dirname, "node_modules"),
    fallback: [path.join(__dirname, "node_modules")]
  },
  devServer: {
    stats: {
      warnings: true
    }
  }
};
