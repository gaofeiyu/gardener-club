'use strict';

var MODS_BASIC = {
  'autoprefixer': '7.2.5',
  'chalk': '2.3.0',
  'del': '3.0.0',
  'eslint': '4.16.0',
  'eslint-plugin-babel': '4.1.2',
  'eslint-plugin-react': '7.7.0',
  'eslint-plugin-vue': '4.3.0',
  'gulp': '3.9.1',
  'gulp-connect': '5.2.0',
  'gulp-eslint': '4.0.2',
  'gulp-insert': '0.5.0',
  'gulp-inline-source': '3.1.0',
  'gulp-replace': '0.5.4',
  'gulp-sequence': '1.0.0',
  'gulp-autoprefixer': '4.1.0',
  'gulp-rename': '1.2.2',
  'gulp-cssmin': '0.2.0',
  'merge-stream': '1.0.1',
  'minimist': '1.2.0',
  'openurl': '1.1.1',

  'webpack': '3.10.0',
  'progress-bar-webpack-plugin': '1.10.0'
};

var MODS_BABLE = {
  'babel-eslint': '8.2.2',
  'babel-core': '6.26.0',
  'babel-loader': '7.1.2',
  'babel-plugin-transform-remove-strict-mode': '0.0.2',
  'babel-preset-env': '1.6.1'
};

var MODS_TEST = {
  'babel-plugin-istanbul': '^4.1.5',
  'chai': '^4.1.2',
  'chai-spies': '^1.0.0',
  'enzyme': '^3.3.0',
  'istanbul-instrumenter-loader': '^3.0.0',
  'mocha': '^5.0.4',
  'karma': '^2.0.0',
  'karma-chai-plugins': '^0.9.0',
  'karma-chrome-launcher': '^2.2.0',
  'karma-coverage': '^1.1.1',
  'karma-mocha': '^1.1.1',
  'karma-mocha-reporter': '^2.2.5',
  'karma-sourcemap-loader': '^0.3.7',
  'karma-webpack': '^2.0.13',
};

var MODS_VUE = {
  'vue': '2.1.6',
  'vue-loader': '14.1.0',
  'vue-template-compiler': '2.1.6',
};

var MODS_REACT = {
  'babel-preset-react': '6.23.0',
  'react': '15.4.2',
  'react-dom': '15.4.2',
  'react-addons-test-utils': '15.4.2'
};

var MODS_PREACT = {
  'babel-preset-react': '6.23.0',
  'preact': '8.2.7',
  'eslint-plugin-react': '6.9.0'
};

var MODS_MODULE = {
  'gulp-sass': '3.1.0'
};

module.exports = {
  get: function(options){
    return Object.assign({},
      MODS_BASIC,
      MODS_BABLE,
      options.vue && MODS_VUE,
      options.react && MODS_REACT,
      options.preact && MODS_PREACT,
      options.ut && MODS_TEST
    );
  }
};

