"use strict";
/* global describe, it, before, after */
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var util = require('../util');
var TEMP_PRJ_ROOT = util.TEMP_PRJ_ROOT;

describe('ligo comp', function(){

    describe('vanilla js', function(){
        before(function(done){
            util.ligoInit({
                name: "temp",
                host: "localhost",
                framework: 'vanilla'
            }, function(){

                util.ligoPage({
                    name: 'page1',
                    pageTitle: 'page1',
                    libs: ['windvane', 'mtop', 'react']
                }, done);
            });
        });

        it('create vanilla page component', function(done){
            util.ligoComp({
                compName: 'Comp2',
                compType: 'page',
                page: 'page1'
            }, function(){

                [
                    'Comp2.js',
                    'Comp2/component.js',
                    'Comp2/component.scss',
                    'Comp2/template/Comp2.ejs'
                ].forEach(function(fileName){
                    assert(fs.existsSync(path.join(TEMP_PRJ_ROOT, 'src/page1/components', fileName)));
                });

                done();
            });
        });

        it('create common component', function(done){
            util.ligoComp({
                compName: 'Comp3',
                compType: 'common'
            }, function(){

                [
                    'Comp3.js',
                    'Comp3/component.js',
                    'Comp3/component.scss'
                ].forEach(function(fileName){
                    assert(fs.existsSync(path.join(TEMP_PRJ_ROOT, 'src/_common/components', fileName)));
                });

                done();
            });
        });

        after(function(done){
            util.spawn('rm -r temp', done);
        });
    });

});

