const merge = require("webpack-merge");
const common = require("./webpack.common.js");
let api = require('../api').api;
console.log(api);
let proxy = {};
for (let i = 0; i < api.length; i++) {
  let item = api[i];
  proxy[item['path']] = {
    changeOrigin: item['changeOrigin'] ? item['changeOrigin'] : true,
    target: item['target']
  }
}
module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    host: '192.168.1.85',
    port: 8080,
    proxy,
    contentBase: "./dist"
  }
});
