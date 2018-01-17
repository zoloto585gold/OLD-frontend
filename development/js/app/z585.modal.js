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
			destroyAfterFire: true,
			allowedFires: [ 'onClose', 'onConfirm', 'onDecline' ],
			onClose:   function (elements) {},
			onConfirm: function (elements) {},
			onDecline: function (elements) {},
		}, options);
	}

	/**
	 * Создание элементов и событий
	 * @param {Boolean} show - показывает окно и фон после создания
	 */
	modal.instance.prototype.init = function (show) {
		var self = this;

		self.elements = {
			overlay:    $('<div class="' + self.options.cssPrefix +'overlay" data-fire="onClose"/>'),
			wrapper:    $('<div class="' + self.options.cssPrefix +'wrap '+ self.options.cssExtra+'"/>'),
			header:     $('<h2 class="'  + self.options.cssPrefix +'header"/>'),
			info:       $('<p class="'   + self.options.cssPrefix +'info"/>'),
			confirmBtn: $('<div class="' + self.options.cssPrefix +'button" data-fire="onConfirm"/>'),
			declineBtn: $('<div class="' + self.options.cssPrefix +'button" data-fire="onDecline"/>'),
			closeBtn:   $('<div class="' + self.options.cssPrefix +'close-but" data-fire="onClose"/>'),
		};

		self.elements.wrapper.append(
			self.elements.header.html(self.options.htmlHeader).append(self.elements.closeBtn),
			self.elements.info.html(self.options.htmlInfo),
			self.elements.confirmBtn.html(self.options.htmlConfirm),
			self.elements.declineBtn.html(self.options.htmlDecline)
		);

		// Вызов каллбэка и закрытие
		$.each(self.elements, function (name, el) {
			var fire = el.data('fire') || null;

			if (!!fire) {
				el.on('click', function (e) {
					e.preventDefault();

					if ($.inArray(fire, self.options.allowedFires) == -1) {
						return false;
					}
		
					if (self.options[fire] instanceof Function) {
						self.options[fire](self.elements);
					}
		
					if (self.options.destroyAfterFire) {
						self.destroy();
					}
				});
			}
		});

		if (show === true) {
			self.show();
		}
	}

	/**
	 * Показывает модальное окно и фон
	 */
	modal.instance.prototype.show = function () {
		$('body').append(
			this.elements.overlay.addClass(this.options.cssShow),
			this.elements.wrapper.addClass(this.options.cssShow)
		);
	}

	/**
	 * Удаляет модальное окно и фон
	 */
	modal.instance.prototype.destroy = function () {
		this.elements.overlay.remove();
		this.elements.wrapper.remove();
	}

} ());
