var util = require('./util');

module.exports = function() {
  return new Promise(function(resolve, reject) {
    var stdout = '';
    var tooLong = false;
    var done = false;
    var child = util.spawn('tnpm view @ali/alimusic-m-h5scaffold-ligo version', {
      hideOutput: true
    });

    child.stdout.on('data', function(data) {
      stdout += data;
    });
    child.stdout.on('end', function() {
      if (!tooLong) {
        done = true;
        var match = stdout.match(/\d+\.\d+\.\d+/);
        if (match) {
          resolve(match[0]);
        } else {
          var err = new Error('no version');
          reject(err);
        }
      }
    });

    setTimeout(function() {
      tooLong = true;
      if (!done) {
        reject(new Error('timeout'));
      }
    }, 3000);
  });
};