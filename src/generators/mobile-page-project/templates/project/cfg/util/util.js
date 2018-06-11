"use strict";

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var pages = require('./pages');
var getLigoRC = require('./getLigoRC');
var relativePath = '../webpack/';
var pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json')));

var ligorc = getLigoRC();

module.exports = {
  applyConfigs: function(config, argv, handlerNames) {

    handlerNames.forEach(function(handlerName) {
      if (handlerName) {
        require(relativePath + handlerName)(config, argv);
      }
    });

  },
  applyPageConfigs: function(config, argv, handlerNames) {

    var selectedPages = pages.get(!argv.all && argv.target);

    handlerNames.forEach(function(handlerName) {
      if (handlerName) {
        var handler = require(relativePath + handlerName);

        selectedPages.forEach(function(pageName) {
          handler(config, argv, pageName);
        });
      }
    });

  },
  isModule: function(pageName) {
    return fs.existsSync(path.join(__dirname, '../../src', pageName, 'module.js')) &&
      fs.existsSync(path.join(__dirname, '../../src', pageName, 'js/meta.js'));

  },
  printModuleUrls: function(pageName) {
    var group = ligorc.group;
    var version = pkg.version;
    var prjName = __dirname.split('/').reverse()[2] || 'nugget-modules';
    var dailyUrls = [
      'http://g-assets.daily.taobao.net/' + group + '/' + prjName + '/' + version + '/' + pageName + '/module.js',
      'http://g-assets.daily.taobao.net/' + group + '/' + prjName + '/' + version + '/' + pageName + '/theme/default.css',
      'http://g-assets.daily.taobao.net/' + group + '/' + prjName + '/' + version + '/' + pageName + '/meta.json'
    ];

    var releaseUrls = [
      'http://g.alicdn.com/' + group + '/' + prjName + '/' + version + '/' + pageName + '/module.js',
      'http://g.alicdn.com/' + group + '/' + prjName + '/' + version + '/' + pageName + '/theme/default.css',
      'http://g.alicdn.com/' + group + '/' + prjName + '/' + version + '/' + pageName + '/meta.json'
    ];

    console.log('');
    console.log(chalk.cyan('*** 模块' + pageName + '的CDN地址 ***'));
    console.log(chalk.cyan('【日常】'));
    dailyUrls.forEach(function(url) {
      console.log('    ' + chalk.magenta(url));
    });
    console.log('');
    console.log(chalk.cyan('【线上】'));
    releaseUrls.forEach(function(url) {
      console.log('    ' + chalk.magenta(url));
    });
  }
};