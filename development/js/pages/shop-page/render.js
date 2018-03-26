(function () {

	var url;
	//var templateName = 'shop-page-template';
	//var dataRawPath = Z585.HTMLRender.getDataRawByName('shops');


	// В зависимости от значения ПРОД/ДЕВ/ЛОКАЛ
	// устанавливаем url, по которому искать нужный магазин
	if(Z585.main.isLocal) {
		// для ЛОКАЛ используется один url
		url = '/about/address/gatchina/pushkinskoe-shosse-15a/';
	} else {
		// на ДЕВ и ПРОД интересуемый url берется из адресной строки
		url = window.location.pathname;
	}

	// копирование GPS-координат в буфер обмена
	$(document).on('click', '.js-clipboard-button', function (e) {
		Z585.main.copyToClipBoard($(this));
	});	


	$(document).ready(function(){
		// инициализация карты
		ymaps.ready(storeMapInit());	
	});
	

	// ф-я описывающая работу с картой на странице "Адреса магазинов"
	function storeMapInit() { // (storeData)
		return function () {
			var STORE_POINT_FOCUS_ZOOM = 17; // уровень zoom'а для конкретного магазина(т.е. после того как пользователь кликнул на метку)
			var GPS_N = $('#GPS_N').text();
			var GPS_S = $('#GPS_S').text();
			//console.log('GPS_N - '+GPS_N+' GPS_S - '+GPS_S);
			var myMap = new ymaps.Map("map", {
					center: [GPS_N, GPS_S], // Координаты центра карты
					zoom: 16 // Zoom
				});

			/**
			 * УСТАНОВКА КОНТРОЛОВ КАРТЫ:
			 *  - кнопки зума
			 *  - возможность скпроллировать масштаб карты(колесо мишы)
			 */
			 myMap.controls.add(new ymaps.control.ZoomControl());
			 myMap.behaviors.enable('scrollZoom');


			/**
			 * Создаем массив меток 
			 * и помещаем их 
			 * на карте
			 */
			var storesPlacemarkCollection = new ymaps.GeoObjectCollection();
			var storesPlacemarks;
			
			//for (var i = 0; i < storeData.length; i++) {
		 	storesPlacemarks = new ymaps.Placemark([GPS_N, GPS_S],
		 	{
		 		storeIDByGPS: GPS_N + '__' + GPS_N,
		 		/*storeIDByXML: 'XML_ID',
		 		storeCity: 'CITY',
		 		storeAddress: 'ADDRESS',*/
		 		storeGPSCoords: [GPS_N, GPS_S],
		 	},
		 	{
		 		iconLayout: 'default#image',
		 		iconImageHref: '/bitrix/templates/zoloto/frontend/images/sprites/sprite__primary-icon-set.png', 
		 		iconImageSize: [33, 44],
		 		iconImageClipRect: [[99, 393], [132, 437]]
		 	});
		 	storesPlacemarkCollection.add(storesPlacemarks);
			//}
			
			myMap.geoObjects.add(storesPlacemarkCollection);

			// ****************************************
			// клик по метке на карте
			// модальное окно с предложением 
			// "БРОНИРОВАТЬ ИЗДЕЛИЕ" в этом магазине
			// ****************************************
			
			/*myMap.geoObjects.events.add('click', function (e) {
				var object = e.get('target'),
				position = e.get('globalPixelPosition');

				var storeIDByXML = object.properties.get('storeIDByXML');
				var storePointCoords = object.properties.get('storeGPSCoords');
				$('.store-item').removeClass('store-item--active');
				$('#store-item-id' + storeIDByXML).addClass('store-item--active');
				myMap.setCenter(storePointCoords, STORE_POINT_FOCUS_ZOOM, {
					checkZoomRange: true
				});
			});*/
		}
	}

	// инициализация карты
	//ymaps.ready(Z585.yamaps.init());
	//Z585.yamaps.instance(showMap);


	/*$.when(
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

				// инициализация карты
				ymaps.ready(Z585.yamaps.init(result));
			});
		});*/
}());
