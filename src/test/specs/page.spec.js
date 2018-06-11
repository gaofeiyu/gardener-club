"use strict";
/* global describe, it, before, after */
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var util = require('../util');
var TEMP_PRJ_ROOT = util.TEMP_PRJ_ROOT;

describe('ligo page', function(){

    describe('vanilla js', function(){
        before(function(done){
            util.ligoInit({
                name: "temp",
                host: "localhost",
                framework: 'vanilla',
                install: false
            }, function(){

                util.ligoPage({
                    name: 'page1',
                    pageTitle: 'page1',
                    libs: ['windvane', 'mtop', 'vue']
                }, done);
            });
        });

        it('files exist', function(){
            // files should exist
            [
                'index.html',
                'index.js',
                'index.scss',
                'js/app.js',
                'mock/_mockMap.js',
                'mock/_orbit-mtop-mock.js',
                'template/app.ejs',
                'test/app.spec.js'
            ].forEach(function(fileName){
                console.log(fileName);
                assert(fs.existsSync(path.join(TEMP_PRJ_ROOT, 'src/page1', fileName)), fileName);
            });

            // files should not exist
            [
                'js/app.react.js',
                'js/app.vanilla.js'
            ].forEach(function(fileName){
                assert(!fs.existsSync(path.join(TEMP_PRJ_ROOT, 'src/page1', fileName)), fileName);
            });
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
            }, function(){

                util.ligoPage({
                    name: 'page1',
                    pageTitle: 'page1',
                    libs: ['windvane', 'mtop']
                }, done);
            });
        });

        it('files exist', function(){
            // files should exist
            [
                'index.html',
                'index.js',
                'index.scss',
                'js/app.vue',
                'mock/_mockMap.js',
                'mock/_orbit-mtop-mock.js',
                'test/app.spec.js'
            ].forEach(function(fileName){
                assert(fs.existsSync(path.join(TEMP_PRJ_ROOT, 'src/page1', fileName)), fileName);
            });

            // files should not exist
            [
                'js/app.react.js',
                'template/app.ejs',
                'js/app.vanilla.js'
            ].forEach(function(fileName){
                assert(!fs.existsSync(path.join(TEMP_PRJ_ROOT, 'src/page1', fileName)), fileName);
            });
        });

        after(function(done){
            util.spawn('rm -r temp', done);
        });
    });


});