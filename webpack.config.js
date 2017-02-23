const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");

require("babel-polyfill");

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const PROJECT_DIR = path.resolve(__dirname);
const BUILD_DIR = path.resolve(__dirname, "build");
const APP_DIR = path.resolve(__dirname, "src/js");

const PLUGINS = [];

if (IS_PRODUCTION) {
  PLUGINS.push(
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        mangle: {
          except: ["$super", "$", "exports", "require"]
        },
        compress: {
          warnings: false, // Suppress uglification warnings
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          screw_ie8: true
        },
        output: {
          comments: false,
        },
        exclude: [/\.min\.js$/gi] // skip pre-minified libs
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new CleanWebpackPlugin(["build"], {
        root: PROJECT_DIR,
        verbose: true,
        dry: false,
      })
  );
} else {
  PLUGINS.push(
      new webpack.EvalSourceMapDevToolPlugin()
  );
}

module.exports = {
  entry: `${APP_DIR}/app.js`,
  output: {
    // Bundle will be served at /bundle.js locally.
    filename: "bundle.js",
    // Bundle will be built at ./build.
    path: BUILD_DIR,
    publicPath: "/",
  },
  module: {
    noParse: [
      /aframe.js/, // for aframe from NPM
      /cannon.js/, // for aframe-extras from NPM
    ],
    rules: [
      {
        // JS.
        exclude: /(node_modules|bower_components)/,
        include: APP_DIR,
        loader: "babel-loader",
        test: /\.js$/,
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        // Images
        test: /\.(png|jpg)$/,
        loader: "file-loader?name=assets/img/[name].[ext]",
      },
      {
        // Sound
        test: /\.(ogg|mp3)$/,
        loader: "file-loader?name=assets/sound/[hash].[ext]",
      },
      {
        // Models
        test: /\.(dae|gltf|obj|mtl)$/,
        loader: "file-loader?name=assets/3d/[name].[ext]",
      }
    ],
  },
  plugins: PLUGINS,
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    // fallback: path.join(__dirname, "node_modules"),
    modules: [
      "src/js",
      "node_modules",
    ]
  },
  resolveLoader: {
    mainFiles: [path.join(__dirname, "node_modules")],
    // fallback: [path.join(__dirname, "node_modules")]
  },
  devServer: {
    stats: {
      warnings: true
    }
  }
};
