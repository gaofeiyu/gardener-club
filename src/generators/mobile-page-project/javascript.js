'use strict';

var path = require('path');
var wrap = function(p){
  return __dirname + '/templates/' + p;
};

module.exports = {
  updateProject: function(gen){
    gen.fs.copy(
      gen.templatePath('project/cfg'),
      gen.destinationPath('cfg')
    );

    gen.fs.copyTpl(
      gen.templatePath('project/cfg/webpack/base.js'),
      gen.destinationPath('cfg/webpack/base.js'),
      gen.props
    );

    gen.fs.copyTpl(
      gen.templatePath('project/cfg/webpack/alias.js'),
      gen.destinationPath('cfg/webpack/alias.js'),
      gen.props
    );
  },

  copyProject: function(gen){
    var projectName = gen.props.name;

    gen.destinationRoot(path.join(gen.options.cwd, projectName));
    console.log(gen.destinationRoot());
    gen.fs.copy(
      gen.templatePath(wrap('project/**/*')),
      gen.destinationRoot()
    );

    gen.fs.copy(
      gen.templatePath(wrap('project/_eslintrc.js')),
      gen.destinationPath('.eslintrc.js')
    );
    gen.fs.copy(
      gen.templatePath(wrap('project/_gitignore')),
      gen.destinationPath('.gitignore')
    );
    gen.fs.copyTpl(
      gen.templatePath(wrap('project/_tractorrc')),
      gen.destinationPath('.tractorrc'),
      gen.props
    );
    gen.fs.copy(
      gen.templatePath(wrap('project/_npmignore')),
      gen.destinationPath('.npmignore')
    );

    gen.fs.delete(gen.destinationPath('_eslintrc.js'));
    gen.fs.delete(gen.destinationPath('_gitignore'));
    gen.fs.delete(gen.destinationPath('_tractorrc'));
    gen.fs.delete(gen.destinationPath('_npmignore'));

    gen.fs.copyTpl(
      gen.templatePath(wrap('project/README.md')),
      gen.destinationPath('README.md'),
      gen.props
    );

    gen.fs.copyTpl(
      gen.templatePath(wrap('project/package.json')),
      gen.destinationPath('package.json'),
      gen.props
    );

    gen.fs.copyTpl(
      gen.templatePath(wrap('project/localcfg.json.bak')),
      gen.destinationPath('localcfg.json.bak'),
      gen.props
    );

    gen.fs.copyTpl(
      gen.templatePath(wrap('project/cfg/webpack/base.js')),
      gen.destinationPath('cfg/webpack/base.js'),
      gen.props
    );

    gen.fs.copyTpl(
      gen.templatePath(wrap('project/cfg/webpack/alias.js')),
      gen.destinationPath('cfg/webpack/alias.js'),
      gen.props
    );
  }
};