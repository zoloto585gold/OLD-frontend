(function () {
	var HTMLRender = Z585.define('Z585.HTMLRender');

	HTMLRender.lazyGetTemplate = function (templateName) {
		var deferred = $.Deferred();
		var templateFile = this.templatesList[templateName][Z585.main.getEnvironment()];

		if ($.templates[templateName]) {
			deferred.resolve();
		} else {
			$.getScript(templateFile)
				.then(function() {
					if ($.templates[templateName]) {
						deferred.resolve();
						// console.log('@lazyGetTemplate: шаблон "' + templateFile + '"  подгрузился');
					} else {
						console.log('@lazyGetTemplate: шаблон "' + templateFile + '" не подгрузился');
						deferred.reject();
					}
				});
		}
		return deferred.promise();
	}

	HTMLRender.templatesList = {
		'shop-page-template': {
			'LOCAL': 'js/views/shop-page-template.js',
			'DEV': '/bitrix/templates/zoloto/frontend/js/views/shop-page-template.js',
			'PROD': '/bitrix/templates/zoloto/frontend/js/views/shop-page-template.js'
		},

		'store-item-template': {
			'LOCAL': 'js/views/store-item-template.js',
			'DEV': '/bitrix/templates/zoloto/frontend/js/views/store-item-template.js',
			'PROD': '/bitrix/templates/zoloto/frontend/js/views/store-item-template.js'
		},

		'store-list-template': {
			'LOCAL': 'js/views/store-list-template.js',
			'DEV': '/bitrix/templates/zoloto/frontend/js/views/store-list-template.js',
			'PROD': '/bitrix/templates/zoloto/frontend/js/views/store-list-template.js'
		},

		'store-cities-list-template': {
			'LOCAL': 'js/views/store-cities-list-template.js',
			'DEV': '/bitrix/templates/zoloto/frontend/js/views/store-cities-list-template.js',
			'PROD': '/bitrix/templates/zoloto/frontend/js/views/store-cities-list-template.js'
		},
	};


	HTMLRender.dataRaw = {
		'shops': {
			'LOCAL': 'js/data/shops.json',
			'DEV': '/bitrix/templates/zoloto/components/bitrix/catalog.store.list/custom/json.php',
			'PROD': '/bitrix/templates/zoloto/components/bitrix/catalog.store.list/custom/json.php'
		}
	};

	HTMLRender.getDataRawByName = function (dataRawName) {
		return this.dataRaw[dataRawName][Z585.main.getEnvironment()];
	};


} ());