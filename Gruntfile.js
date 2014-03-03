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
    // copy: {
    //   "assets": {
    //     files: [{
    //       expand: true,
    //       cwd: "assets/",
    //       src: ["*"],
    //       dest: "build/assets"
    //     }]
    //   },
    //   "scripts": {
    //     files: [{
    //       expand: true,
    //       cwd: "scripts/",
    //       src: ["**/*.js"],
    //       dest: "build/scripts"
    //     }]
    //   },
    //   "components": {
    //     files: [{
    //       expand: true,
    //       cwd: "components/",
    //       src: ["**/*.js"],
    //       dest: "build/components"
    //     }]
    //   },
    //   "node_modules": {
    //     files: [{
    //       expand: true,
    //       cwd: "node_modules/",
    //       src: ["**/*.js"],
    //       dest: "build/node_modules"
    //     }]
    //   },
    //   "templates": {
    //     files: [{
    //       expand: true,
    //       cwd: "templates/",
    //       src: ["**/*.js"],
    //       dest: "build/templates"
    //     }]
    //   },
    //   "build-templates": {
    //     files: [{
    //       expand: true,
    //       cwd: "build-templates/",
    //       src: ["**/*.json", "**/*.html"],
    //       dest: "build/"
    //     }]
    //   },
    //   "main" :{
    //     files: [{
    //       src: ["index.html", "config.js", "app.css"],
    //       dest: "build/"
    //     }]
    //   }
    // "legal": {
    //   files: [{
    //     expand: true,
    //     cwd: ".",
    //     src: ["LICENSE.md"],
    //     dest: "build/"
    //   }]
    // }
    // },
    nodewebkit: {
      options: {
        build_dir: './build', // target
        mac: true,
        win: false,
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