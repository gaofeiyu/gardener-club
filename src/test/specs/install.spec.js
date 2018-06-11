"use strict";
/* global describe, it, before, after */
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var util = require('../util');
var TEMP_PRJ_ROOT = util.TEMP_PRJ_ROOT;

describe('ligo install', function(){

    describe('vanilla js', function(){

        before(function(done){
            util.ligoInit({
                name: "temp",
                host: "localhost",
                framework: 'vanilla'
            }, done);
        });

        it('can install', function(done){
            assert(!fs.existsSync(path.join(TEMP_PRJ_ROOT, 'node_modules/@ali/alimusic-orbit-net'), 'a'));

            util.ligoInstall('net', {}, function(){

                assert(fs.existsSync(path.join(TEMP_PRJ_ROOT, 'node_modules/@ali/alimusic-orbit-net'), 'b'));

                done();
            });
        });

        it('can uninstall', function(done){
            assert(fs.existsSync(path.join(TEMP_PRJ_ROOT, 'node_modules/@ali/alimusic-orbit-net')));

            util.ligoInstall('net-', {}, function(){
                assert(!fs.existsSync(path.join(TEMP_PRJ_ROOT, 'node_modules/@ali/alimusic-orbit-net')));

                done();
            });
        });

        it('can search multiple', function(done){
            util.ligoInstall('maidian,optim', {}, function(){
                assert(fs.existsSync(path.join(TEMP_PRJ_ROOT, 'node_modules/@ali/alimusic-orbit-maidian')));
                assert(fs.existsSync(path.join(TEMP_PRJ_ROOT, 'node_modules/@ali/alimusic-orbit-image-optimizer')));

                done();
            });
        });

        after(function(done){
            util.spawn('rm -r temp', done);
        });
    });

});

