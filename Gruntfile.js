/*global module*/
/*jslint node:true */
/*jshint strict:true */

module.exports = function (grunt) {
    "use strict";
    var path = require('path'),
        toffee_script = 'node_modules/toffee-script/bin/coffee',
        dbpath = path.join(process.cwd(), 'test', 'databases', '2.0');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yeoman: {
            databases: {
                dbpath: dbpath
            }
        },
        clean: {
            test_databases: [
                '<%= yeoman.databases.dbpath %>'
            ],
            target: [
                'target/app/*.js',
                'target/app/model/',
                'target/app/rest/'
            ]
        },
        mkdir: {
            test_databases: {
                options: {
                    create: [
                        '<%= yeoman.databases.dbpath %>'
                    ]
                }
            }
        },
        command: {
            mongo_start: {
                cmd: 'bbs mongo start 2.0.49 --auth --port 25000 --dbpath ' + dbpath
            },
            mongo_stop: {
                cmd: 'bbs mongo stop 2.0.49'
            }
        },
        easy_mongo_fixture: {
            load: {
                options: {
                    host: '127.0.0.1',
                    port: 27017,
                    username: 'sa',
                    password: '',
                    database: 'test',
                    dir: 'src/test/fixtures',
                    override: true
                },
                collections: [
                    'locations'
                ],
                action: 'load'
            },
            save: {
                options: {
                    host: '127.0.0.1',
                    port: 27017,
                    username: 'sa',
                    password: '',
                    database: 'test',
                    dir: 'src/test/fixtures',
                    override: true
                },
                collections: [
                    'locations'
                ],
                action: 'save'
            }
        },
        execute: {
            toffee_app: {
                options: {
                    args: [
                        '--bare',
                        '--output',
                        'target/app',
                        '--compile',
                        'src/main/toffee/app.toffee'
                    ]
                },
                src: toffee_script
            },
            toffee_rest: {
                options: {
                    args: [
                        '--bare',
                        '--output',
                        'target/app/rest',
                        '--compile',
                        'src/main/toffee/rest/rest.toffee'
                    ]
                },
                src: toffee_script
            },
            toffee_rest_locations: {
                options: {
                    args: [
                        '--bare',
                        '--output',
                        'target/app/rest',
                        '--compile',
                        'src/main/toffee/rest/rest_locations.toffee'
                    ]
                },
                src: toffee_script
            }
        },
        eslint: {
            options: {
                silent: false
            },
            src: [
                'target/app/**/*.js'
            ]
        },
        jshint: {
            all: [
                'target/app/**/*.js'
            ],
            options: {
                jshintrc: true
            }
        },
        jsduck: {
            main: {
                src: [
                    'target/app/**/*.js'
                ],
                dest: 'target/doc',
                options: {
                    'builtin-classes': true,
                    warnings: [
                        '-no_doc',
                        '-dup_member',
                        '-link_ambiguous'
                    ],
                    tags: [
                        'src/main/rb/tag/addon_tag.rb',
                        'src/main/rb/tag/author_tag.rb',
                        'src/main/rb/tag/date_tag.rb',
                        'src/main/rb/tag/example_tag.rb',
                        'src/main/rb/tag/module_tag.rb',
                        'src/main/rb/tag/see_tag.rb'
                    ]
                }
            }
        },
        mongodb_fixtures: {
            options: {
                // Task-specific options go here.
            },
            your_target: {
                // Target-specific file lists and/or options go here.
            }
        },
        jasmine_node: {
            options: {
                specNameMatcher: 'spec',
                forceExit: true
            },
            test: ['src/test/']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-commands');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-easy-mongo-fixture');
    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-jsduck');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('gruntify-eslint');
    grunt.registerTask('test:mongo', [
        // stop open MongoDB instances, could happen if a test stops due an exception
        'command:mongo_stop',
        'clean:test_databases',
        'mkdir:test_databases',
        'command:mongo_start',
        'jasmine_node:test',
        'command:mongo_stop'
    ]);
    grunt.registerTask('fixtures:load', [
        'easy_mongo_fixture:load'
    ]);
    grunt.registerTask('fixtures:save', [
        'easy_mongo_fixture:save'
    ]);
    grunt.registerTask('compile', [
        'execute'
    ]);
    grunt.registerTask('lint', [
        'jshint:all'
    ]);
    grunt.registerTask('test', [
        'jasmine_node:test'
    ]);
    grunt.registerTask('doc', ['jsduck']);
    grunt.registerTask('default', [
        'compile',
        'lint',
        'test'
    ]);
};
