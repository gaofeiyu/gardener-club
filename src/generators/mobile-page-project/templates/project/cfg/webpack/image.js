"use strict";

module.exports = function(config) {
  config.module.rules.push({
    test: /\.(jpg|png|gif)$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 10240,
        name: '[name]-[hash].[ext]'
      }
    }]
  }, {
    test: /\.svg$/,
    use: [{
      loader: 'svg-url-loader',
    }, {
      loader: 'svgo-loader'
    }]
  });
};
