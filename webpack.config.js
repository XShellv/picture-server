var HtmlwebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const production = process.env.NODE_ENV === "prod";
var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || "false")),
});

let plugins = [
  new HtmlwebpackPlugin({
    title: "图片上传",
    template: path.resolve(__dirname, "public/index.html"),
  }),
  // new webpack.ProvidePlugin({
  //     $: 'jquery',
  //     jQuery: 'jquery'
  // }),
  // new webpack.optimize.CommonsChunkPlugin({
  //     name: 'vendor',
  //     filename: 'vendor.js'
  // }),
  devFlagPlugin,
];
production && plugins.push(new BundleAnalyzerPlugin());

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "bundle"),
    filename: "[name].bundle.js",
    publicPath: "/",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    proxy: {
      "/upload": {
        target: "http://localhost:8080",
        changeOrigin: true,
        pathRewrite: {
        //   "^/upload": "",
          //pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
          //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
        },
      },
    },
  },
  plugins,
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2,
        },
        // vendor: {
        //     name: "vendor",
        //     chunks: "initial",
        // }
      },
    },
  },
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
