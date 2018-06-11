"use strict";
var path = require('path');

module.exports = function(config, argv) {
  var alias = {
    root: path.resolve(__dirname, '../..'),
    src: path.resolve(__dirname, '../../src'),
    common: path.resolve(__dirname, '../../src/_common'),
    node_modules: path.resolve(__dirname, '../../node_modules')
  };

  config.resolve = {
    alias: alias,
    extensions: ['.vue', '.json', '.js', '.jsx', '.webpack.js']
  };
};