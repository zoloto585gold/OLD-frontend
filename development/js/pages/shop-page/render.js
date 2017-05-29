(function () {

	var url;
	var templateName = 'shop-page-template';
	var dataRawPath = Z585.HTMLRender.getDataRawByName('shops');


	// В зависимости от значения ПРОД/ДЕВ/ЛОКАЛ
	// устанавливаем url, по которому искать нужный магазин
	if(Z585.main.isLocal) {
		// для ЛОКАЛ используется один url
		url = '/about/address/gatchina/pushkinskoe-shosse-15a/';
	} else {
		// на ДЕВ и ПРОД интересуемый url берется из адресной строки
		url = window.location.pathname;
	}


	$.when(
			Z585.HTMLRender.lazyGetTemplate(templateName)
		)
		.done(function () {
			$.getJSON(dataRawPath, function (dataRaw) {
				// находим объект нужного магазина по его URL'у
				var result = Z585.data.shops.getShopByURL(url, dataRaw);

				// result = Z585.data.shops.shopValidate(result);

				// рендеринг страницы
				if(!result) {
					Z585.debug.log('Не нашел URL\'а :: ' + '  ' + url);
				} else {
					$('.shop-info').html($.templates[templateName].render(result));
				}

				// копирование GPS-координат в буфер обмена 
				$(document).on('click', '.js-clipboard-button', function (e) {
					Z585.main.copyToClipBoard($(this));
				});
			});
		});
}());