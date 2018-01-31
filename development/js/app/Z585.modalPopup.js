// ВЫБОР ГОРОДА POPUP

(function () {
	'use strict';

	var modalPopup = Z585.define('Z585.modalPopup');

	var popupCheck = false;
	var popupCookie = $.cookie('modalPopup-closed');

	// запуск функции после загрузки страницы
	$(document).ready(function() {
		if (popupCookie) {
			return false;
		}

		if (popupCheck === true) {
			return false;
		}

		setTimeout(modalPopup.generatePopup, 3000);	
	});

	// функция генерирования кода окна
	modalPopup.generatePopup = function() {
		var city = $('#choose-city > span').html();
		$('body').prepend('<div class="section"><div id="cityPopup" class="section__inner"></div></div>');
		$('#cityPopup').prepend('<div class="modal-popup"><div class="close-but"></div><div class="message">Ваш город <br>'+city+' ?</div><div class="buttons"><button class="b-button b-white" id="cityChange">Выбрать другой</button><button class="b-button" id="cityOk">Да, верно</button></div></div>');

		// показать плавно окно
		setTimeout(function() {
			$('.modal-popup').addClass('show-popup');
		}, 100);	

		// добавление куки
		$.cookie('modalPopup-closed', 'yes', { expires: 7 });
		popupCheck = true;

		$('.close-but, #cityOk').click(function(){
			$('#cityPopup').parent().remove();
		});

		$('#cityChange').click(function(){
			$('#cityPopup').parent().remove();
		});
	}

} ());