'use strict';

var fs = require('fs');
var path = require('path');

// tractorrc格式向后兼容
var normtractorrc = function(tractorrc){
  tractorrc.framework = tractorrc.framework || 'vanilla';
  if(tractorrc.config){
    var cfg = tractorrc.config;
    if(cfg.react){
      tractorrc.framework = 'react';
    }
    if(cfg.vue){
      tractorrc.framework = 'vue';
    }
  }
};

function gettractorrc(cwd){
  cwd = cwd || process.cwd();
  var tractorrc = null;
  var tractorrcPath = path.join(cwd, '.tractorrc');
  if(fs.existsSync(tractorrcPath)){
    try{
      tractorrc = JSON.parse(fs.readFileSync(tractorrcPath));
      normtractorrc(tractorrc);
    }catch(e){
      console.error(e);
    }
  }
  return tractorrc;
}

module.exports = gettractorrc;