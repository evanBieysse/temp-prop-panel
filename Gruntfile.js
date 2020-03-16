var path = require('path');

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  /**
   * Resolve external project resource as file path
   */
  function resolvePath(project, file) {
    return path.join(path.dirname(require.resolve(project)), file);
  }

  grunt.initConfig({
    config: {
      app: 'app',
      sources: 'lib',
      tests: 'test'
    },

    browserify: {
      options: {
        browserifyOptions: {
          debug: true
        },
        transform: [
          ['stringify', {
            extensions: ['.bpmn']
          }],
          ['babelify', {
            global: true,
            compact: false
          }]
        ]
      },
      watch: {
        options: {
          watch: true
        },
        files: {
          'dist/index.js': ['app/**/*.js', '!app/bpmn-js-diffing/**/*.*', '!vueGlobale/**/*.js'],
          'dist/vueGlobale/vueGlobale.js': ['app/vueGlobale/**/*.js']
        },
        samples: {
          files: [
            'app/**/*.*',
            'styles/**/*.less',
          ],
          tasks: ['copy:app']
        }
      },

      app: {
        files: {
          'dist/index.js': ['app/**/*.js', '!app/bpmn-js-diffing', '!vueGlobale/**/*.js'],
          'dist/vueGlobale/vueGlobale.js': ['app/vueGlobale/**/*.js']
        }
      }
    },

    copy: {
      diagram_js: {
        files: [
          {
            src: resolvePath('diagram-js', 'assets/diagram-js.css'),
            dest: 'dist/css/diagram-js.css'
          }
        ]
      },
      bpmn_js: {
        files: [
          {
            expand: true,
            cwd: resolvePath('bpmn-js', 'dist/assets'),
            src: ['**/*.*', '!**/*.js', '!app/bpmn-js-diffing/**/*.*', '!vueGlobale/**/*.*'],
            dest: 'dist/vendor'
          }
        ]
      },
      app: {
        files: [
          {
            expand: true,
            cwd: 'app/',
            src: ['**/*.*', '!**/*.js', '!bpmn-js-diffing/**/*.*', '!vueGlobale/**/*.js'],
            dest: 'dist'
          }
        ]
      },
      logsRF: {
        files: [
          {
            expand: true,
            cwd: 'app/',
            src: ['logRF/**/*.*'],
            dest: 'dist'
          }
        ]
      },
      vueGlobale: {
        files: [
          {
            expand: true,
            cwd: 'app/',
            src: ['vueGlobale/**/*.*'],
            dest: 'dist'
          }
        ]
      },
      bpmn_js_diff: {
        files: [
          {
            expand: true,
            cwd: 'app/bpmn-js-diffing/',
            src: ['**/*.*'],
            dest: 'dist/bpmn-js-diffing'
          }
        ]
      }
    },


    less: {
      options: {
        dumpLineNumbers: 'comments',
        paths: [
          'node_modules'
        ]
      },

      styles: {
        files: {
          'dist/css/app.css': 'styles/app.less'
        }
      }
    },

    watch: {
      options: {
        livereload: true,
      },

      samples: {
        files: [
          'app/**/*.*',
          'styles/**/*.less',
        ],
        tasks: [
          'copy:app'
        ]
      },
      less: {
        files: [
          'styles/**/*.less',
          'app/bpmn-js-diffing/**/*.css',
          'node_modules/bpmn-js-properties-panel/styles/**/*.less',
        ],
        tasks: [
          'less'
        ]
      }
    },
    
    styles: {
      files: {
        'dist/css/app.css': 'styles/app.less'
      }
    },

    connect: {
      livereload: {
        options: {
          port: process.env.VCAP_APP_PORT || 9013,
          livereload: false,
          // hostname: 'localhost',
          keepalive: true,
          base: [
            'dist'
          ]
        }
      }
    }
  });

  // tasks

  grunt.registerTask('build', ['copy', 'less', 'browserify:app']);

  grunt.registerTask('auto-build', [
    'copy',
    'less',
    'browserify:watch',
    'connect:livereload',
    'watch'
  ]);

grunt.registerTask('prod', [
    'copy',
    'less',
    'browserify:watch',
    'connect:livereload'
  ]); 


  grunt.registerTask('default', ['jshint, build']);
};