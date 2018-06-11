"use strict";

var fs = require('fs');
var path = require('path');
var getValidPort = require('../util/getValidPort');
var util = require('../util/util');

module.exports = function(config, argv, pageName) {
  if (!argv.release || !util.isModule(pageName)) {
    // 配置入口js
    var entry = config.entry[pageName + '/index'] = [
      './src/' + pageName + '/index.js'
    ];
    if (!argv.release) {
      // 启用webpack-dev-server的inline和hot模式，使浏览器自动刷新
      entry.unshift(
        'webpack-dev-server/client?http://0.0.0.0:' + getValidPort.lastValidPort + '/',
        'webpack/hot/dev-server'
      );
    }
  }
};