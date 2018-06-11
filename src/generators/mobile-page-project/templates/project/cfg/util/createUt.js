"use strict";
var fs = require('fs');
var path = require('path');
var argv = require('./argv')();

var utcreator;
try {
  utcreator = require('@ali/alimusic-efat/utcreator');
} catch (e) {}

function withAlias(aliasDict, func) {
  var targets = [];
  for (var key in aliasDict) {
    if (aliasDict.hasOwnProperty(key)) {
      var target = path.join(__dirname, '../../node_modules', aliasDict[key]);
      var src = path.join(__dirname, key);
      targets.push(target);
      if (fs.existsSync(target)) {
        fs.unlinkSync(target);
      }
      fs.symlinkSync(src, target);
    }
  }
  return new Promise(function(resolve) {
    func(function() {
      targets.forEach(fs.unlinkSync);
      resolve();
    });
  });
}

module.exports = function(efaCfgPath, destPath, done) {
  if (utcreator) {
    withAlias({
      '../../src/_common': 'common'
    }, function(finish) {

      efaCfgPath = path.resolve(efaCfgPath);
      destPath = path.resolve(destPath);

      utcreator.create(efaCfgPath, destPath, argv.force).then(finish);
    }).then(done);
  } else {
    done();
  }
};