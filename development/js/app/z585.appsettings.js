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