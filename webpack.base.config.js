var HtmlwebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "server/bundle"),
    filename: "[name].bundle.js",
    publicPath: "/",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: false,
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: "图片上传",
      template: path.resolve(__dirname, "public/index.html"),
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
    // new webpack.ProvidePlugin({
    //     $: 'jquery',
    //     jQuery: 'jquery'
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'vendor',
    //     filename: 'vendor.js'
    // }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || "false")),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015", "react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|gif|svg|png|bmp)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            esModule: false,
          },
        },
      },
    ],
  },
};
