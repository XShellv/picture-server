const path = require("path");
const webpackConfigBase = require("./webpack.base.config");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { merge } = require("webpack-merge");
const webpackConfigProd = {
  mode: "production",
  plugins: [new CleanWebpackPlugin(), new BundleAnalyzerPlugin()],
};
module.exports = merge(webpackConfigBase, webpackConfigProd);
