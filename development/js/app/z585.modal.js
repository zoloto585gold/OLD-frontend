(function () {
	'use strict';

	var modal = Z585.define('Z585.modal');

	modal.instance = function (options) {
		var self = this;

		self.options = $.extend({
			cssPrefix: 'modal__', // css префикс
			cssExtra: '', // доп. css классы
			htmlHeader: '', // заголовок
			htmlInfo: '', // тело
			htmlConfirm: 'OK', // текст кнопки "подтвердить"
			htmlDecline: 'Cancel', // текст кнопки "отмена"
			preloader: false, // показывать прелоадер
			hideAfterFire: true, // скрыть после события
			destroyAfterFire: true, // удалить после события
			bottomImage: 'none', // адрес картинки
			popupType: 'standard', // тип попапа, другие типы: info
			buttons: [ 'close', 'confirm', 'decline' ], // добавить кнопки
			timer: 0,
			fires: { // события
				append:  function () {}, // добавление в дом
				close:   function () {}, // закрыть
				confirm: function () {}, // подтвердить
				decline: function () {}, // отклонить
			}
		}, options);
	}

	/**
	 * Создание элементов и событий
	 * @param {Boolean} show - показывает окно и фон после создания
	 */
	modal.instance.prototype.init = function (show) {
		var self = this;
		
		show = show || false;

		self.elements = {
			overlay:    $('<div class="' + self.options.cssPrefix +'overlay" data-fire="close"/>'),
			wrapper:    $('<div class="' + self.options.cssPrefix +'wrap '+ self.options.cssExtra+'" data-wait="0"/>'),
			header:     $('<h2 class="'  + self.options.cssPrefix +'header"/>'),
			info:       $('<p class="'   + self.options.cssPrefix +'info"/>'),
			confirm:    $('<button class="' + self.options.cssPrefix +'button" data-fire="confirm">'+ self.options.htmlConfirm +'</button>'),
			decline:    $('<button class="' + self.options.cssPrefix +'button" data-fire="decline">'+ self.options.htmlDecline +'</button>'),
			close:      $('<button class="' + self.options.cssPrefix +'close-but" data-fire="close"/>'),
		};

		if (self.options.htmlHeader.length) {
			self.elements.wrapper.append(self.elements.header.html(self.options.htmlHeader));
		}

		self.elements.wrapper.append(self.elements.info.html(self.options.htmlInfo));

		if (self.options.preloader === true) {
			self.toggleWait();
		}

		$.each(self.options.buttons, function (i, btn) {
			var btnEl = self.elements[btn];
			
			if (btnEl) {
				self.elements.wrapper.append(btnEl);
			}
		});

		// Инит событий
		$.each(self.elements, function (name, el) {
			var fire = el.data('fire') || null;

			if (!!fire) {
				el.on('click', function (e) {
					e.preventDefault();

					if (self.fires[fire] instanceof Function) {
						// внутреннее событие
						self.options.fires[fire]();
					}
		
					if (self.options.fires[fire] instanceof Function) {
						// каллбэк
						self.options.fires[fire].call(self);
					}
		
					if (self.options.hideAfterFire) {
						self.hide();
					}

					if (self.options.destroyAfterFire) {
						self.destroy();
					}
				});
			}
		});

		$('body').append(
			self.elements.overlay,
			self.elements.wrapper
		);

		// добавление картинки

		if ( self.options.bottomImage != 'none' ) {
			$('.'+self.options.cssPrefix+'wrap').append(
				'<img class="'+self.options.cssPrefix+'bottom-image" src="'+self.options.bottomImage+'">'
			);	
		}

		// установка типа

		if ( self.options.popupType != 'standard' ) {
			if ( self.options.popupType == 'info' )
			$('.'+self.options.cssPrefix+'wrap').addClass('modal__type-info');	
		}

		// проверка таймера 

		if ( self.options.timer != 0 ) {
			var timer = self.options.timer;

			$('.'+self.options.cssPrefix+'wrap').append('<p class="timer">Окно закроется через '+timer+' секунд</p>');
					var t = setInterval(function(){
						if ( timer != 0 ) {
							$('.timer').html('Окно закроется через '+timer+' секунд');
							timer--;
						} else {
							self.hide();
							clearTimeout(t);
						}
					}, 1000);
			
		}


		if (self.fires.append instanceof Function) {
			self.fires.append();
		}

		if (self.options.fires.append instanceof Function) {
			self.options.fires.append.call(self);
		}

		if (show !== true) {
			self.hide();
		}
	}

	/**
	 * Показывает модальное окно и фон
	 */
	modal.instance.prototype.show = function () {
		this.elements.overlay.show();
		this.elements.wrapper.show();
	}

	/**
	 * Скрывает модальное окно и фон
	 */
	modal.instance.prototype.hide = function () {
		this.elements.overlay.hide();
		this.elements.wrapper.hide();
	}

	/**
	 * Удаляет модальное окно и фон
	 */
	modal.instance.prototype.destroy = function () {
		this.elements.overlay.remove();
		this.elements.wrapper.remove();
	}

	modal.instance.prototype.toggleWait = function () {
		var wait = parseInt(this.elements.wrapper.attr('data-wait'));

		this.elements.wrapper.attr('data-wait', +!wait);
	}

	/**
	 * События
	 */
	modal.instance.prototype.fires = {};

} ());
