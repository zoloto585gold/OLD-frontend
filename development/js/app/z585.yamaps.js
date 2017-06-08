(function () {
	var yamaps = Z585.define('Z585.yamaps');

    yamaps.init = function(data, mapSettings) {
        return function () {
            var STORE_POINT_FOCUS_ZOOM = 17; // уровень zoom'а для конкретного магазина(т.е. после того как пользователь кликнул на метку)
            var myMap = new ymaps.Map("shop-map", {
                center: [data.GPS_N, data.GPS_S], // Координаты центра карты
                zoom: 16 // Zoom
            });

            /**
             * Создаем метку
             * и помещаем ее
             * на карте
             */

			if( data.length > 0 ) {
				var storesPlacemarkCollection = new ymaps.GeoObjectCollection();
				var storesPlacemarks = [];
				for (var i = 0; i < data.length; i++) {
					storesPlacemarks[i] = new ymaps.Placemark([data[i]['GPS_N'], data[i]['GPS_S']],
						{
							storeIDByGPS: data[i]['GPS_N'] + '__' + data[i]['GPS_S'],
							storeIDByXML: data[i]['XML_ID'],
							storeCity: data[i]['CITY'],
							storeAddress: data[i]['ADDRESS'],
							storeGPSCoords: [data[i]['GPS_N'], data[i]['GPS_S']],
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

			} else {
				var placemark = new ymaps.Placemark([data['GPS_N'], data['GPS_S']],
	                {
	                    storeIDByGPS: data['GPS_N'] + '__' + data['GPS_S'],
	                    storeIDByXML: data['XML_ID'],
	                    storeCity: data['CITY'],
	                    storeAddress: data['ADDRESS'],
	                    storeGPSCoords: [data['GPS_N'], data['GPS_S']],
	                },
	                {
	                    iconLayout: 'default#image',
	                    iconImageHref: 'https://zoloto585.ru/bitrix/templates/zoloto/frontend/images/sprites/sprite__primary-icon-set.png',
	                    iconImageSize: [33, 44],
	                    iconImageClipRect: [[99, 393], [132, 437]]
	            });

	            myMap.geoObjects.add(placemark);
			}



            /**
             * УСТАНОВКА КОНТРОЛОВ КАРТЫ:
             *  - кнопки зума
             *  - возможность скпроллировать масштаб карты(колесо мишы)
             */
            myMap.controls.add(new ymaps.control.ZoomControl());
            myMap.behaviors.enable('scrollZoom');
        }
    };
} ());
