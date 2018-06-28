const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const rules = require('../base-config/rules').rules;

// 配置入口文件和plugins
const projectConfig = require('../project-config');
const config = projectConfig.config;
let entry = {};
let plugins = [
  new CleanWebpackPlugin(["dist"], {
    root: path.resolve(__dirname, "../")
  })
];
for (let i = 0; i < config.length; i++) {
  // entry
  let item = config[i];
  entry[item['entryName']] = item['entryPath'];
  // plugins
  let pluginItem = {
    filename: item['filename'],
    template: item['template'],
    inject: item['inject'] ? item['inject'] : true,
    chunks: item['chunks']
  };
  plugins.push(new HtmlWebpackPlugin(pluginItem));
}

module.exports = {
  entry,
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common',
          priority: 10,
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  },
  output: {
    filename: "js/[chunkhash].bundle.js",
    chunkFilename: "js/[chunkhash].bundle.js",
    path: path.resolve(__dirname, "../", "dist")
  },
  plugins,
  module: {
    rules
  }
};
