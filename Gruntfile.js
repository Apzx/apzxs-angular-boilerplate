'use strict';

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    cdnify: 'grunt-google-cdn'
  });

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Configurable paths for the application
    pathTo: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= pathTo.app %>/**/*.js'],
        tasks: ['newer:jshint:all', 'newer:jscs:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      compass: {
        files: ['<%= pathTo.app %>/styles/**/*.{scss,sass}'],
        tasks: ['compass:server', 'postcss:server']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= pathTo.app %>/**/*.html',
          '.tmp/styles/**/*.css',
          '<%= pathTo.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/app/styles',
                connect.static('./app/styles')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= pathTo.dist %>'
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist:  ['dist'],
      server: ['.tmp', '.sass-cache'],
      default: ['.tmp', '.sass-cache', 'dist']
    },

    // Make sure there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= pathTo.app %>/**/*.js'
        ]
      }
    },

    // Make sure code styles are up to par
    jscs: {
      options: {
        config: '.jscsrc',
        verbose: true
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= pathTo.app %>/**/*.js'
        ]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= pathTo.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      sass: {
        src: ['<%= pathTo.app %>/styles/**/*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    }, 

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= pathTo.app %>/index.html',
      options: {
        dest: '<%= pathTo.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= pathTo.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= pathTo.app %>/images',
        javascriptsDir: '<%= pathTo.app %>',
        fontsDir: '<%= pathTo.app %>/styles/fonts',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= pathTo.dist %>/images/generated'
        }
      },
      server: {
        options: {
          sourcemap: true
        }
      }
    },

    // Add vendor prefixed styles
    postcss: {
      options: {
        processors: [
          require('autoprefixer-core')({browsers: ['last 1 version']})
        ]
      },
      server: {
        options: {
          map: true
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '**/*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '**/*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    ngtemplates: {
      dist: {
        options: {
          module: 'ibelemApp',
          standalone: false,
          htmlmin: '<%= htmlmin.dist.options %>',
          usemin: 'scripts/scripts.js'
        },
        cwd: '<%= pathTo.app %>',
        src: 'modules/**/*.html',
        dest: '.tmp/templateCache.js'
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= pathTo.app %>',
          dest: '<%= pathTo.dist %>',
          src: [
            '*.{ico,png,txt}',
            '*.html',
            'images/**/*.{webp}',
            'styles/fonts/**/*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= pathTo.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
          dest: '<%= pathTo.dist %>'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= pathTo.app %>/styles',
        dest: '.tmp/styles/',
        src: '**/*.css'
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= pathTo.dist %>/*.html']
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= pathTo.dist %>/**/*.html'],
      css: ['<%= pathTo.dist %>/styles/**/*.css'],
      js: ['<%= pathTo.dist %>/**/*.js'],
      options: {
        assetsDirs: [
          '<%= pathTo.dist %>',
          '<%= pathTo.dist %>/images',
          '<%= pathTo.dist %>/styles'
        ],
        patterns: {
          js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: '<%= pathTo.dist %>',
          src: ['*.html'],
          dest: '<%= pathTo.dist %>'
        }]
      }
    },

  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'newer:jshint',
      'newer:jscs',
      'wiredep',
      'compass:server',
      'postcss:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean',
    'newer:jshint',
    'newer:jscs',
    'wiredep',
    'useminPrepare',
    'compass:dist',
    'postcss',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'usemin',
    'htmlmin',
    'clean:server'
  ]);

  grunt.registerTask('default', ['build']);
};
