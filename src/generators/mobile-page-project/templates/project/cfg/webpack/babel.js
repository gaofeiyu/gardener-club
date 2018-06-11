"use strict";

var path = require('path');
var fs = require('fs');
var getLigoRC = require('../util/getLigoRC');
var pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json')));

module.exports = function(config) {
  var ligorc = getLigoRC();

  var presets = ['env'];
  var plugins = ['transform-remove-strict-mode'];

  if (/react/.test(ligorc.framework)) {
    presets.push('react');
  }

  if (ligorc.framework === 'preact') {
    plugins.push(["transform-react-jsx", { "pragma": "preact.h" }]);
  }

  var env = {};
  if (pkg.devDependencies['babel-plugin-istanbul']) {
    env.test = {
      plugins: [
        ['istanbul', {
          exclude: [
            "src/**/test/**/*.js",
            "cfg/**/*.js"
          ]
        }]
      ]
    };
  }

  config.module.rules.push({
    test: /\.jsx?$/,
    // exclude: /(node_modules|bower_components)/,
    loader: 'babel-loader',
    options: {
      presets: presets,
      plugins: plugins,
      env: env
    }
  });
};