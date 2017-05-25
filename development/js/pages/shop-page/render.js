// var dataURL = '/bitrix/templates/zoloto/components/bitrix/catalog.store.list/custom/json.php';
var dataURL = 'js/data/shops.json';
var DETAIL_URL = '/about/address/petergof/sankt-peterburgskiy-pr-49-2/';
// var templateName
// var templatePath
$.when(
		Z585.HTMLRender.lazyGetTemplate('shop-page-template', 'js/pages/shop-page/')
	)
	.done(function () {

		$.getJSON(dataURL, function (data) {
			var result = data;

			// перебираю элементы массива и по заданному 
			// значению URL'а нахожу нужный мне объект 
			Array.prototype.forEach.call(data, function (item, i, array) {
				if(data[i]['DETAIL_URL'] === DETAIL_URL) {
					result = data[i];
				} else {
					// result = "404, не нашёл";
				}
			});

			// console.log(result);
			// document.querySelector('.shop-info').innerHTML = data;
			$('.shop-info').html($.templates['shop-page-template'].render(result));

			// 
			// копирование GPS-координат 
			// в буфер обмена 
			// по клику на красную кнопку модального окна, 
			// всплывающего над картой
			$(document).on('click', '.js-clipboard-button', function (e) {
				// var coords = $(this).closest('.store-item').find('.store-item__gps-clipboard')[0].select();
				copyToClipBoard('buttonElement', $('.js-clipboard-buffer'));
			});

			function copyToClipBoard(buttonElement, bufferElement) {
				console.log('click');
				bufferElement.select();
				try {
					var successful = document.execCommand('copy');
					var msg = successful ? 'successful' : 'unsuccessful';
					// console.log('Cutting text command was ' + msg);  
				} catch(err) {  
					// console.log('Oops, unable to cut');  
				}
			}
		});
	});