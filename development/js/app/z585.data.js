(function () {
	var data = Z585.define('Z585.data');

	data.path = {
		'shops': '/bitrix/templates/zoloto/components/bitrix/catalog.store.list/custom/json.php',
	};

	// ? надо ли
	data.shops = {
		'LOCAL': 'js/data/shops.json',
		'DEV': '/bitrix/templates/zoloto/components/bitrix/catalog.store.list/custom/json.php',
		'PROD': '/bitrix/templates/zoloto/components/bitrix/catalog.store.list/custom/json.php'
	};


	// data.shops.getShopById = function (id) {};


	// Возвращает объект магазина по его URL
	data.shops.getShopByURL = function (url, data) {
		var shop;

		// перебираю элементы массива и по заданному 
		// значению URL'а нахожу нужный мне объект 
		Array.prototype.forEach.call(data, function (item, i, array) {
			if(item['DETAIL_URL'] === url) {
				shop = item;
			} else {
				// 
			}
		});

		return shop;
	};

	// data.shops.getShopsByCity = function (url) {};
	// data.shops.getURLS = function (url) {};
} ());