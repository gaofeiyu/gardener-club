"use strict";
/* global describe, it, before, after */

var fs = require('fs');
var path = require('path');
var assert = require('assert');
var util = require('../util');
var TEMP_PRJ_ROOT = util.TEMP_PRJ_ROOT;

var FILE_NAMES = [
    '.gitignore',
    '.ligorc',
    '.npmignore',
    'gulpfile.js',
    'localcfg.json.bak',
    'package.json',
    'README.md',
    'build/README.md',
    'cfg/eslintrc-src',
    'cfg/eslintrc-test',
    'cfg/gulpfile.js',
    'cfg/karma-ci.conf.js',
    'cfg/karma-dev.conf.js',
    'cfg/README.md',
    'cfg/tests.bundle.js',
    'cfg/webpack-test.config.js',
    'cfg/webpack.config.js',
    'cfg/gulp/eslint.js',
    'cfg/gulp/karma.js',
    'cfg/gulp/webpack.js',
    'cfg/util/argv.js',
    'cfg/util/cdn.js',
    'cfg/util/checkUpgrade.js',
    'cfg/util/getLigoRC.js',
    'cfg/util/getValidPort.js',
    'cfg/util/pages.js',
    'cfg/util/util.js',
    'cfg/util/version.js',
    'cfg/webpack/alias.js',
    'cfg/webpack/babel.js',
    'cfg/webpack/base.js',
    'cfg/webpack/debug.js',
    'cfg/webpack/externals.js',
    'cfg/webpack/image.js',
    'cfg/webpack/page_assets.js',
    'cfg/webpack/page_entry.js',
    'cfg/webpack/page_html.js',
    'cfg/webpack/split.js',
    'cfg/webpack/style.js',
    'cfg/webpack/template.js',
    'cfg/webpack/uglify.js',
    'cfg/webpack/vue.js',
    'src/_common/js/rem.js',
    'src/_common/style/_functions.scss',
    'src/_common/style/_icons.scss',
    'src/_common/style/_mixins.scss',
    'src/_common/style/_reboot.scss',
    'src/_common/style/_variables.scss',
    'src/README.md'
];

describe('ligo init', function(){
    describe('vanilla js', function(){
        var webpackCfg;

        before(function(done){
            util.ligoInit({
                name: "temp",
                host: "localhost",
                framework: "vanilla",
                install: true
            }, done);
        });

        it('files exist', function(){
            FILE_NAMES.forEach(function(file){
                // console.log(file);
                assert(fs.existsSync(path.join(TEMP_PRJ_ROOT, file)), file);
            });
        });

        it('webpack config exists', function(){
            webpackCfg = require(path.join(TEMP_PRJ_ROOT, 'cfg/webpack.config.js'));
            // console.log(webpackCfg);
            assert(webpackCfg);
        });

        it('webpack entries', function(){
            assert.deepEqual(webpackCfg.entry, {
                '_common/pre-common': ['./src/_common/js/rem.js'],
                '_common/post-common': []
            });
        });

        it('webpack loaders', function(){
            var hasLoaderFor = function(name){
                return webpackCfg.module.loaders.some(function(loader){
                    return loader.test.test(name);
                });
            };
            assert(hasLoaderFor('abc.ejs'), 'ejs');
            assert(hasLoaderFor('abc.css'), 'css');
            assert(hasLoaderFor('abc.scss'), 'scss');
            assert(hasLoaderFor('abc.html'), 'html');
            assert(hasLoaderFor('abc.jpg'), 'jpg');
            assert(hasLoaderFor('abc.png'), 'png');
            assert(hasLoaderFor('abc.gif'), 'gif');
            assert(hasLoaderFor('abc.svg'), 'svg');
        });

        it('webpack plugins', function(){
            assert.equal(webpackCfg.plugins.length, 4);
        });

        it('.ligorc', function(){
            var ligorc = JSON.parse(fs.readFileSync(path.join(TEMP_PRJ_ROOT, '.ligorc')));
            assert(ligorc.es6 === false);
            assert.equal(ligorc.framework, 'vanilla');
        });

        after(function(done){
            util.spawn('rm -r temp', done);
        });
    });

    describe('vue', function(){
        before(function(done){
            util.ligoInit({
                name: "temp",
                host: "localhost",
                framework: 'vue',
                install: false
            }, done);
        });

        it('.ligorc', function(){
            var ligorc = JSON.parse(fs.readFileSync(path.join(TEMP_PRJ_ROOT, '.ligorc')));
            assert.equal(ligorc.framework, 'vue');
        });

        after(function(done){
            util.spawn('rm -r temp', done);
        });
    });
});