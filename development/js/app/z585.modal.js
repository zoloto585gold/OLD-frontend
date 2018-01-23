(function () {
	'use strict';

	var modal = Z585.define('Z585.modal');

	modal.instance = function (options) {
		var self = this;

		self.options = $.extend({
			cssPrefix: 'modal__',
			cssExtra: '',
			htmlHeader: '',
			htmlInfo: '',
			htmlConfirm: 'OK',
			htmlDecline: 'Cancel',
			hideAfterFire: true,
			destroyAfterFire: true,
			buttons: [ 'close', 'confirm', 'decline' ],
			fires: {
				close:   function (elements) {},
				confirm: function (elements) {},
				decline: function (elements) {},
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
			wrapper:    $('<div class="' + self.options.cssPrefix +'wrap '+ self.options.cssExtra+'"/>'),
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
						self.options.fires[fire](self.elements);
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

	/**
	 * События
	 */
	modal.instance.prototype.fires = {};

} ());
