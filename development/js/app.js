var Z585 = Z585 || {};

Z585.define = function (namespace) {
	var parts = namespace.split('.'),
		parent = Z585,
		i;

	if(parts[0] === 'Z585') {
		parts = parts.slice(1);
	}

	for(i = 0; i < parts.length; i++) {
		if(typeof parent[parts[i]] === 'undefined') {
			parent[parts[i]] = {};
		}

		parent = parent[parts[i]];
	}

	return parent;
};
console.time('Z585.appSettings');
(function () {
	var appSettings = Z585.define('Z585.appSettings');

	/*
		ENVIRONMENT, окружени[я]
		"prod" - сайт продакшна
		"dev" - битрикс-сервера разработчиков
		"local" - локальные сервера разработчиков(без битрикс)
	 */

	var environment = appSettings.environment = 'prod';

	var baseImageURL,
		baseJSURL;

	if(environment === 'prod') {
		baseImageURL = '/bitrix/templates/zoloto/frontend/images';
		baseJSURL = '/bitrix/templates/zoloto/frontend/js';
	} else if(environment === 'dev') {
		baseImageURL = '/bitrix/templates/zoloto/frontend/images';
	} else if(environment === 'local') {
		baseImageURL = 'img';
		baseJSURL = 'js';
	}

	appSettings.images = baseImageURL;
	appSettings.js = baseJSURL;
} ());
console.timeEnd('Z585.appSettings');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIno1ODUuanMiLCJ6NTg1LmFwcHNldHRpbmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFo1ODUgPSBaNTg1IHx8IHt9O1xyXG5cclxuWjU4NS5kZWZpbmUgPSBmdW5jdGlvbiAobmFtZXNwYWNlKSB7XHJcblx0dmFyIHBhcnRzID0gbmFtZXNwYWNlLnNwbGl0KCcuJyksXHJcblx0XHRwYXJlbnQgPSBaNTg1LFxyXG5cdFx0aTtcclxuXHJcblx0aWYocGFydHNbMF0gPT09ICdaNTg1Jykge1xyXG5cdFx0cGFydHMgPSBwYXJ0cy5zbGljZSgxKTtcclxuXHR9XHJcblxyXG5cdGZvcihpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRpZih0eXBlb2YgcGFyZW50W3BhcnRzW2ldXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0cGFyZW50W3BhcnRzW2ldXSA9IHt9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHBhcmVudCA9IHBhcmVudFtwYXJ0c1tpXV07XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcGFyZW50O1xyXG59OyIsImNvbnNvbGUudGltZSgnWjU4NS5hcHBTZXR0aW5ncycpO1xyXG4oZnVuY3Rpb24gKCkge1xyXG5cdHZhciBhcHBTZXR0aW5ncyA9IFo1ODUuZGVmaW5lKCdaNTg1LmFwcFNldHRpbmdzJyk7XHJcblxyXG5cdC8qXHJcblx0XHRFTlZJUk9OTUVOVCwg0L7QutGA0YPQttC10L3QuFvRj11cclxuXHRcdFwicHJvZFwiIC0g0YHQsNC50YIg0L/RgNC+0LTQsNC60YjQvdCwXHJcblx0XHRcImRldlwiIC0g0LHQuNGC0YDQuNC60YEt0YHQtdGA0LLQtdGA0LAg0YDQsNC30YDQsNCx0L7RgtGH0LjQutC+0LJcclxuXHRcdFwibG9jYWxcIiAtINC70L7QutCw0LvRjNC90YvQtSDRgdC10YDQstC10YDQsCDRgNCw0LfRgNCw0LHQvtGC0YfQuNC60L7QsijQsdC10Lcg0LHQuNGC0YDQuNC60YEpXHJcblx0ICovXHJcblxyXG5cdHZhciBlbnZpcm9ubWVudCA9IGFwcFNldHRpbmdzLmVudmlyb25tZW50ID0gJ3Byb2QnO1xyXG5cclxuXHR2YXIgYmFzZUltYWdlVVJMLFxyXG5cdFx0YmFzZUpTVVJMO1xyXG5cclxuXHRpZihlbnZpcm9ubWVudCA9PT0gJ3Byb2QnKSB7XHJcblx0XHRiYXNlSW1hZ2VVUkwgPSAnL2JpdHJpeC90ZW1wbGF0ZXMvem9sb3RvL2Zyb250ZW5kL2ltYWdlcyc7XHJcblx0XHRiYXNlSlNVUkwgPSAnL2JpdHJpeC90ZW1wbGF0ZXMvem9sb3RvL2Zyb250ZW5kL2pzJztcclxuXHR9IGVsc2UgaWYoZW52aXJvbm1lbnQgPT09ICdkZXYnKSB7XHJcblx0XHRiYXNlSW1hZ2VVUkwgPSAnL2JpdHJpeC90ZW1wbGF0ZXMvem9sb3RvL2Zyb250ZW5kL2ltYWdlcyc7XHJcblx0fSBlbHNlIGlmKGVudmlyb25tZW50ID09PSAnbG9jYWwnKSB7XHJcblx0XHRiYXNlSW1hZ2VVUkwgPSAnaW1nJztcclxuXHRcdGJhc2VKU1VSTCA9ICdqcyc7XHJcblx0fVxyXG5cclxuXHRhcHBTZXR0aW5ncy5pbWFnZXMgPSBiYXNlSW1hZ2VVUkw7XHJcblx0YXBwU2V0dGluZ3MuanMgPSBiYXNlSlNVUkw7XHJcbn0gKCkpO1xyXG5jb25zb2xlLnRpbWVFbmQoJ1o1ODUuYXBwU2V0dGluZ3MnKTsiXX0=
