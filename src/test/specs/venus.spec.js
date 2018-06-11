"use strict";
/* global describe, it, before, after */
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var util = require('../util');
var TEMP_PRJ_ROOT = util.TEMP_PRJ_ROOT;

function prepareProject(prjName, done){
    util.ligoInit({
        name: "temp",
        host: "localhost",
        framework: 'vanilla'
    }, function(){
        var pkgJsonFile = path.join(TEMP_PRJ_ROOT, 'package.json');

        // 将项目改成venus
        var pkgJson = JSON.parse(fs.readFileSync(pkgJsonFile, 'utf8'));
        pkgJson.name = prjName;
        fs.writeFileSync(pkgJsonFile, JSON.stringify(pkgJson, null, '    '), 'utf8');

        done();
    });
}

describe('ligo venus', function(){

    describe('venus', function(){
        before(function(done){
            prepareProject('@ali/alimusic-venus', done);
        });

        it('files exist', function(done){
            util.ligoVenus({
                compName: 'MyComp'
            }, function(){

                [
                    'template/MyComp.ejs',
                    'test/MyComp.spec.js',
                    'component.js',
                    'component.scss',
                    'index.html',
                    'index.js',
                    'index.scss',
                    'README.md'
                ].forEach(function(fileName){
                    assert(fs.existsSync(path.join(TEMP_PRJ_ROOT, 'src/my-comp', fileName)));
                });

                assert(fs.existsSync(path.join(TEMP_PRJ_ROOT, 'MyComp.js')));

                done();
            });
        });

        after(function(done){
            util.spawn('rm -r temp', done);
        });
    });

    xdescribe('venus-react', function(){
        before(function(done){
            prepareProject('@ali/alimusic-venus-react', done);
        });

        it('files exist', function(done){

            util.ligoVenus({
                compName: 'MyComp'
            }, function(){
                [
                    'test/MyComp.spec.js',
                    'component.js',
                    'component.scss',
                    'index.html',
                    'index.js',
                    'index.scss',
                    'README.md'
                ].forEach(function(fileName){
                    assert(fs.existsSync(path.join(TEMP_PRJ_ROOT, 'src/my-comp', fileName)));
                });

                assert(!fs.existsSync(path.join(TEMP_PRJ_ROOT, 'src/my-comp/template/MyComp.ejs')));
                assert(fs.existsSync(path.join(TEMP_PRJ_ROOT, 'm/MyComp.js')));

                done();
            });
        });

        after(function(done){
            util.spawn('rm -r temp', done);
        });
    });

});

