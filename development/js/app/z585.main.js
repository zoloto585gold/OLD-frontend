(function () {
	var main = Z585.define('Z585.main');

	/**
	 * КОПИРОВАНИЕ В БУФЕР ОБМЕНА
	 * **************************
	 * **************************
	 * для копирования в буфер обмена приходится использовать элемент textarea, 
	 * внутрь котрого всталяются те данные,
	 * которые нужно отпрваить в буфер
	 * 
	 * textarea создается на лету, с определенным стилем, айдишником и данными для копирования
	 * 
	 * Айдишник и данные берутся из специальных data-полей элемента, по которому кликнули
	 * 
	 * в качестве парметра $button используется(передается) jQuery селектор $('.some-css-selector')
	 */
	main.copyToClipBoard = function ($button) {
		/*
			для копирования в буфер обмена приходится использовать элемент textarea, 
			внутрь котрого всталяются те данные,
			которые нужно отпрваить в буфер

			textarea создается на лету, с определенным стилем, айдишником и данными для копирования

			Айдишник и данные берутся из специальных data-полей элемента, по которому кликнули

			в качестве парметра $button используется(передается) jQuery селектор $('.some-css-selector')

		 */
		var clipboardId = $button.attr('data-clipboard-id');
		var clipboardData = $button.attr('data-clipboard-data');

		if($('.js-clipboard-buffer[data-clipboard-id=' + clipboardId + ']')) $('.js-clipboard-buffer[data-clipboard-id=' + clipboardId + ']').remove();

		$('body').append('<textarea class="js-clipboard-buffer" data-clipboard-id="' + clipboardId + '" style="position: absolute;height: 0px;padding: 0;margin: 0;overflow: hidden;opacity: 0;">' + clipboardData + '</textarea>');

		var coords = $('.js-clipboard-buffer[data-clipboard-id=' + clipboardId + ']').select();

		try {
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';
			// console.log('Cutting text command was ' + msg);  
		} catch(err) {  
			// console.log('Oops, unable to cut');  
		}
	};



	/*
		ОПРЕДЕЛЕНИЕ СРЕДЫ ЗАПУСКА JS СКРИПТОВ
		среды запуска отличаются друг от друга путями к подгружающим ресурсам и 
		использованием консоли для отладки скриптов
		Три среды:
		 - 'LOCAL' - локальная среда разработки, условно localhost, битрикс отсутствует, рассматривается локальный компьютер разработчика
		 - 'DEV' - сервера разработчиков, битрикс есть, выводить в консоль можно и запускать другие отладочные средства
		 - 'PROD' - продакшн, битрикс есть, консоль не должна отображать отладочную информацию

		DEV и PROD уже не отличаются путями к ресурсам


		Для разделения этих сред используются такие гипотезы:
			'PROD' - на сайте продакшна подразумевается наличие объекта "digitalData" с таким свойство и его значением window.digitalData.website.environment === 'production'
			'DEV' - на ДЕВЕ объекта "digitalData" нет и он не является локальным т.е. в URL'е не содержит localhost
			'LOCAL' - определяем по URL'у : location.origin === 'http://localhost' , т.к. локальный вариант всегда должен содержать http://localhost для сайта zoloto585.ru


		метод "enviromentDefine" определяет среду в которой запускается скрипт и устанавливает свойству "enviroment" соответствующее значение


		(*) для ПРОДА и ДЕВА НЕ РЕКОМЕНДУЮ ИСПОЛЬЗОВАТЬ URL

	 */

	main.environment = 'PROD'; // DEV, PROD , по умолчанию задана среда ПРОДАКШНА

	main.isLocal = false; // 
	main.isDev = false; // 
	main.isProd = true; // 

	main.environmentDefine = function () {
		if(window.digitalData && window.digitalData.website.environment === 'production') {
			main.environment = 'PROD';
			main.isLocal = false; // 
			main.isDev = false; // 
			main.isProd = true; // 
		}
		else if(location.origin === 'http://localhost'){
			main.environment = 'LOCAL';
			main.isLocal = true; // 
			main.isDev = false; // 
			main.isProd = false; // 
		}
		else {
			main.environment = 'DEV';
			main.isLocal = false; // 
			main.isDev = true; // 
			main.isProd = false; // 
		}
	};

	main.getEnvironment = function () {
		return main.environment;
	};

	main.environmentDefine();

} ());