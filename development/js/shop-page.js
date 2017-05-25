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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNob3AtcGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHZhciBkYXRhVVJMID0gJy9iaXRyaXgvdGVtcGxhdGVzL3pvbG90by9jb21wb25lbnRzL2JpdHJpeC9jYXRhbG9nLnN0b3JlLmxpc3QvY3VzdG9tL2pzb24ucGhwJztcclxudmFyIGRhdGFVUkwgPSAnanMvZGF0YS9zaG9wcy5qc29uJztcclxudmFyIERFVEFJTF9VUkwgPSAnL2Fib3V0L2FkZHJlc3MvcGV0ZXJnb2Yvc2Fua3QtcGV0ZXJidXJnc2tpeS1wci00OS0yLyc7XHJcbi8vIHZhciB0ZW1wbGF0ZU5hbWVcclxuLy8gdmFyIHRlbXBsYXRlUGF0aFxyXG4kLndoZW4oXHJcblx0XHRaNTg1LkhUTUxSZW5kZXIubGF6eUdldFRlbXBsYXRlKCdzaG9wLXBhZ2UtdGVtcGxhdGUnLCAnanMvcGFnZXMvc2hvcC1wYWdlLycpXHJcblx0KVxyXG5cdC5kb25lKGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHQkLmdldEpTT04oZGF0YVVSTCwgZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdFx0dmFyIHJlc3VsdCA9IGRhdGE7XHJcblxyXG5cdFx0XHQvLyDQv9C10YDQtdCx0LjRgNCw0Y4g0Y3Qu9C10LzQtdC90YLRiyDQvNCw0YHRgdC40LLQsCDQuCDQv9C+INC30LDQtNCw0L3QvdC+0LzRgyBcclxuXHRcdFx0Ly8g0LfQvdCw0YfQtdC90LjRjiBVUkwn0LAg0L3QsNGF0L7QttGDINC90YPQttC90YvQuSDQvNC90LUg0L7QsdGK0LXQutGCIFxyXG5cdFx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGRhdGEsIGZ1bmN0aW9uIChpdGVtLCBpLCBhcnJheSkge1xyXG5cdFx0XHRcdGlmKGRhdGFbaV1bJ0RFVEFJTF9VUkwnXSA9PT0gREVUQUlMX1VSTCkge1xyXG5cdFx0XHRcdFx0cmVzdWx0ID0gZGF0YVtpXTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gcmVzdWx0ID0gXCI0MDQsINC90LUg0L3QsNGI0ZHQu1wiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG5cdFx0XHQvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hvcC1pbmZvJykuaW5uZXJIVE1MID0gZGF0YTtcclxuXHRcdFx0JCgnLnNob3AtaW5mbycpLmh0bWwoJC50ZW1wbGF0ZXNbJ3Nob3AtcGFnZS10ZW1wbGF0ZSddLnJlbmRlcihyZXN1bHQpKTtcclxuXHJcblx0XHRcdC8vIFxyXG5cdFx0XHQvLyDQutC+0L/QuNGA0L7QstCw0L3QuNC1IEdQUy3QutC+0L7RgNC00LjQvdCw0YIgXHJcblx0XHRcdC8vINCyINCx0YPRhNC10YAg0L7QsdC80LXQvdCwIFxyXG5cdFx0XHQvLyDQv9C+INC60LvQuNC60YMg0L3QsCDQutGA0LDRgdC90YPRjiDQutC90L7Qv9C60YMg0LzQvtC00LDQu9GM0L3QvtCz0L4g0L7QutC90LAsIFxyXG5cdFx0XHQvLyDQstGB0L/Qu9GL0LLQsNGO0YnQtdCz0L4g0L3QsNC0INC60LDRgNGC0L7QuVxyXG5cdFx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNsaXBib2FyZC1idXR0b24nLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdC8vIHZhciBjb29yZHMgPSAkKHRoaXMpLmNsb3Nlc3QoJy5zdG9yZS1pdGVtJykuZmluZCgnLnN0b3JlLWl0ZW1fX2dwcy1jbGlwYm9hcmQnKVswXS5zZWxlY3QoKTtcclxuXHRcdFx0XHRjb3B5VG9DbGlwQm9hcmQoJ2J1dHRvbkVsZW1lbnQnLCAkKCcuanMtY2xpcGJvYXJkLWJ1ZmZlcicpKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBjb3B5VG9DbGlwQm9hcmQoYnV0dG9uRWxlbWVudCwgYnVmZmVyRWxlbWVudCkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdjbGljaycpO1xyXG5cdFx0XHRcdGJ1ZmZlckVsZW1lbnQuc2VsZWN0KCk7XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdHZhciBzdWNjZXNzZnVsID0gZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcclxuXHRcdFx0XHRcdHZhciBtc2cgPSBzdWNjZXNzZnVsID8gJ3N1Y2Nlc3NmdWwnIDogJ3Vuc3VjY2Vzc2Z1bCc7XHJcblx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZygnQ3V0dGluZyB0ZXh0IGNvbW1hbmQgd2FzICcgKyBtc2cpOyAgXHJcblx0XHRcdFx0fSBjYXRjaChlcnIpIHsgIFxyXG5cdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coJ09vcHMsIHVuYWJsZSB0byBjdXQnKTsgIFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7Il19
