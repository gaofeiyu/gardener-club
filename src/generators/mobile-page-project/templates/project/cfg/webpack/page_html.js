"use strict";

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var cdn = require('../util/cdn');

module.exports = function(config, argv, pageName) {
  var cdnUrl = cdn.get(argv.env, argv.inline);
  var pageSrcPath = './src/' + pageName;
  var resourceBase = cdnUrl ? cdnUrl + pageName : '.';
  var buildOptions = {
    resourceBase: resourceBase,
    debug: !argv.release,
    inline: argv.inline,
    mock: argv.mock,
    local: argv.local
  };

  config.plugins.push(
    // 生成index.html文件
    new HtmlWebpackPlugin({
      buildOptions: buildOptions,
      template: pageSrcPath + '/index.html',
      filename: './' + pageName + '/index.html',
      inject: false
    }),

    // 提供全局变量到index.js，用于parse index.html
    new webpack.DefinePlugin({
      // process.env.DEBUG 必须是个字符串，否则webpack dev server会报错
      'process.env.DEBUG': !argv.release ? JSON.stringify('true') : null,
      'process.env.RESOURCE_BASE': JSON.stringify(resourceBase),
      'process.env.INLINE': argv.inline,
      'process.env.MOCK': argv.mock,
      'process.env.LOCAL': argv.local
    })
  );
};