"use strict";

var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var argv = require('../util/argv')();
var pages = require('../util/pages');
var util = require('../util/util');
var selectedPages = pages.get(!argv.all && argv.target);

gulp.task('build:meta', function(){
  selectedPages.filter(function(pageName){
    return util.isModule(pageName);
  }).map(function(pageName){
    var meta = require('../../src/' + pageName + '/js/meta.js');
    var metaFile = JSON.stringify(meta, null, '  ');
    var dirPath = path.join(__dirname, '../../build', pageName);
    if(!fs.existsSync(dirPath)){
      fs.mkdirSync(dirPath);
    }
    fs.writeFileSync(dirPath + '/meta.json', metaFile);
    
    fs.unlinkSync(path.join(__dirname, '../../build', pageName, 'index.html'));

    util.printModuleUrls(pageName);
  });
});
