module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        meta: {  
            srcPath: 'src/sass/', 
            deployPath: 'build/css/' 
        },

        replace: {
            html: {
                src: ['src/html/index.html'],
                dest: 'build/',
                replacements: [
                    {
                        from: 'script.js',
                        to: '<%=pkg.name%>-<%=pkg.version%>.min.js'
                    },
                    {
                        from: 'style.css',
                        to: '<%=pkg.name%>-<%=pkg.version%>.style.css'
                    }
                ]
            },
            js: {
                src: ['build/js/<%=pkg.name%>-<%=pkg.version%>.min.js'],
                dest: 'build/js/',
                replacements: [
                    {
                        from: 'FAC_VERSION',
                        to: '<%=pkg.version%>'
                    }
                ]
            }
        },

        uglify: {
            options: {
                stripBanners: true,
                banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd")%> */\n'
            },
            build: {
                src: ['src/js/script.js','src/js/widgets.js', 'src/js/*/*.js', 'src/js/edit.js'],
                dest: 'build/js/<%=pkg.name%>-<%=pkg.version%>.min.js'
            }
        },

        jshint:{
            build: ['Gruntfile.js', 'scr/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        copy: {
            img:{
                expand: true,
                cwd: 'src/img/',
                src: '*',
                dest: 'build/img/'
            },
            html:{
                expand: true,
                cwd: 'src/html/',
                src: '*',
                dest: 'build/'
            },
            libjs:{
                expand: true,
                cwd: 'libs/js',
                src: '*',
                dest: 'build/js'
            },
            libcss:{
                expand: true,
                cwd: 'libs/css',
                src: '*',
                dest: 'build/css'
            }
        },

        sass: { 
            dist: { 
                files: { '<%= meta.deployPath %><%=pkg.name%>-<%=pkg.version%>.style.css': '<%= meta.srcPath %>style.scss' }, 
                options: { 
                    sourcemap: 'none' ,
                    style:"compressed"
                } 
            } 
        }, 
        
        watch: { 
            scripts: { 
                files: [ '<%= meta.srcPath %>/**/*.scss' ], 
                tasks: ['sass'] 
            } 
        }

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['jshint', 'uglify','sass', 'copy', 'replace']);
};