
	/**
	 * ОБОБЩЕНИЕ:
	 * для модальных окон и действия клик на крестик(закрытие окна)
	 */
	$(document).on('click', '.js-modal-close-button', function () {
		var $modalWindow = $(this).closest('.js-modal-window');
		if($modalWindow) {
			$modalWindow.removeClass($modalWindow.attr('data-js-modal-active-modifier'));
		}
	});
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
	var storeCurrentCityName = ''; // название текущего города
	var dataRawPath = Z585.HTMLRender.getDataRawByName('shops');

	$.when(
			Z585.HTMLRender.lazyGetTemplate('store-item-template'),
			Z585.HTMLRender.lazyGetTemplate('store-list-template'),
			Z585.HTMLRender.lazyGetTemplate('store-cities-list-template')
		)
		.done(function () {
			var city;
			var citiesItemPopular = $('.top-geo-form__pop-cities-inner a');


			/*
				Проверяет есть ли город(который в шапке) в объекте "digitalData" и 
				если его нет, то берет город из тега "$('.top-geo__button').find('span')"
			 */
			if (window.digitalData && window.digitalData.website && window.digitalData.website.region) {
				city = window.digitalData.website.region;
			} else {
				city = $('.top-geo__button').find('span').text();
			}

			// console.log(window.digitalData.website.region, city);

			storeCurrentCityName = city;
			$.getJSON(dataRawPath, function (data) {
				/**
				 * [storeData description]
				 * @type {Object}
				 */
				var storeData = {
					currentCityValues: { // значения для текущего города
						cityName: city,
					},
					citiesList: [], // массив из названий гoродов
					citiesListAdvanced: [], // массив объектов с полями {имя_города, колво_магазинов_в_городе}
				};
				var currentCityData = [];
				var citiesList = [];
				
				data.forEach(function (item, index, array) {
					if(item['CITY'] == city) currentCityData.push(item);

					if(storeData.citiesList.indexOf(item['CITY']) === -1) {
						// если такой город не попадалася добаляем его в массив городов
						// создаем массив городов без повторяющихся значений
						storeData.citiesList.push(item['CITY']);
						storeData.citiesListAdvanced.push({ cityName: item['CITY'], cityStoresCount: 1 });
					} else {
						// storeData.citiesListAdvanced
					}
				});


				/**
				 * рендерит миникарточки магазинов
				 * текущего города
				 */
				// $("#store-item-list").html($.templates['store-item-template'].render(currentCityData));
				$("#store-item-list").html($.templates['store-item-template'].render(data));



				$('#store-about-count').html(currentCityData.length);
				/*$('.store-about__title').find('a').html(city);
				$('.store-about__sub-title').find('a').html(city);*/
				$('.store-about__sub-title').find('a').html($('#store-list-combobox option:selected').attr('value'));


				$('#store-list-combobox').html($.templates['store-list-template'].render(citiesList));
				$('.store-list').html($.templates['store-cities-list-template'].render(storeData));



				// инициализация карты
				ymaps.ready(storeMapInit(data));
				// console.log(data);
				// console.log(currentCityData);



				// 
				// копирование GPS-координат 
				// в буфер обмена 
				// по клику на красную кнопку модального окна, 
				// всплывающего над картой
				$(document).on('click', '.store-item__button--gps', function (e) {
					var coords = $(this).closest('.store-item').find('.store-item__gps-clipboard')[0].select();
					// console.log($(this));
					// console.log($(this).closest('.store-item').find('.store-item__gps-clipboard')[0]);
					try {  
					    var successful = document.execCommand('copy');  
					    var msg = successful ? 'successful' : 'unsuccessful';  
					    console.log('Cutting text command was ' + msg);  
					  } catch(err) {  
					    console.log('Oops, unable to cut');  
					  } 
				});
			});
		});



		// ф-я описывающая работу с картой на странице "Адреса магазинов"
		function storeMapInit(storeData) {
			return function () {
						var STORE_POINT_FOCUS_ZOOM = 17; // уровень zoom'а для конкретного магазина(т.е. после того как пользователь кликнул на метку)
						var myMap = new ymaps.Map("map", {
								//center: [55.753994, 37.622093], // Координаты центра карты
								center: [],
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
						var storesPlacemarks = [];
						for (var i = 0; i < storeData.length; i++) {
							storesPlacemarks[i] = new ymaps.Placemark([storeData[i]['GPS_N'], storeData[i]['GPS_S']],
								{
									storeIDByGPS: storeData[i]['GPS_N'] + '__' + storeData[i]['GPS_S'],
									storeIDByXML: storeData[i]['XML_ID'],
									storeCity: storeData[i]['CITY'],
									storeAddress: storeData[i]['ADDRESS'],
									storeGPSCoords: [storeData[i]['GPS_N'], storeData[i]['GPS_S']],
								},
								{
									iconLayout: 'default#image',
									iconImageHref: '/bitrix/templates/zoloto/frontend/images/sprites/sprite__primary-icon-set.png', 
									iconImageSize: [33, 44],
									iconImageClipRect: [[99, 393], [132, 437]]
							});
							storesPlacemarkCollection.add(storesPlacemarks[i]);
						}
						myMap.geoObjects.add(storesPlacemarkCollection);

						// ****************************************
						// клик по метке на карте
						// модальное окно с предложением 
						// "БРОНИРОВАТЬ ИЗДЕЛИЕ" в этом магазине
						// ****************************************
						myMap.geoObjects.events.add('click', function (e) {
							var object = e.get('target'),
								position = e.get('globalPixelPosition');

							var storeIDByXML = object.properties.get('storeIDByXML');
							var storePointCoords = object.properties.get('storeGPSCoords');
							$('.store-item').removeClass('store-item--active');
							$('#store-item-id' + storeIDByXML).addClass('store-item--active');
							myMap.setCenter(storePointCoords, STORE_POINT_FOCUS_ZOOM, {
								checkZoomRange: true
							});
						});

						

						/*
							функция `changeCityListener()` меняет положение карты, 
							значение в select-меню и текст страницы при смене города
						 */
						function changeCityListener() {
							return function(e) {
								var cityName = $(this).text();

								$('#store-list-combobox').find('option:contains("' + cityName + '")').attr('selected', 'selected');

								$('.store-item').removeClass('store-item--active');

								//$('.store-about__title').find('a').html(cityName);

								ymaps.geocode(cityName, {
									results: 1
								}).then(function (res) {
									// Выбираем первый результат геокодирования.
									var firstGeoObject = res.geoObjects.get(0),
										// Координаты геообъекта.
										coords = firstGeoObject.geometry.getCoordinates(),
										// Область видимости геообъекта.
										bounds = firstGeoObject.properties.get('boundedBy');

									// Масштабируем карту на область видимости геообъекта.
									myMap.setBounds(bounds, {
										// Проверяем наличие тайлов на данном масштабе.
										checkZoomRange: true
									});
								});
							};
						}


						// смена карты по по выбору города в шапке из списка ПОПУЛЯРНЫХ ГОРОДОВ
						//$('.top-geo-form__pop-cities-inner a').bind('click', changeCityListener());

						// смена карты по по выбору города в шапке из списка ВСЕХ ГОРОДОВ
						//$('.cities-list__item a').bind('click', changeCityListener());

						// смена карты по выбору города в select-меню над картой
						$('#store-list-combobox').bind('change', function () {
							var option = $('#store-list-combobox option:selected');
							var storeCurrentCityName = option.attr('value');

							$('.store-item').removeClass('store-item--active');

							ymaps.geocode(storeCurrentCityName, {
								results: 1
							}).then(function (res) {
								// Выбираем первый результат геокодирования.
								var firstGeoObject = res.geoObjects.get(0),
									// Координаты геообъекта.
									coords = firstGeoObject.geometry.getCoordinates(),
									// Область видимости геообъекта.
									bounds = firstGeoObject.properties.get('boundedBy');

								// Масштабируем карту на область видимости геообъекта.
								myMap.setBounds(bounds, {
									// Проверяем наличие тайлов на данном масштабе.
									checkZoomRange: true
								});
							});
						});



						$('#store-list-combobox').trigger('change');


						ymaps.geocode(storeCurrentCityName, {
							results: 1
						}).then(function (res) {
							// Выбираем первый результат геокодирования.
							var firstGeoObject = res.geoObjects.get(0),
								// Координаты геообъекта.
								coords = firstGeoObject.geometry.getCoordinates(),
								// Область видимости геообъекта.
								bounds = firstGeoObject.properties.get('boundedBy');

							// Масштабируем карту на область видимости геообъекта.
							myMap.setBounds(bounds, {
								// Проверяем наличие тайлов на данном масштабе.
								checkZoomRange: true
							});
						});
			};
		}
