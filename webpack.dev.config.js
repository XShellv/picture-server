const path = require("path");
const {merge} = require("webpack-merge");
const webpackConfigBase = require("./webpack.base.config");


const webpackConfigDev = {
  devtool: "cheap-module-eval-source-map",
  mode: "development",
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
};
module.exports = merge(webpackConfigBase, webpackConfigDev);
