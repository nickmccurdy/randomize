module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-docco');

  grunt.initConfig({
    jshint: {
      files: 'js/*.js',
      options: { jshintrc: true }
    },
    csslint: {
      files: '*.css'
    },
    docco: {
      files: 'js/*.js'
    }
  });

  grunt.registerTask('default', ['jshint', 'csslint']);
};
