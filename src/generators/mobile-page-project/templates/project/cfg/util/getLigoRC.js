'use strict';

var fs = require('fs');
var path = require('path');

function getLigoRC() {
  var ligorc = null;
  var ligorcPath = path.join(__dirname, '../../.ligorc');
  if (fs.existsSync(ligorcPath)) {
    try {
      ligorc = JSON.parse(fs.readFileSync(ligorcPath));
    } catch (e) {
      console.error(e);
    }
  }
  return ligorc;
}

module.exports = getLigoRC;