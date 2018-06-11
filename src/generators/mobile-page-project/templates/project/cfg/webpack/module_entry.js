"use strict";

var util = require('../util/util');

module.exports = function(config, argv, pageName) {
  if (util.isModule(pageName)) {
    config.entry[pageName + '/module'] = [
      './src/' + pageName + '/module.js'
    ];
  }
};