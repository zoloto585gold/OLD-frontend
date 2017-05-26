var ENVIROMENT = 'local';
// var ENVIROMENT = 'production';

var JS_PATH = (ENVIROMENT !== 'local') ? '/bitrix/templates/zoloto/frontend/js/' : 'js/'; // PROD or LOCAL
var JS_VIEWS = JS_PATH + 'views/';
var JS_RENDER = JS_PATH + 'render/';
var JS_DATA = JS_PATH + 'data/';

(function () {
	/**
	 * ленивая погрузка шаблонов
	 * для jsrender
	 * lazyGetTemplate
	 *    name - имя шаблона в $.templates,
	 *    pathToTemplateFile - путь к файлу шаблона
	 */
	function lazyGetTemplate(name, pathToTemplateFile) {
		var deferred = $.Deferred();
		var basePath = pathToTemplateFile || (JS_PATH + 'views/');
		if ($.templates[name]) {
			deferred.resolve();
		} else {
			$.getScript(basePath + name + '.js')
				.then(function() {
					if ($.templates[name]) {
						deferred.resolve();
						// console.log('@lazyGetTemplate: шаблон "' + name + '.js"(' + basePath + ') подгрузился');
					} else {
						// console.log('@lazyGetTemplate: шаблон "' + name + '.js"(' + basePath + ') не подгрузился');
						deferred.reject();
					}
				});
		}
		return deferred.promise();
	}

	/*
	=
	=
	=
	=
	=
	=
	=
	=
	=
	=
	=
	=
	=
	 */


	var NODE = 'basket';
	var PAGE = NODE + '/';
	var VIEWS_PATH = JS_VIEWS + PAGE;
	// var PAGE = 

	$.when(
			lazyGetTemplate('basket-list-template', VIEWS_PATH)
		)
		.done(function () {
			$.getJSON(JS_DATA + 'basket.json', function (data) {
				var $where = document.querySelector('#basket-list-section');

				$where.innerHTML += $.templates['basket-list-template'].render(data);

				// пересчет итоговой суммы
				basketCalculation();
			});
		});


	// удаление товара из корзины
	$(document).on('click', '.js-basket-item-remove', function (e) {
		var targetID = $(this).attr('data-id');

		$('.basket-item[data-id="' + targetID + '"]').remove();

		// пересчет итоговой суммы
		basketCalculation();
	});


	// подсчет общего чека
	function basketCalculation() {
		var total = 0;

		$('.basket-item').each(function () {
			total += +$(this).attr('data-cost');
		});

		document.querySelector('#basket-total-value').innerHTML = total;
	}
}());
