'use strict';
var yeoman = require('yeoman-generator');
var update = require('./update');
var path = require('path');
var welcome = require('../../util/welcome');
var getTractorRC = require('../../util/getTractorRC');
var jsPrj = require('./javascript');
var spawn = require('../../util/spawn');
var depModules = require('../../util/depModules');

var wrap = function(p){
  return __dirname + '/templates/' + p;
};

module.exports = yeoman.Base.extend({
  constructor: function() {
    yeoman.Base.apply(this, arguments);
    // add options
    this.option('name');
    this.option('tractorInfo');
    this.option('config');
    this.option('cwd');
  },

  prompting: function() {
    console.log(welcome);

    var _this = this;
    var done = this.async();
    var dirName = this.options.name || path.basename(__dirname);

    function normAnswers(answers){
      answers.tractorInfo = _this.options.tractorInfo;
      answers.host = answers.host || 'localhost';
      answers.deps = depModules.get({
        vue: answers.framework === 'vue',
        react: /\breact/.test(answers.framework),
        preact: /preact/.test(answers.framework),
        ut: answers.ut
      });
    }

    if(this.options.config){
      this.props = this.options.config;
      normAnswers(this.props);
      done();
      return;
    }

    if(this.options.update){
      // 更新
      var tractorrc = this._tractorrc = getTractorRC(this.options.cwd);
      if(tractorrc){
        console.log('当前项目所用的tractor版本为：', tractorrc.version);
        console.log('当前安装的tractor版本为：', this.options.tractorInfo.version);
        this.prompt([{
          type: 'confirm',
          name: 'overwrite',
          message: '更新操作将覆盖所有tractor生成的配置文件，本地修改将丢失，是否确定?',
          default: true
        }], function(answers) {
          this.props = answers;
          answers.name = dirName;
          answers.framework = tractorrc.framework || 'vanilla';
          normAnswers(this.props);
          done();
        }.bind(this));
 
      }else{
        this.log('没有找到格式正确的.tractorrc文件，请确认当前目录为tractor生成的项目根目录');

        this.props = {
          tractorInfo: this.options.tractorInfo
        };
        done();
      }
    }else{
      // 新装

      this.prompt([{
        type: 'input',
        name: 'name',
        message: '请输入项目名？',
        default: dirName
      }, {
        type: 'list',
        name: 'framework',
        message: '请选择框架',
        store: true,
        choices: [
          'vanilla',
          'vue',
          'react',
          'preact',
        ],
        default: 'vanilla'
      }, {
        type: 'confirm',
        name: 'ut',
        message: '是否建立单元测试框架？',
        default: false,
      }, {
        type: 'confirm',
        name: 'install',
        message: '是否需要自动执行npm install？',
        default: true,
        store: true
      }], function(answers) {

        this.props = answers;
        normAnswers(this.props);
        done();
      }.bind(this));
    }
  },

  copyProject: function() {
    if(this.options.update){
      if(this.props.overwrite){
        this.conflicter.force = true;
        update(this);
      }
    }else{
      try{        
        jsPrj.copyProject(this);
      }catch(e){
        console.error(e);
      }
    }
  },

  install: function() {
    var done = this.async();
    if(!this.options.update){
      this.log('正在初始化git仓库，创建daily分支，并执行npm install安装依赖...');
      this.log('正在执行npm install安装依赖，请耐心等待...');
      this.spawnCommand('npm', ['install']).on('close', done);
    }else if(this.props.install) {
      this.log('正在执行tnpm install安装依赖，请耐心等待...');
      this.spawnCommand('npm', ['install']).on('close', done);
    }else{
      done();
    }
  },

  end: function() {
    if(this.options.update){
      var name = path.basename(this.destinationRoot());
      if(this.props.overwrite){
        this.log('\n项目 ' + name + ' 更新完毕\n');
      }else{
        this.log('\n项目 ' + name + ' 放弃更新\n');
      }
    }else{
      this.log('\n项目 ' + this.props.name + ' 创建完毕\n');
      if(!this.props.install){
        this.log('执行以下命令以安装依赖\n', 'cd ' + this.props.name + ' && tnpm install');
      }
    }
  }
});
