/**
 * Работа с избранными товарами
 */
function toggleFavorite(itemId, object, successHandlerAdd, successHandlerDelete) {
	arRequest = {
		url: "/favorites/ajaxHandler.php",
		type: "post",
		dataType: "text",
		context: object,
		data: {
			id: itemId
		}
	};
	//$(object).toggleClass('catalog-item__fav--active');
	//
	if ($(object).hasClass('catalog-item__fav--active')) {
		arRequest.data.action = 'delete';
		arRequest.success = successHandlerDelete;
	} else {
		arRequest.data.action = 'add';
		arRequest.success = successHandlerAdd;
	}
	$.ajax(arRequest);
}



/**
 *
 *
 */
function markFavorites() {
	var topCntContainer = $('#top-favirites-cnt');
	$.post('/favorites/ajaxHandler.php', {'action': 'list'}, function(data){
		try {
			var oFavorites = $.parseJSON(data);
			topCntContainer.text(oFavorites.length);
			$.each(oFavorites, function(k, itemId) {
				var item = $('#favorites_item_' + itemId + ', .favorites_item_' + itemId);
				if (item.length) {
					$('.catalog-item__fav', item)
						.addClass('catalog-item__fav--active')
						.attr('title', 'Убрать из избранного');
				}
			});
		} catch (e) {
			topCntContainer.text(0);
		}

		// $('.catalog-item__fav').show();
	});
}

/**
 * В крточке товара метод вызывается дважды
 * Один раз при загрузке страницы, другой раз в компоненте catalog.bigdata.products
 * Чтобы навесить обработчики на загруженные рекомендации
 * Поэтому сначала снимаем обработчичи через off
 */
function initFavoritesActions() {
	// работа с "фаворитами"" в шапке сайта(красная "полоска" в шапке сайте, элемент с кинкой в виде "звездочки")
	var topCntContainer = $('#top-favirites-cnt');

	$(document).on('click','.catalog-item__fav', function() {
		var itemId = $(this).data('id');

		toggleFavorite(itemId, this, function(result) {
			$(this).addClass('catalog-item__fav--active');
			$(this).text('Убрать из избранного');
			topCntContainer.html(result);
		}, function(result) {
			$(this).removeClass('catalog-item__fav--active');
			$(this).text('Добавить в избранное');
			topCntContainer.html(result);
		});
		return false;
	});






	$(document).on('click','.catalog-item__fav--active', function() {
		var itemId = $(this).data('id');

		toggleFavorite(itemId, this, null, function(result) {
			//$(this).parent().parent().remove();
			topCntContainer.html(result);
			if ($('.favorites .catalog_list .catalog-item').length == 0) {
				$('.favorites .no_faves').show();
				$('.favorites .no_faves').html('<p>К сожалению, вы пока не отметили ни один товар.</p><p>Мы будем очень рады, если вы посетите наш каталог и выберете что-нибудь интересное.</p>');
			}
		});
	});

	markFavorites();
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
