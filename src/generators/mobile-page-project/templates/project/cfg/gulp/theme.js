"use strict";

var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var autoprefixer = require('gulp-autoprefixer');
var insert = require('gulp-insert');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var mergeStream = require('merge-stream');
var argv = require('../util/argv')();
var pages = require('../util/pages');
var util = require('../util/util');
var selectedPages = pages.get(!argv.all && argv.target);

gulp.task('build:theme', function(){
  var sass = require('gulp-sass');
  return mergeStream(selectedPages.filter(function(pageName){
    return util.isModule(pageName);
  }).map(function(pageName){
    var baseCssPath = path.join(__dirname, '../../build', pageName, 'module.css');
    var baseCss = '';
    if(fs.existsSync(baseCssPath)){
      baseCss = fs.readFileSync(baseCssPath, 'utf8');
      fs.unlinkSync(baseCssPath);
    }

    return gulp.src(['./src/' + pageName + '/theme/*/index.scss'])
      .pipe(sass())
      .pipe(autoprefixer({
        remove: false,
        browsers: [
            'ios >= 7',
            'Android >= 4'
        ]
      }))
      .pipe(insert.prepend(baseCss))
      .pipe(cssmin())
      .pipe(rename(function(filePath){
        var parts = filePath.dirname.split('/');
        var themeName = parts[parts.length - 1];
        parts.pop();
        filePath.dirname = parts.join('/');
        filePath.basename = themeName;
      }))
      .pipe(gulp.dest('./build/' + pageName + '/theme'));
  }));
});