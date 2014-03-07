module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
        sass: {
            files: ['styles/*.{scss,sass}'],
            tasks: ['sass:dist']
        }
    },
    sass: {
        dist: {
            files: {
                'app.css': 'styles/main.scss',
            },
            options: {
                sourcemap: 'true'
            }
        }
    },
    nodewebkit: {
      options: {
        build_dir: './build', // target
        mac: true,
        win: true,
        linux32: false,
        linux64: false,
        credits: "./build-templates/credits.html"
      },
      src: ['./*'] // source
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks("grunt-contrib-copy");

  grunt.registerTask('default', ['sass:dist', 'watch']);
  grunt.registerTask("releasebuild", ["nodewebkit"]);
};