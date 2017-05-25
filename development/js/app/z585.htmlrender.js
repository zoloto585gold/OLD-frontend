(function () {
	var HTMLRender = Z585.define('Z585.HTMLRender');

	HTMLRender.lazyGetTemplate = function (name, pathToTemplateFile) {
		var deferred = $.Deferred();
		var basePath = pathToTemplateFile || '/bitrix/templates/zoloto/js/views/';
		if ($.templates[name]) {
			deferred.resolve();
		} else {
			$.getScript(basePath + name + '.js')
				.then(function() {
					if ($.templates[name]) {
						deferred.resolve();
						// console.log('@lazyGetTemplate: шаблон "' + name + '.js"(' + basePath + ') подгрузился');
					} else {
						console.log('@lazyGetTemplate: шаблон "' + name + '.js"(' + basePath + ') не подгрузился');
						deferred.reject();
					}
				});
		}
		return deferred.promise();
	}
} ());