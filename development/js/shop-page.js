(function () {

	var DETAIL_URL = '/about/address/petrozavodsk/pr-lenina-14/';
	var templateName = 'shop-page-template';
	var dataRaw = Z585.HTMLRender.getDataRawByName('shops');


	$.when(
			Z585.HTMLRender.lazyGetTemplate(templateName)
		)
		.done(function () {

			$.getJSON(dataRaw, function (data) {
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


				$('.shop-info').html($.templates['shop-page-template'].render(result));

				// копирование GPS-координат в буфер обмена 
				$(document).on('click', '.js-clipboard-button', function (e) {
					Z585.main.copyToClipBoard($(this));
				});
			});
		});
}());
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNob3AtcGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XHJcblxyXG5cdHZhciBERVRBSUxfVVJMID0gJy9hYm91dC9hZGRyZXNzL3BldHJvemF2b2Rzay9wci1sZW5pbmEtMTQvJztcclxuXHR2YXIgdGVtcGxhdGVOYW1lID0gJ3Nob3AtcGFnZS10ZW1wbGF0ZSc7XHJcblx0dmFyIGRhdGFSYXcgPSBaNTg1LkhUTUxSZW5kZXIuZ2V0RGF0YVJhd0J5TmFtZSgnc2hvcHMnKTtcclxuXHJcblxyXG5cdCQud2hlbihcclxuXHRcdFx0WjU4NS5IVE1MUmVuZGVyLmxhenlHZXRUZW1wbGF0ZSh0ZW1wbGF0ZU5hbWUpXHJcblx0XHQpXHJcblx0XHQuZG9uZShmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHQkLmdldEpTT04oZGF0YVJhdywgZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdFx0XHR2YXIgcmVzdWx0ID0gZGF0YTtcclxuXHJcblx0XHRcdFx0Ly8g0L/QtdGA0LXQsdC40YDQsNGOINGN0LvQtdC80LXQvdGC0Ysg0LzQsNGB0YHQuNCy0LAg0Lgg0L/QviDQt9Cw0LTQsNC90L3QvtC80YMgXHJcblx0XHRcdFx0Ly8g0LfQvdCw0YfQtdC90LjRjiBVUkwn0LAg0L3QsNGF0L7QttGDINC90YPQttC90YvQuSDQvNC90LUg0L7QsdGK0LXQutGCIFxyXG5cdFx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZGF0YSwgZnVuY3Rpb24gKGl0ZW0sIGksIGFycmF5KSB7XHJcblx0XHRcdFx0XHRpZihkYXRhW2ldWydERVRBSUxfVVJMJ10gPT09IERFVEFJTF9VUkwpIHtcclxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gZGF0YVtpXTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdC8vIHJlc3VsdCA9IFwiNDA0LCDQvdC1INC90LDRiNGR0LtcIjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHJcblxyXG5cdFx0XHRcdCQoJy5zaG9wLWluZm8nKS5odG1sKCQudGVtcGxhdGVzWydzaG9wLXBhZ2UtdGVtcGxhdGUnXS5yZW5kZXIocmVzdWx0KSk7XHJcblxyXG5cdFx0XHRcdC8vINC60L7Qv9C40YDQvtCy0LDQvdC40LUgR1BTLdC60L7QvtGA0LTQuNC90LDRgiDQsiDQsdGD0YTQtdGAINC+0LHQvNC10L3QsCBcclxuXHRcdFx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNsaXBib2FyZC1idXR0b24nLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdFx0WjU4NS5tYWluLmNvcHlUb0NsaXBCb2FyZCgkKHRoaXMpKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxufSgpKTsiXX0=
