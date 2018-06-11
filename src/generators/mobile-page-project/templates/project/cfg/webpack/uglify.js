"use strict";

var webpack = require('webpack');

module.exports = function(config, argv) {
  if (argv.release) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        drop_console: true
      }
    }));
  }
};