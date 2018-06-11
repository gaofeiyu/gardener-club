"use strict";

module.exports = function(config, argv) {
  config.module.rules.push({
    test: /\.ejs$/,
    loader: "@ali/alimusic-orbit-ejs-loader",
    options: {
      variable: "data",
      minify: true,
      // engineFull: 'var _ = { escape: require(\'lodash/escape\') };',
      minifierOptions: {
        collapseInlineTagWhitespace: true,
        conservativeCollapse: false,
        ignoreCustomFragments: [/<%[\s\S]*?%>/]
      }
    }
  }, {
    test: /\.html$/,
    loader: "underscore-loader",
    options: {
      minify: false,
      engineFull: 'var _ = { escape: require(\'lodash/escape\') };',
      minifierOptions: {
        conservativeCollapse: false,
        ignoreCustomFragments: [/<%.*%>/]
      }
    }
  });
};