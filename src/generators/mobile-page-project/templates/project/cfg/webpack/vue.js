"use strict";
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var getLigoRC = require('../util/getLigoRC');
var path = require('path');

module.exports = function(config) {
  var ligorc = getLigoRC();

  if (ligorc.framework === 'vue') {

    config.module.rules.push({
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          js: [{
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              plugins: ['transform-remove-strict-mode']
            }
          }],
          css: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{
              loader: "css-loader",
              options: {
                minimize: true,
                sourceMap: true
              }
            }]
          }),
          scss: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{
              loader: 'css-loader',
              options: {
                minimize: true,
                autoprefixer: false,
                sourceMap: true
              }
            }, {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.resolve(__dirname, '../postcss.config.js')
                }               
              }
            }, {
              loader: 'sass-loader'
            }]
          })
        }
      }
    });
  }
};