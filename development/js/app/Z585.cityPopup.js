// ВЫБОР ГОРОДА POPUP

(function () {
	'use strict';

	var cityPopup = Z585.define('Z585.cityPopup');

	var popupCheck = false;
	var popupCookie = $.cookie('cityPopup-closed');
	var showPopup = !popupCookie && popupCheck !== true;

    if (!!window.frameCacheVars){
        BX.addCustomEvent("onFrameDataReceived" , function() {
            if(showPopup)
        		setTimeout(cityPopup.generatePopup, 3000);
        });
    } else {
        BX.ready(function() {
            if(showPopup)
            	setTimeout(cityPopup.generatePopup, 3000);
        });
    }

	// функция генерирования кода окна
	cityPopup.generatePopup = function() {
		var city = $('#choose-city > span').html();
		$('body').prepend('<div class="section"><div id="cityPopup" class="section__inner"></div></div>');
		$('#cityPopup').prepend('<div class="modal-city-popup"><div class="close-but"></div><div class="message">Ваш город <br>'+city+' ?</div><div class="buttons"><button class="b-button b-white" id="cityChange">Выбрать другой</button><button class="b-button" id="cityOk">Да, верно</button></div></div>');
		// добавление кнопки выбора города активное состояние
		$('#top-geo-wrap #choose-city').addClass('_active');

		// показать плавно окно
		setTimeout(function() {
			$('.modal-city-popup').addClass('show-popup');
		}, 100);	

		$('.close-but, #cityOk, #cityChange').click(function(){
			$('#cityPopup').parent().remove();
			// добавление куки
			$.cookie('cityPopup-closed', 'yes', {expires: 14, path: '/'});
			popupCheck = true;
			$('#top-geo-wrap #choose-city').removeClass('_active');
		});
	}

} ());