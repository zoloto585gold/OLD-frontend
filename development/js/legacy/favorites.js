/**
 * Работа с избранными товарами
 */

function initFavoritesActions() {
	// Счетчик избранных продуктов в шапке
	var topCntContainer = $('#top-favirites-cnt');

	// Параметры запроса
	var reqParams = {
		url: '/favorites/ajaxHandler.php',
		type: 'post',
		dataType: 'text',
		data: {
			id: 0
		}
	};
	
	/**
	 * События для кнопки в карточке товаров и в списке продуктов
	 * Функция вызывается несколько раз при подгрузке данных,
	 * поэтому сначала снимаем событие через .off
	 */
	$(document)
		.off('click', '.js-fav-btn, .catalog-item__fav')
		.on('click', '.js-fav-btn, .catalog-item__fav', function (e) {

		var $btn = $(this);
		var $list = $btn.closest('.catalog-list');
		var $item = $btn.closest('.catalog-item');
		var $nextPage = $('.catalog .pagination_list__item__link-next');
		var itemsLen = $list.find('.catalog-item').length;
		var isActive = $(this).hasClass('is-active');
		var isDisabled = typeof $btn.attr('disabled') !== 'undefined';
		var isFavPage = $list.hasClass('catalog-list--favorites');

		e.preventDefault();

		if (isDisabled) {
			return false;
		}

		reqParams.data.id = $(this).data('id');
		reqParams.data.action = isActive ? 'delete':'add';

		// Чтобы не ждать ответа сразу меняем текст и класс кнопки
		// Также защищаем от повторного нажатия
		reqParams.beforeSend = function() {
			var text = isActive ? 'Добавить в избранное' : 'Убрать из избранного';

			$btn[isActive ? 'removeClass':'addClass']('is-active');
			$btn.attr('disabled', 'disabled').text(text);
		}

		// Снимаем disabled с кнопки
		reqParams.complete = function() {
			$btn.removeAttr('disabled');
		}

		// Обновляем счетчик в шапке после ответа
		reqParams.success = function(response) {
			topCntContainer.html(response);
		}

		$.ajax(reqParams);

		if (isFavPage) {
			// Если находимся на странице избранное

			$item.remove();

			if (--itemsLen == 0) {
				if ($nextPage.length) {
					// Обновляем страницу, чтобы перейти на следующую
					window.location.reload();
					$('.favorites .catalog .wait').show();
				} else {
					// Показываем сообщение, что ничего нет
					$('.favorites .catalog .no_faves').show();
				}
			}
		}
	});

	// =====================================================
	// Отмечаем уже избранные 
	$.post(reqParams.url, {'action': 'list'}, function(data){
		try {
			var oFavorites = $.parseJSON(data);

			console.log(JSON.stringify(oFavorites));
			
			topCntContainer.text(oFavorites.length);

			$.each(oFavorites, function(k, itemId) {
				var item = $('#favorites_item_' + itemId + ', .favorites_item_' + itemId);
				if (item.length) {
					item.addClass('is-active')
						.attr('title', 'Убрать из избранного')
						.data('favorite-text', 'Убрать из избранного')
						.text('Убрать из избранного');
				}
			});
		} catch (e) {
			topCntContainer.text(0);
		}

	});
}

if (window.frameCacheVars !== undefined) {
	BX.addCustomEvent('onFrameDataReceived' , function(json) {
		initFavoritesActions();
	});
} else {
	BX.ready(function() {
		initFavoritesActions();
	});
}
