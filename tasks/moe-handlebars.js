'use strict';
var path = require('path');
var handlebars = require('handlebars');


module.exports = function(grunt) {
  grunt.registerMultiTask('mhandlebars', 'Generate static html file using handlebars', function() {
    var options = this.options({
      partialsDir: 'src/partials/',
      isPartialRegex: /ptl.html$/,
      compilerOptions: {}
    });

    var partials = {};

    var processFile = function(abspath) {
      var context = {};
      var contextPath = abspath + '.json';

      if (grunt.file.exists(contextPath)) {
        context = grunt.file.readJSON(contextPath);
      }

      var source = grunt.file.read(abspath, {
        encoding: 'utf8'
      });
      var template = handlebars.compile(source, options.compilerOptions);
      return template(context);
    };

    grunt.file.recurse(options.partialsDir, function callback(abspath, rootdir, subdir, filename) {
      if (grunt.file.exists(abspath) && options.isPartialRegex.test(filename)) {
        subdir = subdir || '.';
        var relpath = path.join(subdir, filename);
        var partial = processFile(abspath);
        partials[relpath] = partial;
        partials[relpath.replace('\\', '/')] = partial;
      }
    });

    handlebars.registerPartial(partials);

    this.files.forEach(function(f) {
      f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (grunt.file.exists(filepath)) {
          return true;
        } else {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }
      }).forEach(function(filepath) {
        if (!options.isPartialRegex.test(path.basename(filepath))) {
          var html = processFile(filepath);
          grunt.file.write(f.dest, html, {
            encoding: 'utf8'
          });
        }
      });
    });
  });
};