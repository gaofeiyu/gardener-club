"use strict";
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = function(config, argv) {
  config.module.rules.push({
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [{
        loader: "css-loader",
        options: {
          minimize: true,
          sourceMap: true
        }
      }]
    })
  }, {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [{
        loader: "css-loader",
        options: {
          minimize: true,
          autoprefixer: false,
          sourceMap: true
        }
      }, {
        loader: "postcss-loader",
        options: {
          config: {
            path: path.resolve(__dirname, '../postcss.config.js')
          }
        }
      }, {
        loader: "sass-loader"
      }]
    })
  });

  // 独立CSS文件
  config.plugins.push(new ExtractTextPlugin('[name].css', {
    disable: false,
    allChunks: true
  }));
};