"use strict";
/* global describe, it, before, after */
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var util = require('../util');
var TEMP_PRJ_ROOT = util.TEMP_PRJ_ROOT;

describe('ligo mock', function(){

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
            }, function(){

                util.ligoPage({
                    name: 'page2',
                    pageTitle: 'page2',
                    libs: ['windvane', 'mtop', 'react']
                }, done);
            });
        });
    });

    it('mock api for one page', function(done){
        util.ligoMock({
            apiName: 'my.new.api.1',
            pageNames: ['page1']
        }, function(){

            assert(fs.existsSync(path.join(TEMP_PRJ_ROOT, 'src/page1/mock/my.new.api.1.js')));

            done();
        });
    });

    it('mock api for multiple pages', function(done){
        util.ligoMock({
            apiName: 'my.new.api.2',
            pageNames: ['page1', 'page2']
        }, function(){

            assert(fs.existsSync(path.join(TEMP_PRJ_ROOT, 'src/page1/mock/my.new.api.2.js')));
            assert(fs.existsSync(path.join(TEMP_PRJ_ROOT, 'src/page2/mock/my.new.api.2.js')));

            done();
        });
    });

    it('generate mock data from API doc', function(done){
        var apiName = 'mtop.alimusic.task.taskqueryservice.gettask';
        var apiMockFile = path.join(TEMP_PRJ_ROOT, 'src/page1/mock', apiName + '.js');

        util.ligoMock({
            apiName: apiName,
            pageNames: ['page1']
        }, function(){

            assert(fs.existsSync(apiMockFile));

            var getMockData = require(apiMockFile);
            getMockData({}).then(function(data){
                var mockData = data && data.data && data.data.data;

                assert(mockData);

                mockData = mockData || {};
                assert(mockData.description);
                assert(mockData.fandomId);

                done();
            });
        });
    });

    it('can disable mock data', function(done){
        var apiName = 'my.new.api.1';

        var mockMapFile = path.join(TEMP_PRJ_ROOT, 'src/page1/mock/_mockMap.js');

        util.ligoMock('-l', {
            pageName: 'page1',
            apiNames: [apiName + '.js']
        }, function(){

            var str = fs.readFileSync(mockMapFile, 'utf8');
            var module = {};
            // since require is changed by istanbul, we can not simply require(mockMapFile)
            eval(str);
            var mockMap = module.exports;
            assert(mockMap && mockMap.length === 1);
            if(mockMap){
                assert(mockMap[0] === apiName + '.js');
            }

            done();
        });
    });

    after(function(done){
        util.spawn('rm -r temp', done);
    });
});

