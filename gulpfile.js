'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const fs = require('fs');
const path = require('path');
const zip = require('gulp-zip');
const fileinclude = require('gulp-file-include');
const order = require('gulp-order');
const uglifyjs = require('gulp-uglifyjs');
// const mainBowerFiles = require('gulp-main-bower-files');
const sourcemaps = require('gulp-sourcemaps');
const assign = require('object-assign');
const browserSync = require('browser-sync');
const modRewrite = require('connect-modrewrite');
const reload = browserSync.reload;
// Image Optimize
const imagemin = require('gulp-imagemin');
// Autoprefixer
const autoprefixer = require('gulp-autoprefixer');
 
// gulp.task('default', () =>
//     gulp.src('src/app.css')
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         }))
//         .pipe(gulp.dest('dist'))
// );

// =============================================
// Если нужно перекрыть объект в конфиге создаем
// файл gulp.conf.json в корне (подробнее в pr/2017/_10005.md)
const confPath = './gulp.conf.json';
const config = assign({
	connect: {
		server: {
			baseDir: [ './development', './production' ]
		},
		tunnel: false,
		host: 'localhost',
		port: 9000,
		logPrefix: 'Frontend_z585',
		middleware: [
			modRewrite([
				'/bitrix/templates/zoloto/frontend/fonts /fonts [L]',
				'/bitrix/templates/zoloto/frontend/images /img [L]',
			])
		]
	},

	path: {
		js: {
			libs: [
				// @todo: gulp-order
				'development/js/libs/plugins/picturefill.min.js',
				//
				'development/js/libs/jqueryteam/jquery-1.11.1.min.js',
				'development/js/libs/jqueryteam/owl.carousel.js',
				'development/js/libs/jqueryteam/select.js',
				'development/js/libs/jqueryteam/jquery-ui.js',
				'development/js/libs/jqueryteam/jquery.ui.touch-punch.min.js',
				'development/js/libs/jqueryteam/jquery.ui.datepicker-ru.js',
				'development/js/libs/jqueryteam/jquery.touchSwipe.min.js',
				'development/js/libs/jqueryteam/jquery.zoom.js',
				'development/js/libs/jqueryteam/fotorama.js',
				'development/js/libs/jqueryteam/jquery.mousewheel.js',
				'development/js/libs/jqueryteam/perfect-scrollbar.js',
				'development/js/libs/jqueryteam/jquery.magnific-popup.js',
				'development/js/libs/jqueryteam/jquery.plugin.js',
				'development/js/libs/jqueryteam/jquery.countdown.js',
				'development/js/libs/jqueryteam/jquery.countdown-ru.js',
				'development/js/libs/jqueryteam/jquery.inputmask.js',
				'development/js/libs/jqueryteam/jquery.validate.min.js',
				'development/js/libs/jqueryteam/jquery.cookie.js',
				'development/js/libs/jqueryteam/jquery.jscrollpane.min.js',
				'development/js/libs/jqueryteam/jquery.formstyler.min.js',
				'development/js/libs/jqueryteam/jquery.session.js',
				'development/js/libs/jqueryteam/jquery.easydropdown.js',
				'development/js/libs/jqueryteam/jquery.maskedinput.min.js',
				'development/js/libs/jqueryteam/selectivizr-min.js',
				'development/js/libs/jqueryteam/TweenMax.min.js',
				//
				'development/js/libs/jsrender/jsrender.js',
				//
				'development/js/libs/**/*.js',
				'!development/js/libs/jqueryteam/jquery-1.11.0.min.js',
			],

			app: [
				// @todo: gulp-order
				'development/js/app/z585.js',
				'development/js/app/z585.main.js',
				'development/js/app/z585.data.js',
				'development/js/app/z585.htmlrender.js',
				'development/js/app/z585.debug.js',
				'development/js/app/z585.yamaps.js',
				'development/js/app/z585.basket.js',
			],

			pages: [
				'development/js/pages/**/*.js',
			],

			views: [
				'development/js/views/*.js'
			],

			msalnikov: [
				'development/js/inc/*.js',
			],
		},

		less: [
			'development/less/scaffolding/z585-all.less',
		],

		html: [
			'development/htmls/*.tmpl',
			'!development/htmls/your-page.tmpl'
		],

		adfox: {
			less: [
				'development/less/mixins/@path-global.less',
				'development/less/scaffolding/mixins.less',
				'development/less/scaffolding/layout__fonts.less',
				'development/less/scaffolding/layout__adfox.less',
			],
			js: [
				'development/js/jqueryteam/jquery-1.11.1.min.js',
				'development/js/jqueryteam/TweenMax.min.js',
				'development/js/countdown.js'
			]
		}
	},
}, fs.existsSync(confPath) ? require(confPath) : {});

const helper = {

	/**
	 * Возвращает переданный флаг
	 * gulp taskname --arg1 HELLO --arg2 BYE
	 */
	getArg: function(key) {
		let index = process.argv.indexOf('--' + key);
		let next = process.argv[index + 1];
		return (index < 0) ? null : (!next || next[0] === '-') ? true : next;
	},

	/**
	 * Возвращает список директорий
	 */
	getFolders: function(dir) {
		return fs.readdirSync(dir)
			.filter(function(file) {
				return fs.statSync(path.join(dir, file)).isDirectory();
			});
	},

};

// Запуск локального сервера для лайврелоада
gulp.task('webserver', function () {
	browserSync(config.connect);
});

// =================== JavaScript ===================

// JS Libs
gulp.task('js:libs', function () {
	return gulp.src(config.path.js.libs)
		.pipe(concat('libs.min.js'))
		.pipe(uglifyjs())
		.pipe(gulp.dest('production/js/'))
		.pipe(reload({stream: true}));
});

// JS App
gulp.task('js:app', function () {
	return gulp.src(config.path.js.app)
		//.pipe(sourcemaps.init({loadMaps: true}))
		//.pipe(concat('app.js'))
		//.pipe(sourcemaps.write())
		.pipe(uglifyjs('app.min.js', {
			outSourceMap: true
		}))
		.pipe(gulp.dest('production/js/'))
		.pipe(reload({stream: true}));
});

// JS Pages
gulp.task('js:pages', function () {
	var pagesPath = 'development/js/pages/';
	var folders = helper.getFolders(pagesPath);

	var tasks = folders.map(function(folder) {
		return gulp.src(path.join(pagesPath, folder, '/*.js'))
			//.pipe(sourcemaps.init({loadMaps: true}))
			//.pipe(concat(folder + '.js'))
			//.pipe(sourcemaps.write())
			//.pipe(gulp.dest('production/js'))
			//.pipe(rename({ suffix: '.min' }))
			.pipe(uglifyjs(folder + '.min.js', {
				outSourceMap: true
			}))
			.pipe(gulp.dest('production/js'))
			.pipe(reload({stream: true}));
	});

	return tasks;
});

// JS Views
gulp.task('js:views', function () {
	return gulp.src(config.path.js.views)
		.pipe(gulp.dest('production/js/views/'))
		.pipe(reload({stream: true}));
});

// JS Adfox
gulp.task('js:adfox', function () {
	return gulp.src(config.path.adfox.js)
		//.pipe(sourcemaps.init({loadMaps: true}))
		//.pipe(concat('adfox.js'))
		//.pipe(sourcemaps.write())
		.pipe(uglifyjs('adfox.min.js', {
			outSourceMap: true
		}))
		.pipe(gulp.dest('production/js/'));
});

// msalnikov.js
// @todo: переделать, сделать более понятным
gulp.task('js:msalnikov', function () {
	return gulp.src(config.path.js.msalnikov)
		.pipe(concat('msalnikov.js'))
		.pipe(gulp.dest('development/js/legacy'))
		.pipe(reload({stream: true}));
});

gulp.task('js:legacy', function() {
    return gulp.src('development/js/legacy/*.js')
			.pipe(uglifyjs('legacy.min.js', {
				outSourceMap: true
			}))
		 .pipe(gulp.dest('development/js'))
     .pipe(gulp.dest('production/js'))
	   .pipe(reload({stream: true}));
});

// JS ALL TASKS
gulp.task('js:build', [
	'js:libs',
	'js:app',
	'js:pages',
	'js:views',
	'js:adfox',
	// 'js:msalnikov',
	'js:legacy',
]);

// =================== HTML ===================

// HTML Build
gulp.task('html:build', function () {
	return gulp.src(config.path.html)
		.pipe(fileinclude({
			prefix: '@@'
		}))
		.pipe(rename({
			extname: '.html'
		}))
		.pipe(gulp.dest('development'))
		.pipe(browserSync.stream({once: true}));
});

// =================== LESS/CSS ===================

// CSS Build Development
gulp.task('css:build--dev', function () {
	return gulp.src(config.path.less)
		.pipe(concat('z585_all.css'))
		.pipe(less())
		.pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: true
        }))        
		.pipe(gulp.dest('production/css'))
		.pipe(reload({stream: true}));
});

// CSS Build Production
gulp.task('css:build--prod', function () {
	return gulp.src(config.path.less)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(concat('z585_all.min.css'))
		.pipe(less())
		.pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: true
        }))				
        .pipe(sourcemaps.write('./'))
		.pipe(cssmin())
		.pipe(gulp.dest('production/css'))		
		.pipe(reload({stream: true}));
});

// CSS Adfox
gulp.task('css:adfox', function () {
	return gulp.src(config.path.adfox.less)
		.pipe(concat('z585_adfox.min.css'))
		.pipe(less())
		.pipe(cssmin())
		.pipe(gulp.dest('production/css'))
		.pipe(reload({stream: true}));
});

// =============== IMAGE MIN ==================
gulp.task('img:build', function() {
	gulp.src('development/img/**/*.*')
  	.pipe(imagemin({
	    interlaced: true,
	    progressive: true,
	    optimizationLevel: 5,
	    svgoPlugins: [{removeViewBox: true}]
	}))
    .pipe(gulp.dest('production/images/'));
});


// =================== BUILD ===================
gulp.task('build', [
	'js:build',
	'css:build--dev',
	'css:build--prod',
	'css:adfox',
	'html:build',
	//'img:build',
]);

// =================== WATCH ===================
gulp.task('watch', [ 'build' ], function() {

	// HTML
	gulp.watch( ['development/htmls/**/*.{tmpl,html}'], ['html:build'] );

	// Less
    //gulp.watch('development/less/**/*.less', [ 'css:build', 'css:adfox' ]);
    gulp.watch('development/less/**/*.less', [ 'css:build--dev' ]);

	// JS
	gulp.watch('development/js/inc/*.js', [ 'js:msalnikov' ] );
	gulp.watch('development/js/legacy/*.js', [ 'js:legacy' ] );
	gulp.watch('development/js/libs/**/*.js', [ 'js:libs' ] );
	gulp.watch('development/js/app/*.js', [ 'js:app' ] );
	gulp.watch('development/js/pages/**/*.js', [ 'js:pages' ] );
	gulp.watch('development/js/views/*.js', [ 'js:views' ] );

});

// =================== START ===================
gulp.task('default', [ 'webserver', 'watch' ]);
