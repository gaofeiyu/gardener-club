
var spawn = require('./spawn');
var getLigoRC = require('./getTractorRC');

var ligorc = getLigoRC();

module.exports = function(){
    return new Promise(function(resolve, reject){
        if(ligorc && ligorc.checkUpgrade === false){
            reject();
        }else{
            var stdout = '';
            var done = false;
            var tooLong = false;
            var child = spawn.exec(null, 'npm view gardener-club version', {
                hideOutput: true
            });

            child.stdout.on('data', function(data){
                stdout += data;
            });
            child.stdout.on('end', function(){
                if(!tooLong){
                    done = true;
                    var match = stdout.match(/\d+\.\d+\.\d+/);
                    if(match){
                        resolve(match[0]);
                    }else{
                        var err = new Error('no version');
                        reject(err);
                    }
                }
            });
            setTimeout(function(){
                tooLong = true;
                if(!done){
                    child.kill();
                    reject(new Error('timeout'));
                }
            }, 3000);
        }
    });
};