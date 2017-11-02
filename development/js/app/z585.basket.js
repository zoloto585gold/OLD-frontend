(function () {
	'use strict';

	var basket = Z585.define('Z585.basket');

	basket.init = function () {
		var self = this;
		
		self.debug = true;
		self.urlAPI = 'https://d03.zoloto585.ru/restapi/v1/basket/';

		self.router = {
			add: 'post',
			xadd: 'post',
			clear: 'get',
			briefview: 'get',
			view: 'get',
			applycoupon: 'post',
			clearcoupon: 'post',
			applybcard: 'post',
			clearcbcard: 'post',
			checkout: 'post',
			setshop: 'post',
			setcity: 'post',
		};

		self.elements = {
			brief: $('.top-basket'),
			page:  $('.page.basket'),
		};

		// На стринце с корзиной /basket
		if (self.elements.page.length) {
			// Загрузка первого шага
			self.requestAPI('view', {}, {
				partial: {
					name: 'content'
				}
			});

			// Выбор шага
			self.elements.page.on('click', '[data-btn=step]', function (e) {
				var method = $(this).data('method');

				self.requestAPI(method, {}, {
					partial: {
						name:  'content',
						state: $(this).data('state'),
						template: $(this).data('template'),
					},
				});

				e.preventDefault();
			});

			// Вернуться к покупкам (назад)
			self.elements.page.on('click', '[data-btn=goback]', function (e) {
				e.preventDefault();

				/*
				if (window.history.length) {
					window.history.go(-1);
				} else {
					window.location = '/catalog';
				}
				*/

				window.location = document.referrer || '/catalog';
			});

			// Очистить корзину
			self.elements.page.on('click', '[data-btn=clear]', function (e) {
				e.preventDefault();

				if (confirm('Вы уверены, что хотите удалить все товары из корзины?')) {
					self.requestAPI('clear', {}, {
						partial: {
							name: 'content'
						}
					});
				}		
			});

			// Выбор магазина
			self.elements.page.on('change', '[data-el=item-shops]', function (e) {
				var $wrap = $(this).closest('[data-el=shop-wrapper]');
				var showConfirm = self.elements.page.find('[data-el=not-available]').length == 0;
				var shopid = parseInt($(this).val());

				self.requestAPI('setshop', {
					sapcode: $(this).data('sapcode'),
					city: $(this).data('city'),
					shopid: shopid,
				});

				// Устанавливаем статус
				$wrap.attr('data-status', shopid == 0 ? 'null' : 'selected');

				// Показываем или скрываем форму подтверждения если все магазины выбраны 
				self.elements.page.find('[data-el=item-shops]').each(function () {
					if ($(this).val() == 0) {
						showConfirm = false;
						return false;
					}
				});

				self.elements.page.find('[data-el=confirm-wrapper]')[showConfirm ? 'slideDown':'slideUp'](200);
			});

			// Удаление товара со страницы конрзины
			self.elements.page.on('click', '[data-btn=remove]', function (e) {
				e.preventDefault();

				if (confirm('Вы уверены, что хотите удалить этот товар из корзины?')) {
					self.requestAPI('remove', {
						sapcode: $(this).data('sapcode')
					}, {
						partial: {
							name: 'content'
						}
					});
				}
			});

			// Применение купона
			self.elements.page.on('click', '[data-btn=applycoupon]', function (e) {
				var $input = self.elements.page.find('[data-el=coupon-input]');
				var value  = $.trim($input.val());

				if (value.length == 0) {
					$input.trigger('focus');
				} else {
					self.requestAPI('applycoupon', {
						coupon: value
					}, {
						partial: {
							name: 'content',
							toTop: false,
							callback: function () {
								$input.prop('disabled', true);
							}
						}
					});
				}
			});

			// Удаление купона
			self.elements.page.on('click', '[data-btn=clearcoupon]', function (e) {
				var $input = self.elements.page.find('[data-el=coupon-input]');
				var value  = $(this).data('coupon');
				
				self.requestAPI('clearcoupon', {
					coupon: value
				}, {
					partial: {
						name: 'content',
						toTop: false,
						callback: function () {
							$input.prop('disabled', false);
						}
					}
				});
			});

			// Форма регистрации бонусной карты
			self.elements.page.on('click', '[data-btn=reg-card]', function (e) {
				e.preventDefault();

				self.elements.page
					.find('[data-el=reg-card]').addClass('is-open')
					.find('[data-btn=reg-card-close]').on('click', function (e) {
						e.preventDefault();
						$(this).closest('[data-wrap]').removeClass('is-open');
					});

				self.loadPartial('regform', {}, {
					reLoad: false,
					toTop: false,
					showPreloader: false,
				});
			});

			// Применение бонусной карты
			self.elements.page.on('click', '[data-btn=applybcard]', function (e) {
				var $input = self.elements.page.find('[data-el=bonus-input]');
				var value  = $.trim($input.val());

				e.preventDefault();

				if (value.length == 0) {
					$input.trigger('focus');
				} else {
					self.requestAPI('applybcard', {
						bonus_card: value
					}, {
						partial: {
							name: 'content',
							toTop: false,
							callback: function () {
								$input.prop('disabled', true);
							}
						}
					});
				}
			});

			// Удаление бонусной карты
			self.elements.page.on('click', '[data-btn=clearbcard]', function (e) {
				var $input = self.elements.page.find('[data-el=bonus-input]');
				var value  = $(this).data('bonus-card');
				
				self.requestAPI('clearbcard', {
					bonus_card: value
				}, {
					partial: {
						name: 'content',
						toTop: false,
						callback: function () {
							$input.prop('disabled', false);
						}
					}
				});
			});

			// Смотреть на карте адрес магазина
			self.elements.page.on('click', '[data-btn=open-map]', function (e) {
				var $wrap = $(this).closest('[data-el=shop-wrapper]');
				var $selector = $wrap.find('select');
				var $option = $selector.find('option:selected');
				var content = '<div id="shop-map"></div>';
				var mapParams;

				e.preventDefault();

				if ($selector.val() != 0 && $option.length) {
					mapParams = {
						GPS_N: $option.data('lat'),
						GPS_S: $option.data('lon'),
					};

					self.showModal('map', content);
					ymaps.ready(Z585.yamaps.init(mapParams));
				} else {
					alert('Пожалуйста, выберите адрес');
				}
			});

			// Подтверждение заказа. Отправка смс
			self.elements.page.on('click', '[data-btn=send-sms]', function (e) {
				var $input = self.elements.page.find('[data-el=phone]');
				var value  = $.trim($input.val());

				e.preventDefault();

				if (value.length == 0) {
					$input.trigger('focus');
				} else {
					self.requestAPI('checkout', {
						phone: value,
						ch_code: '',
					}, {
						callback: function () {
							self.elements.page
								.find('[data-el=confirm-form]').slideDown(200)
								.find('[data-el=smscode]').trigger('focus');
						}
					});
				}
			});

			// Подтверждение заказа. Отправка проверочного кода
			self.elements.page.on('click', '[data-btn=checkout]', function (e) {
				var $form  = self.elements.page.find('[data-el=confirm-form]');
				var $input = $form.find('[data-el=smscode]');
				var $error = $form.find('[data-el=error]');
				var $phone = self.elements.page.find('[data-el=phone]');
				var $content = self.elements.page.find('[data-partial=content]');

				e.preventDefault();

				$error.hide();

				self.requestAPI('checkout', {
					phone:   $.trim($phone.val()),
					ch_code: $.trim($input.val()),
				}, {
					callback: function (json) {
						var invalid = json.orders.response.error == 'INVALID_CHECK_CODE';

						if (invalid) {
							$error.show();
						} else {
							self.loadPartial('content', json, {
								template: 'orders',
							});
						}
					}
				});
			});
			
		} else {
			// Мини корзина на всех страницах
			self.requestAPI('briefview', {}, {
				partial: {
					name: 'topbasket'
				}
			});

			// Удаление товара из мини корзины
			self.elements.brief.on('click', '[data-btn=remove]', function (e) {
				e.preventDefault();

				//if (confirm('Вы уверены, что хотите удалить этот товар из корзины?')) {
					self.requestAPI('remove', {
						sapcode: $(this).data('sapcode')
					}, {
						partial: {
							name: 'topbasket'
						}
					});
				//}
			});
		}
	}

	/**
	 * Запрос к API
	 */
	basket.requestAPI = function (method, data, options) {
		var self = this;
		var type = self.router[method] || 'post';

		data = data || {};
		data['ZOLOTO585_USER_ID'] = $.cookie('ZOLOTO585_USER_ID');

		options = options || {};

		$.ajax({
			url: self.urlAPI + method,
			type: type,
			data: JSON.stringify(data || {}),
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true, 
			dataType: 'json',
			beforeSend: function () {
				self.setPreloader(true);
			},
			success: function (json) {	
				self.setPreloader(false);

				if (json.response.code != 1) {
					switch (json.response.code) {
						case 5:
							alert('Не удалось загрузить корзину (UID)');
							break;
						case 2:
						case 3:
						case 4:
						default:
							console.log('basket.requestAPI error ('+ method +'): ' + JSON.stringify(json.response.error));
					}
				} else {
					if (options.partial) {
						self.loadPartial(options.partial.name, json, options.partial);
					}

					if ($.isFunction(options.callback)) {
						options.callback(json);
					}
				}
			},
			error: function (xhr, status) {
				console.log('basket.request error ('+ method +'): ' + JSON.stringify(xhr));
			}
		});
	}

	/**
	 * Отрисовка блока корзины
	 */
	basket.loadPartial = function (name, data, options) {
		var self = this;
		var $partial = $('[data-partial="'+ name +'"]');
		var loaded = false;
		var template;	
		var url;
		var history;

		options = $.extend({
			reLoad: true,
			toTop: true,
			showPreloader: true,
		}, options);

		if ($partial.length) {
			loaded = typeof $partial.data('loaded') !== 'undefined';
			template = options.template || $partial.data('template');

			if (loaded === true && options.reLoad === false) {
				console.log('basket.loadPartial: The partial was already loaded. '+ name +' = ('+ JSON.stringify(options) +')');
				return true;
			}

			if (typeof template === 'undefined') {
				template = name;
			}

			url = '/basket/partials/'+ template +'.php';

			if (typeof options.state !== 'undefined') {
				history = '/basket?' + options.state;
			}
			
			$.ajax({
				url: url,
				type: 'post',
				data: {
					json: JSON.stringify(data || {})
				},
				beforeSend: function () {
					if (options.showPreloader) {
						self.setPreloader(true);
					}

					if (options.toTop) {
						$('html, body').animate({ scrollTop: 0 }, 200);
					}
				},
				success: function (response) {
					self.setPreloader(false);
					
					if (history) {
						window.history.pushState(null, null, history);
					}

					$partial.html(response).data('loaded', 1);
	
					if ($.isFunction(options.callback)) {
						options.callback();
					}
				},
				error: function (xhr, status) {
					console.log('basket.loadPartial "'+ name +'" error: ' + JSON.stringify(xhr));
				}
			});
		} else {
			console.log('basket.loadPartial: Partial "'+ name +'" is not defined');
		}
	}

	/**
	 * Показывает/скрывает прелоадер на странице корзины
	 */
	basket.setPreloader = function (show) {
		if (this.elements.page.length) {
			if (show === true) {
				this.elements.page.attr('data-wait', 1);
			} else {
				this.elements.page.removeAttr('data-wait');
			}
		}
	}

	/**
	 * Модальное окно
	 */
	basket.showModal = function (name, content) {
		var self = this;
		var $target = self.elements.page.find('[data-el=modal][data-name="'+ name +'"]');

		if ($target.length) {
			$target
				.addClass('is-open')
				.find('[data-el=modal-overlay], [data-btn=modal-close]').one('click', function () {
					$target.removeClass('is-open');
				});
			
			if (typeof content !== 'undefined') {
				$target.find('[data-el=content]').html(content);
			}
		} else {
			console.log('basket.showModal: "'+ name +'" is not defined');
		}
	}

} ());
