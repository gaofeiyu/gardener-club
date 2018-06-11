"use strict";

var getLigoRC = require('../util/getLigoRC');

module.exports = function(config, argv) {
  var ligorc = getLigoRC();

  if (argv.release) {
    if (!argv.local) {
      if (ligorc.framework === 'react') {
        config.externals = {
          'react': 'React',
          'react-dom': 'ReactDOM'
        };
      } else if (ligorc.framework === 'preact') {
        config.externals = {
          'preact': 'preact'
        };
      } else if (ligorc.framework === 'vue') {
        config.externals = {
          'vue': 'Vue'
        };
      }
    }
  } else {
    config.externals = {
      // 使用Enzyme测试要求如下配置
      // https://github.com/airbnb/enzyme/blob/master/docs/guides/webpack.md
      'cheerio': 'window',
      'react/addons': true,
      'react/lib/ReactContext': true,
      'react/lib/ExecutionEnvironment': true
    };
  }
};