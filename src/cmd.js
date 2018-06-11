"use strict";
var program = require('commander');
var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-environment');
var chalk = require('chalk');

var spawn = require('./util/spawn');
var checkUpgrade = require('./util/checkUpgrade');
var env = yeoman.createEnv();
var pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')));

var generators = {
    'tractor_project': './generators/mobile-page-project',
};

var getConfig = function(){
    var localConfig = null;
    if(program.config){
        try{
            if(fs.existsSync(program.config)){
                localConfig = fs.readFileSync(program.config);
            }else{
                localConfig = program.config;
            }
            localConfig = JSON.parse(localConfig);
        }catch(e){
            console.error(e);
        }
    }
    return localConfig;
};

var done = function(){};

var run = function(genName, args){
    try{
        env.register(require.resolve(generators[genName]), genName);
        args.cwd = program.cwd || process.cwd();
        args.config = getConfig();
        env.run(genName, args, done);
    }catch(e){
        console.error(e);
    }
};

var cmdDict = {
    init: {
        cmd: 'init [name]',
        desc: '初始化项目',
        action: function(name){
            run('tractor_project', {
                name: name,
                tractorInfo: pkg
            });
        }
    },
};

program
    .version(pkg.version)
    .option('--config <cfgfile>', '用于替换交互式问答的JSON格式配置文件(或字符串)')
    .option('--cwd <cwd>', '自定义当前目录')
    .usage('[command] [options]');

for(var key in cmdDict){
    if(cmdDict.hasOwnProperty(key)){
        var item = cmdDict[key];
        var cmd = program.command(item.cmd)
            .description(item.desc);

        if(item.options){
            item.options.forEach(function(option){
                cmd = cmd.option.apply(cmd, option);
            });
        }

        cmd.action(item.action);
    }
}

program.on('--help', function(){});

function help(){
    program.outputHelp(function(txt){
        return '  Version: ' + pkg.version + '\n' + txt;
    });
}

module.exports = function(argvStr, cb){

    var parseCmd = function(){
        var argv = argvStr ? argvStr.split(/\s+/) : process.argv;
        program.parse(argv);
        if(!argv.slice(2).length || !cmdDict[argv[2]]){
            help();
        }
    };

    if(cb){
        // 在跑ut
        done = function(err){
            cb();
        };
        parseCmd();

    }else{
        checkUpgrade().then(function(latestVersion){
            if(latestVersion !== pkg.version){
                console.log(chalk.yellow([
                    'tractor ' + latestVersion + ' 已发布，请依次执行以下命令更新：',
                    '',
                    '>>  tractor upgrade    更新tractor本身',
                    '>>  tractor update     更新项目配置文件（需要在项目根目录执行）',
                    ''
                ].join('\n')));
            }

            parseCmd();
        }, function(err){
            // console.error(err);
            parseCmd();
        });
    }
};
