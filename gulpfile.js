var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

var zip = require('gulp-zip');
var fileinclude = require('gulp-file-include');
var order = require('gulp-order');
var uglifyjs = require('gulp-uglifyjs');
// var mainBowerFiles = require('gulp-main-bower-files');
var sourcemaps = require('gulp-sourcemaps');

var adfoxList = {
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

var srcList = {
	js: {
		libs: [
			'development/js/libs/plugins/picturefill.min.js',
			// 
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
			// 
			'development/js/libs/jsrender/jsrender.js',
			// 
			// 
			// development/js/libs/z585
		],

		app: [
			'development/js/app/z585.js',
			'development/js/app/z585.main.js',
			'development/js/app/z585.data.js',
			'development/js/app/z585.htmlrender.js',
			'development/js/app/z585.debug.js',
			// 'development/js/app/',
			// 'development/js/app/',
			// 'development/js/app/',
			// 'development/js/app/',
		],

		shopPage: [
			'development/js/pages/shop-page/render.js',
		],

		storesPage: [
			'development/js/pages/stores-page/render.js',
		],
	},
};




/*
	JS
*/
gulp.task('make-msalnikov-js', function () {
	return gulp.src(['development/js/inc/global.forms.js', 'development/js/inc/header.geo-form.js', 'development/js/inc/header.main-nav.js', 'development/js/inc/index.filter.js', 'development/js/inc/catalog.filter.js'])
		.pipe(concat('msalnikov.js'))
		.pipe(gulp.dest('development/js'));
});



// Libs
gulp.task('js:libs', function () {
	return gulp.src(srcList.js.libs)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(concat('libs.js'))
		.pipe(uglifyjs())
		.pipe(rename('libs.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('development/js/'));
});

// App
gulp.task('js:app', function () {
	return gulp.src(srcList.js.app)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(concat('app.js'))
		.pipe(uglifyjs())
		.pipe(rename('app.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('development/js/'));
});

// shop-page
gulp.task('js:shop-page', function () {
	return gulp.src(srcList.js.shopPage)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(concat('shop-page.js'))
		.pipe(uglifyjs())
		.pipe(rename('shop-page.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('development/js/'));
});

// stores-page
gulp.task('js:stores-page', function () {
	return gulp.src(srcList.js.storesPage)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(concat('stores-page.js'))
		.pipe(uglifyjs())
		.pipe(rename('stores-page.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('development/js/'));
});






gulp.task('make-jqueryteam', function () {
	return gulp.src(jQueryTeamOrderList)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(concat('jqueryteam.js'))
		.pipe(uglifyjs())
		.pipe(rename('jqueryteam.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('development/js/'));
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/*
 * *************
 * NEW GULP FILE
 * *************
 */
//
//
//
//
//
//
// HTML Building
//
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
//
//
//
//
// CSS Building
//
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
// 
gulp.task('watch', function() {
	gulp.watch( ['development/htmls/**/*.{tmpl,html}'], ['html:build'] );
    gulp.watch( [
		'development/less/**/*.less',
		'!development/less/z585-all-list.*',
	], [
		'z585-css:local-scaff',
		'z585-css:local-build',
	] );
});

gulp.task('default', ['watch']);
