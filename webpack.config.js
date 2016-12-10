let path = require("path");
let webpack = require("webpack");
require("babel-polyfill");

let IS_PRODUCTION = process.env.NODE_ENV === "production";

let ENTRY_POINTS = [
  "./src/js/app"
];

let JS_LOADERS = [
  "babel?cacheDirectory&presets[]=react,presets[]=es2015,presets[]=stage-0"
];

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
  entry: ENTRY_POINTS,
  output: {
    // Bundle will be served at /bundle.js locally.
    filename: "bundle.js",
    // Bundle will be built at ./src/media/js.
    path: "./build",
    publicPath: "/",
  },
  module: {
    noParse: [
      __dirname + /node_modules\/aframe\/dist\/aframe.js/, // for aframe from NPM
      __dirname + "./node_modules/cannon/build/cannon.js/", // for aframe-extras from NPM
    ],
    loaders: [
      {
        // JS.
        exclude: /(node_modules|bower_components)/,
        loaders: JS_LOADERS,
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
    extensions: ["", ".js", ".json"],
    fallback: path.join(__dirname, "node_modules"),
    modulesDirectories: [
      "src/js",
      "node_modules",
    ]
  },
  resolveLoader: {
    fallback: [path.join(__dirname, "node_modules")]
  },
  devServer: {
    stats: {
      warnings: true
    }
  }
};
