var gulp = require('gulp'), 
    sass = require('gulp-sass'), 
    browserSync = require('browser-sync'), 
    del = require('del'), 
    imagemin = require('gulp-imagemin'), 
    pngquant = require('imagemin-pngquant'), 
    autoprefixer = require('gulp-autoprefixer'), 
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),   
	uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin');

/* Task to include html partials in index.html, minify it and move to dist */
gulp.task('html:build', function(){
    gulp.src('app/*.html') 
        .pipe(rigger())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist')) 
        .pipe(browserSync.reload({stream: true})) 
});


/* Task to compile and include scss partials in main.css, minify, rename and move main.min.css to dist/css */
gulp.task('style:build', function(){
    return gulp.src('app/scss/**/*.scss') 
        .pipe(sass()) 
        .pipe(sass().on('error', sass.logError))               
        .pipe(gulp.dest('app/css')) 
        .pipe(autoprefixer(['last 3 versions'], { cascade: false })) 
        .pipe(cssmin()) 
        .pipe(rename({suffix: '.min'})) 
        .pipe(gulp.dest('dist/css')) 
        .pipe(browserSync.reload({stream: true})) 
});

/* Task to include js partials in main.js, minify, rename and move main.min.js to dist/js */
gulp.task('js:build', function(){
    gulp.src('app/js/*.js') 
        .pipe(rigger())  
        .pipe(uglify())
    	.pipe(rename({suffix: '.min'}))      
        .pipe(gulp.dest('dist/js')) 
        .pipe(browserSync.reload({stream: true})) 
});

/* Task to minify and move images to dist/img */
gulp.task('image:build', function(){
    gulp.src('app/img/**/*.*') 
        .pipe(imagemin({ 
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest('dist/img'))    
});

/* Task to move svg files to dist/svg */
gulp.task('svg:build', function(){
    gulp.src('app/svg/**/*.*')
        .pipe(gulp.dest('dist/svg'))
});

/* Task to move fonts to dist/fonts */
gulp.task('fonts:build', function(){
    gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'))
});

/* Task to remove previous dist folder before starting new build */
gulp.task('clean', function(){
    return del.sync('dist'); 
});

/* The almighty build */
gulp.task('build', [ 
	'clean',
    'html:build',
    'js:build',  
    'style:build',
    'fonts:build',
    'svg:build',
    'image:build'
]);

/* Task to synchronize with browser */
gulp.task('browser-sync', function(){
   browserSync({ 
        server: { 
           baseDir: 'dist' 
      },
        notify: false 
    });
});

/* Task to watch file changes and reload browser */
gulp.task('watch', ['browser-sync'], function(){  
    gulp.watch('app/**/*.html', ['html:build']); 
    gulp.watch('dist/*.html', browserSync.reload); 

    gulp.watch('app/scss/**/*.scss', ['style:build']); 
    gulp.watch('dist/css/*.css', browserSync.reload); 

    gulp.watch('app/js/**/*.js', ['js:build']); 
    gulp.watch('dist/js/*.js', browserSync.reload);
});