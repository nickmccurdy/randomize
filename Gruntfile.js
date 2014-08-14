module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-docco');

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
