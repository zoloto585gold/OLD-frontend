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
const browserSync = require('browser-sync');
const reload = browserSync.reload;

const config = {
	connect: {
		server: {
			baseDir: './development'
		},
		tunnel: false,
		host: 'localhost',
		port: 9000,
		logPrefix: 'Frontend_z585',
	},

	path: {
		js: {
			libs: [
				'development/js/libs/**/*.js',
				'!development/js/libs/jqueryteam/jquery-1.11.0.min.js',
			],

			app: [
				'development/js/app/z585.js',
				'development/js/app/z585.main.js',
				'development/js/app/z585.data.js',
				'development/js/app/z585.htmlrender.js',
				'development/js/app/z585.debug.js',
			],

			pages: [
				'development/js/pages/**/*.js',
			],

			views: [
				'development/js/views/*.js'
			],
		}
	},
};

const adfoxList = {
	css: [
		'development/less/scaffolding/mixins.less',
		'development/less/scaffolding/layout__fonts.less',
		'development/less/scaffolding/layout__adfox.less',
	],
	js: [
		'development/js/jqueryteam/jquery-1.11.1.min.js',
		'development/js/jqueryteam/TweenMax.min.js',
		'development/js/countdown.js'
	]
};

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

/*
	JS
*/
gulp.task('make-msalnikov-js', function () {
	return gulp.src(['development/js/inc/global.forms.js', 'development/js/inc/header.geo-form.js', 'development/js/inc/header.main-nav.js', 'development/js/inc/index.filter.js', 'development/js/inc/catalog.filter.js'])
		.pipe(concat('msalnikov.js'))
		.pipe(gulp.dest('development/js'));
});

// JS Libs
gulp.task('js:libs', function () {
	return gulp.src(config.path.js.libs)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(concat('libs.js'))
		.pipe(uglifyjs())
		.pipe(rename('libs.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('development/js/'))
		.pipe(gulp.dest('production/js/'))
		.pipe(reload({stream: true}));
});

// JS App
gulp.task('js:app', function () {
	return gulp.src(config.path.js.app)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(concat('app.js'))
		.pipe(uglifyjs())
		.pipe(rename('app.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('development/js/'))
		.pipe(gulp.dest('production/js/'))
		.pipe(reload({stream: true}));
});

// JS Pages
gulp.task('js:pages', function () {
	var pagesPath = 'development/js/pages/';
	var folders = helper.getFolders(pagesPath);

	var tasks = folders.map(function(folder) {
		return gulp.src(path.join(pagesPath, folder, '/*.js'))
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(concat(folder + '.js'))
			.pipe(uglifyjs())    
			.pipe(rename(folder + '.min.js')) 
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('development/js'))
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

// JS Build
gulp.task('js:build', [
	'js:libs',
	'js:libs',
	'js:app',
	'js:pages',
	'js:views',
]);

//
//
/*
 * *************
 * NEW GULP FILE
 * *************
 */
//
//
// HTML Building
//
// html:build
gulp.task('html:build', function () {
	return gulp.src(['development/htmls/*.tmpl', '!development/htmls/your-page.tmpl'])
		.pipe(fileinclude({
			prefix: '@@'
		}))
		.pipe(rename({
			extname: '.html'
		}))
		.pipe(gulp.dest('development'));
});
//
// CSS Building
//
// z585-all-css
var z585AllScaffoldingList = [
	//
	'development/less/scaffolding/mixins.less',
	'development/less/scaffolding/layout__fonts.less',
	'development/less/scaffolding/layout__external.less',

	// старый css
	'development/less/scaffolding/legacy__all.less',

	// базовые стили макета страниц
	'development/less/scaffolding/layout__grid.less',
	'development/less/scaffolding/layout__uikit.less',
	'development/less/scaffolding/layout__header.less',
	'development/less/scaffolding/layout__footer.less',

	// стили шаблонов страниц (постранично)
	'development/less/scaffolding/pages__index.less',
	'development/less/scaffolding/pages__product-card.less',
	'development/less/scaffolding/pages__catalog.less',
	'development/less/scaffolding/pages__page-404.less',
	'development/less/scaffolding/pages__user-cabinet.less',
	'development/less/scaffolding/pages__store.less',
	'development/less/scaffolding/pages__stock.less',
	'development/less/scaffolding/pages__favorites.less',
	'development/less/scaffolding/pages__shop.less',
	'development/less/scaffolding/pages__basket.less',

	// latest legacy
	'development/less/scaffolding/legacy__latest.less',

	// system
	'development/less/scaffolding/system__helpers.less',
];

/*
 Пять "тасков" для работы с LESS, для получения файла z585_all.min.css для локальной версии сайта(та что на localhost дома на компе) и версии, кторая идет на "прод" и "дев" сервера

	z585-css:local-scaff
	z585-css:local-build
	z585-css:prod-scaff
	z585-css:prod-build
 */
gulp.task('z585-css:prod-scaff', function () {
	if(z585AllScaffoldingList[0] === 'development/less/_2dev.less') z585AllScaffoldingList.shift();
	z585AllScaffoldingList.unshift('development/less/_2prod.less');

	return gulp.src(z585AllScaffoldingList)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(concat('z585-all-list.prod.less'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('development/less/'));
});

gulp.task('z585-css:prod-build', function () {
	return gulp.src('development/less/z585-all-list.prod.less')
		.pipe(less())
		.pipe(cssmin())
		.pipe(rename('z585_all.min.css'))
		.pipe(gulp.dest('production/css'));
});

gulp.task('z585-css:local-scaff', function () {
	if(z585AllScaffoldingList[0] === 'development/less/_2prod.less') z585AllScaffoldingList.shift();
	z585AllScaffoldingList.unshift('development/less/_2dev.less');

	return gulp.src(z585AllScaffoldingList)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(concat('z585-all-list.local.less'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('development/less/'));
});

gulp.task('z585-css:local-build', function () {
	return gulp.src('development/less/z585-all-list.local.less')
		.pipe(less())
		// .pipe(cssmin())
		.pipe(rename('z585_all.min.css'))
		.pipe(gulp.dest('development/css'));
});

// 
gulp.task('z585-css', ['z585-css:local-scaff', 'z585-css:prod-scaff', 'z585-css:local-build', 'z585-css:prod-build']);



/**
 * for Adfox
 */
gulp.task('adfox:js:local', function () {
	return gulp.src(adfoxList.js)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(concat('adfox.js'))
		.pipe(uglifyjs())
		.pipe(rename('z585_adfox.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('development/js/'));
});
gulp.task('adfox:js:prod', function () {
	return gulp.src(adfoxList.js)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(concat('adfox.js'))
		.pipe(uglifyjs())
		.pipe(rename('z585_adfox.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('production/js/'));
});

gulp.task('adfox:css:prod-scaff', function () {
	if(adfoxList.css[0] === 'development/less/_2dev.less') adfoxList.css.shift();
	adfoxList.css.unshift('development/less/_2prod.less');

	return gulp.src(adfoxList.css)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(concat('z585_adfox.prod.less'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('development/less/'));
});

gulp.task('adfox:css:prod-build', function () {
	return gulp.src('development/less/z585_adfox.prod.less')
		.pipe(less())
		.pipe(cssmin())
		.pipe(rename('z585_adfox.min.css'))
		.pipe(gulp.dest('production/css'));
});

gulp.task('adfox:css:local-scaff', function () {
	if(adfoxList.css[0] === 'development/less/_2prod.less') adfoxList.css.shift();
	adfoxList.css.unshift('development/less/_2dev.less');

	return gulp.src(adfoxList.css)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(concat('z585_adfox.local.less'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('development/less/'));
});

gulp.task('adfox:css:local-build', function () {
	return gulp.src('development/less/z585_adfox.local.less')
		.pipe(less())
		.pipe(rename('z585_adfox.min.css'))
		.pipe(gulp.dest('development/css'));
});

gulp.task('adfox', ['adfox:js:local', 'adfox:js:prod', 'adfox:css:local-scaff', 'adfox:css:prod-scaff', 'adfox:css:local-build', 'adfox:css:prod-build']);

// 
// Watch
gulp.task('watch', function() {

	// HTML
	gulp.watch( ['development/htmls/**/*.{tmpl,html}'], ['html:build'] );

	// Less
    gulp.watch( [
		'development/less/**/*.less',
		'!development/less/z585-all-list.*',
	], [
		'z585-css:local-scaff',
		'z585-css:local-build',
	]);

	// JS
	gulp.watch('development/js/libs/**/*.js', [ 'js:libs' ] );
	gulp.watch('development/js/app/*.js', [ 'js:app' ] );
	gulp.watch('development/js/pages/**/*.js', [ 'js:pages' ] );
	gulp.watch('development/js/views/*.js', [ 'js:views' ] );

});

gulp.task('default', [ 'webserver', 'watch' ]);
