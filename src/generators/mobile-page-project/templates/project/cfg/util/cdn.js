"use strict";

var fs = require('fs');
var version = require('./version');
var pkg = JSON.parse(fs.readFileSync(__dirname + '/../../package.json'));
var getLigoRC = require('./getLigoRC');
var ligorc = getLigoRC();

function getCdn(env, inline) {

  var cdn = {
    'daily': 'g-assets.daily.taobao.net',
    'product': 'g.alicdn.com'
  }[env] || '';
  if (cdn && !inline) {
    var v = version.get();
    if (!v) {
      console.error("cdn路径错误：无法获取版本号");
    }
    var project = pkg.name;
    var group = ligorc.group || 'ykfe';
    return '//' + cdn + '/' + group + '/' + project + '/' + v + '/';
  }
  return '';
}

module.exports = {
  get: getCdn
};