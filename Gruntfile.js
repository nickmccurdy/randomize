'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    paths: {
      scripts: 'scripts/*.js',
      styles: 'styles/*.css'
    },

    jshint: {
      files: '<%= paths.scripts %>',
      options: { jshintrc: true }
    },

    csslint: {
      files: '<%= paths.styles %>'
    },

    docco: {
      files: '<%= paths.scripts %>'
    }
  });

  grunt.registerTask('lint', ['jshint', 'csslint']);
  grunt.registerTask('default', 'lint');
};
