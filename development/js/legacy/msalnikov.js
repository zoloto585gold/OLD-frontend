/*

 */
// ==============
// == forms.js ==
// ==============
//
//
// что делает: стилизует состояния для полей форм,
// в зависимости от действия/манипуляции с полем формы
;$(function () {
	// старый вариант текстовго поля
	$('.form').on('focusin', function (event) {
		var $_this = $(event.target);
		if($_this.hasClass('form__field-input')) $_this.parent().addClass('focus');
	});
	$('.form').on('focusout', function (event) {
		var $_this = $(event.target);
		if($_this.hasClass('form__field-input')) $_this.parent().removeClass('focus');
	});


	// кастомизированное текстовое поле input type="text" (form-textline.less)
	$('.form-textline').on('focusin', function (event) {
		$(this).addClass('form-textline--active');
	});
	$('.form-textline').on('focusout', function (event) {
		$(this).removeClass('form-textline--active');
	});
});
//
//
//
//
//
//
//
//
//
// =======================
// = ПОПАП ВЫБОРА ГОРОДА =
// =======================
;$(function () {
	function topGeoModal(a) {
		if(a) {
			$('.top-geo-modal').addClass('top-geo-modal--active');
			$('.top-geo-modal__inner').addClass('top-geo-modal__inner--active');
		}
		else if(!a) {
			$('.top-geo-modal').removeClass('top-geo-modal--active');
			$('.top-geo-modal__inner').removeClass('top-geo-modal__inner--active');
		}
	}

	//
	// Search
	//
	$(document).on('keyup', '.js-top-geo-form__search input', function(e) {
		var $wrap = $(this).closest('[data-wrap]');
		var $next = [];
		var list  = [];
		var query = $.trim($(this).val());
		var tag = 'span';
		var regex = RegExp('^'+query, 'gi');
		var replacement = '<'+ tag +'>$&</'+ tag +'>';
		var scrollApi = $('.js-top-geo-form__cities').data('jsp');
		var cityName;

		if (e.keyCode == 13 && $wrap.find('[data-menu] li').length) {
			// enter
			cityName = $.trim($wrap.find('[data-menu] .active').text());
			set_city(cityName);
			$('.top-geo__button>span').text(cityName); // устанавлмвает в рзамтке в шапке название выбранного города
			$('.top-geo-form__chosen-city-result').text(cityName); // для мобильной версии
			topGeoModal(false); // закрывает окно

			// Посылаем город в корзину, обновляем корзину в шапке
			Z585.basket.requestAPI('setcity', {
				city: cityName,
			}, {
				partial: {
					name: 'topbasket'
				}
			});

			return false;
		}
		else if ($.inArray(e.keyCode, [ 40, 38 ]) != -1) {
			if (e.keyCode == 40) {
				// down
				$next = $wrap.find('[data-menu] .active').next().length ?
					$wrap.find('[data-menu] .active').next() :
					$wrap.find('[data-menu] li').first();
			}

			if (e.keyCode == 38) {
				// up
				$next = $wrap.find('[data-menu] .active').prev().length ?
					$wrap.find('[data-menu] .active').prev() :
					$wrap.find('[data-menu] li').last();
			}

			if ($next.length) {
				$next.addClass('active').siblings().removeClass('active');
			}
		} else {
			$wrap.find('[data-menu] li').remove();

			$('.js-top-geo-form__cities [data-city]').each(function() {
				if ($(this).text().search(regex) != -1) {
					$wrap.find('[data-menu]').append('<li>'+ $(this).text() +'</li>');
				}
			});

			if ($wrap.find('[data-menu] li').length) {
				$wrap.find('[data-menu]').show();
				if ($wrap.find('[data-menu] .active').length == 0) {
					$wrap.find('[data-menu] li').first().addClass('active');
				}
			} else {
				$wrap.find('[data-menu]').hide();
			}
		}

		$('.top-geo-form__pop-cities')[query.length >= 2 ? 'hide':'show']();

		if (query.length < 2) {
			return false;
		}

		$('.js-top-geo-form__cities a[data-city] span').contents().unwrap();

		$('.js-top-geo-form__cities a[data-city]').each(function() {
			if ($(this).text().search(regex) != -1 && scrollApi !== false) {
				scrollApi.scrollToElement(this, true);
				scrollApi = false;
			}

			$(this).html(function() {
				return $(this).text().replace(regex, replacement);
			});
		});
	});

	$(document).on('click', '.js-top-geo-form__search [data-menu] li', function(e) {
		var cityName = $.trim($(this).text());

		set_city(cityName);
		$('.top-geo__button>span').text(cityName); // устанавлмвает в рзамтке в шапке название выбранного города
		$('.top-geo-form__chosen-city-result').text(cityName); // для мобильной версии
		topGeoModal(false); // закрывает окно

		// Посылаем город в корзину, обновляем корзину в шапке
		Z585.basket.requestAPI('setcity', {
			city: cityName,
		}, {
			partial: {
				name: 'topbasket'
			}
		});
	});

	$(document).on('click', '.js-top-geo-form__search [data-btn=clear]', function(e) {
		var $wrap = $(this).closest('[data-wrap]');

		$wrap
			.find('input').val('').end()
			.find('[data-menu]').hide().end();

		$('.top-geo-form__pop-cities').show();
	});

	$(document).on('submit', '.top-geo-form', function () {
		return false;
	});

	$(document).on('click', '.top-geo__button', function () {
		topGeoModal(true);
	});

	$(document).on('click', '.top-geo-modal__close', function () {
		topGeoModal(false);
	});

	$(document).on('click', '.top-geo-modal', function (event) {
		if($(event.target).hasClass('top-geo-modal')) topGeoModal(false);
	});

	$(document).on('click', '.top-geo-form a', function (event) {
		event.preventDefault();

		var cityName = $(this).text(); //выбранный город

		$('.js-top-geo-form__search input').val("").trigger("keyup"); //очистим город в строке поиска

		// код взаимодейтвия с сервером для установки выбранного города
		set_city(cityName);
		$('.top-geo__button>span').text(cityName); // устанавлмвает в рзамтке в шапке название выбранного города
		$('.top-geo-form__chosen-city-result').text(cityName); // для мобильной версии
		topGeoModal(false); // закрывает окно

		// Посылаем город в корзину, обновляем корзину в шапке
		Z585.basket.requestAPI('setcity', {
			city: cityName,
		}, {
			partial: {
				name: 'topbasket'
			}
		});
	});
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// ================================
// = ОБРАБОТЧИК НАВИГАЦИИ В ШАПКЕ =
// ================================
;$(document).ready(function() {

	// --------------------------
	// вспомогательные переменные
	// --------------------------
	var $altMainNavItems = $('.alt-main-nav__item'),
		$naviInnerListWrapper = $('.navi-inner-list-wrapper');



	// ищем элемент с css-классом '.alt-main-nav'
	// у этого элемента берём значение data-атрибута 'data-main-nav'
	// парсим эту JSON-строку в нормальный JavaScript-объект
	// этот объект/структуру называем mainNavData
	//
	// объявляем переменную mainNavBanners, которая представляет
	// массив из html-кусков групп баннеров для каждой вкладки
	// 8 вкладок = 8 баннеров
	//
	var mainNavData = JSON.parse($('.alt-main-nav').attr('data-main-nav'));
	var mainNavBanners = [];



	// -----------------------
	// вспомогательные функции
	// -----------------------



	//
	// функция, которая делает html-шаблонизацию для объекта/струтктуры mainNavData
	// и записвает этот html с данными в массив mainNavBanners
	//
	function mainNavBannersHTMLWrapper () {
		mainNavData.forEach(function (item, index, array) {
			var bannersHTML = '';

			if(item['nav-banners'] !== undefined) {
				Array.prototype.forEach.call(item['nav-banners']['nav-banners-item'], function (item, index, array) {
					var image = '<a class="nav-banners-link" href="' + item['href'] + '"><img class="nav-banners-link__img" src="' + item['img'] + '" alt=""></a>';
					var button = item['button'] !== false ? ('<a class="b-button nav-banners-button" href="' + item['href'] + '">' + item['button'] + '</a>') : '';
					var banner = '<div class="nav-banners__item  nav-banners__item--type-' + item['type'] + '">' + image + button + '</div>';

					bannersHTML += banner;
				});
				mainNavBanners[item['tab-number']] = '<div class="nav-banners  nav-banners--type-' + item['nav-banners']['nav-banners-type'] + '">' + bannersHTML + '</div>';
			}
		});

		return mainNavBanners;
	}


	//
	// функция, которая вставляет в html-разметку главной навигации на странице
	// сгенерированную разметку баннеров
	// каждая группа баннеров вставляется в свой лист
	//
	function addMainNavBanners() {
		if($('.nav-banners').length === 0) {
			mainNavBanners.forEach(function (item, index, array) {
				$('.main-nav__item[data-inner-list=' + index + ']').append(item);
			});
		}
	}



	//
	// функция, котрая удаляет баннеры из вкладок
	//
	function removeMainNavBanners() {
		$('.nav-banners').remove();
	}


	//
	// функция, которая устанавливает значение для data-атрибутов фонов и фоновых цветов
	// выпадающих вкладок главной навигации
	//
	function setMainNavBGImages() {
		mainNavData.forEach(function (item, index, array) {
			$('.alt-main-nav__item[data-inner-list=' + item['tab-number'] + ']').attr('data-inner-background-image', item['inner-background-image']);
			$('.alt-main-nav__item[data-inner-list=' + item['tab-number'] + ']').attr('data-inner-background-color', item['inner-background-color']);
			$('.alt-main-nav__item[data-inner-list=' + item['tab-number'] + ']').attr('data-outer-background-image', item['outer-background-image']);
			$('.alt-main-nav__item[data-inner-list=' + item['tab-number'] + ']').attr('data-outer-background-color', item['outer-background-color']);
			//console.log(item['tab-number']);
		});
	}


	// закрывает touchnavi и/или сбрасывает настройки активности навгиции,
	// которые доступны только для touch-устройств
	function resetTouchNavi() {
		$('.section').removeClass('section--offset-left');

		$('.top-sandwich__button').removeClass('top-sandwich__button--active');
		$('.header-bottom').removeClass('header-bottom--active');
		$('.header-bottom__inner').removeClass('header-bottom__inner--active');

		// убирает заморозку вертикального скролла для страницы
		$('body').removeClass('h-canvas-freeze-for-touch-navi');

		// сбрасывает меню до дефолтного состояния(все вкладки становятся закрытыми)
		$('.main-nav-level-1__header').removeClass('main-nav-level-1__header--active');
		$('.main-nav-level-1__list').removeClass('main-nav-level-1__list--active');
		$('.main-nav-level-2__header').removeClass('main-nav-level-2__header--active');
		$('.main-nav-level-2__list').removeClass('main-nav-level-2__list--active');
	}

	//
	// function openTouchNavi() {}

	// сбрасывает/удаляет элементы присущие навигации только для desktop-устройств
	function resetDesktopNavi() {}

	// фон тянущийся на всю ширину для каждой вкладки
	function setDesktopNaviOuterBackground(innerListId) {
		var bg = $('.alt-main-nav__item[data-inner-list = ' + innerListId + ']').attr('data-outer-background-image') === 'none' ? 'none' : 'url(' + $('.alt-main-nav__item[data-inner-list = ' + innerListId + ']').attr('data-outer-background-image') + ')';
		if(innerListId != 0) {
			$('.navi-inner-list-wrapper').addClass('navi-inner-list-wrapper--active');
			$('.navi-inner-list-wrapper').css({'background-image' : bg});
		}
		// console.log(bg);
	}
	// убирает фон тянущийся на всю ширину
	function resetDesktopNaviOuterBackground(innerListId) {
		$('.navi-inner-list-wrapper').removeClass('navi-inner-list-wrapper--active');
	}

	function setDesktopNaviInnerListWrapper(innerListId) {
		var bg = $('.alt-main-nav__item[data-inner-list = ' + innerListId + ']').attr('data-outer-background-image') === 'none' ? 'none' : 'url(' + $('.alt-main-nav__item[data-inner-list = ' + innerListId + ']').attr('data-outer-background-image') + ')';
		if(innerListId != 0) {
			$naviInnerListWrapper
				.addClass('navi-inner-list-wrapper--active')
				.css({'background-image' : bg})
				.attr('data-inner-list', innerListId);
		}

	}
	function resetDesktopNaviInnerListWrapper() {
		$('.navi-inner-list-wrapper').removeClass('navi-inner-list-wrapper--active');
	}




	// -------------------
	// @TOUCH NAVI HANDLER
	// -------------------
	// обработка поведения навигации
	// когда ширина экрана <= 1024px
	// т.е. для @touch
	$(document).on('click', function (el) {
		// функция сбрасывает меню до дефолтного состояния(все вкладки становятся закрытыми)
		function resetMainNav() {
			$('.main-nav-level-1__header').removeClass('main-nav-level-1__header--active');
			$('.main-nav-level-1__list').removeClass('main-nav-level-1__list--active');
			$('.main-nav-level-2__header').removeClass('main-nav-level-2__header--active');
			$('.main-nav-level-2__list').removeClass('main-nav-level-2__list--active');
		}

		// настройка для вкладок открытых по умолчанию для первого открытия меню
		function defaultMainNav() {
			$('.main-nav-level-1__header').first().addClass('main-nav-level-1__header--active');
			$('.main-nav-level-1__list').first().addClass('main-nav-level-1__list--active');
			$('.main-nav-level-2__header').first().addClass('main-nav-level-2__header--active');
			$('.main-nav-level-2__list').first().addClass('main-nav-level-2__list--active');
		}



		var wanted = el.target,
			$wanted = $(wanted);


		// клик по "сэндвичу"
		if($wanted.hasClass('top-sandwich__button')) {

			// закрывает меню по клику на кнопку с тремя полосками "Сандвич"
			if($wanted.hasClass('top-sandwich__button--active')) resetTouchNavi();

			// открываем меню
			else {
				$('.section').addClass('section--offset-left');
				$('.header-bottom').removeClass('section--offset-left');

				$wanted.addClass('top-sandwich__button--active');
				$('.header-bottom').addClass('header-bottom--active');
				$('.header-bottom__inner').addClass('header-bottom__inner--active');

				// добавляет заморозку вертикального скролла для страницы
				$('body').addClass('h-canvas-freeze-for-touch-navi');

				defaultMainNav();
			}
		}

		// закрывает меню по клику по надписи "Скрыть каталог"
		if($wanted.hasClass('top-sandwich__button-text')) resetTouchNavi();

		// закрывает меню по клику по пустой белой области справа от меню(эскейпер)
		if($wanted.hasClass('header-bottom')) resetTouchNavi();




		// обработка кликов по табам для "выпадайки"
		// выриант когда выпадайка ведёт себя как аккордеон

		// уровень вложенности 1
		if($wanted.hasClass('main-nav-level-1__header')) {
			if($(wanted).hasClass('main-nav-level-1__header--active')) { // закрываем открытое
				$('.main-nav-level-1__header').removeClass('main-nav-level-1__header--active');
				$('.main-nav-level-1__list').removeClass('main-nav-level-1__list--active');
			}
			else { // открываем нажатое
				resetMainNav();

				$('.main-nav-level-1__header').removeClass('main-nav-level-1__header--active');
				$('.main-nav-level-1__list').removeClass('main-nav-level-1__list--active');
				$(wanted).addClass('main-nav-level-1__header--active');
				$(wanted).next('.main-nav-level-1__list').addClass('main-nav-level-1__list--active');
			}
		}

		// уровень вложенности 2
		if($wanted.hasClass('main-nav-level-2__header')) {
			if($(wanted).hasClass('main-nav-level-2__header--active')) { // закрываем открытое
				$('.main-nav-level-2__header').removeClass('main-nav-level-2__header--active');
				$('.main-nav-level-2__list').removeClass('main-nav-level-2__list--active');
			}
			else { // открываем нажатое
				$('.main-nav-level-2__header').removeClass('main-nav-level-2__header--active');
				$('.main-nav-level-2__list').removeClass('main-nav-level-2__list--active');
				$(wanted).addClass('main-nav-level-2__header--active');
				$(wanted).next('.main-nav-level-2__list').addClass('main-nav-level-2__list--active');
			}
		}
	});



	// ---------------------
	// @DESKTOP NAVI HANDLER
	// ---------------------
	// обработка поведения навигации,
	// для разрешения экрана > 1024px по ширине
	// т.е. для @desktop
	var $mainNav = $('.main-nav'),
		$mainNavItems = $('.main-nav__item'),
		$altMainNav = $('.alt-main-nav'),

		$headerBottom = $('.header-bottom');

	// #ref
	function showInnerListForDesktop(el) {
		var innerListId = $(this).attr('data-inner-list'),
			bg = $('.alt-main-nav__item[data-inner-list = ' + innerListId + ']').attr('data-outer-background-image') === 'none' ? 'none' : 'url(' + $('.alt-main-nav__item[data-inner-list = ' + innerListId + ']').attr('data-outer-background-image') + ')';

		$('.alt-main-nav__item').removeClass('alt-main-nav__item--active');
		if(innerListId != 0) {
			$('.main-nav').addClass('main-nav--hover');
			$('.main-nav__item').removeClass('main-nav__item--active');
			$('.main-nav__item[data-inner-list = ' + innerListId + ']').addClass('main-nav__item--active');
			$('.alt-main-nav__item[data-inner-list = ' + innerListId + ']').addClass('alt-main-nav__item--active');
			$('.navi-inner-list-wrapper').attr('data-inner-list', innerListId);
			$('.navi-inner-list-wrapper[data-inner-list = ' + innerListId + ']')
				.addClass('navi-inner-list-wrapper--active')
				.css({'background-image' : bg});
			$('.header-bottom').addClass('header-bottom--hover');
		}
	}

	// (1) hover
	// рассматривается hover когда
	// указатель мыши находится над одной из
	// кнопок "КАТАЛОГ", "КОЛЬЦА", "СЕРbГИ", ..., для варианта в десктоп-версии
	// и открывает соответствующее кнопке внутренне подменю;
	$('.alt-main-nav__item').hover(showInnerListForDesktop, function (el) {
		var innerListId = $(this).attr('data-inner-list');

		$mainNav.removeClass('main-nav--hover');
		$headerBottom.removeClass('header-bottom--hover');
		$altMainNavItems.removeClass('alt-main-nav__item--active');


		// test
		resetDesktopNaviOuterBackground(innerListId);
	});


	// (2) hover
	// рассматривается hover когда
	// указатель мыши находится над одной из
	// выпадших вкладок
	// находит соответствующий "надпункт" из "alt-main-nav", который соответствует данной активной вкладке
	// и делает этот "надпункт" активным;
	//
	// оставляет черный треуголник активности на кнопке
	// когда курсор ушёл с этой кнопке
	// на выпадающий блок
	$('.main-nav__item').hover(showInnerListForDesktop, function (el) {
		var innerListId = $(this).attr('data-inner-list');

		$('.alt-main-nav__item[data-inner-list = ' + innerListId + ']').removeClass('alt-main-nav__item--active');
		resetDesktopNaviOuterBackground(innerListId);
	});


	// (3) hover
	// рассматривается hover когда
	// указатель мыши находится или покидает
	// всю навигацию;
	//
	// отображает/скрывает
	// заднюю подложку(которая тянется на весь экран по ширине) для выпадающего блока меню
	$('.main-nav').hover(function (el) {
		$headerBottom.addClass('header-bottom--hover');
		$mainNav.addClass('main-nav--hover');
	}, function (el) {
		$headerBottom.removeClass('header-bottom--hover');
		$mainNav.removeClass('main-nav--hover');
		$altMainNavItems.removeClass('alt-main-nav__item--active');
	});





	// #ref
	function resetNaviInnerList(el) {
		var innerListId = $(this).attr('data-inner-list');

		$mainNav.removeClass('main-nav--hover');
		$mainNavItems.removeClass('main-nav__item--active');
		$('.main-nav__item[data-inner-list = ' + innerListId + ']').removeClass('main-nav__item--active');
		$('.alt-main-nav__item[data-inner-list = ' + innerListId + ']').removeClass('alt-main-nav__item--active');
		$headerBottom.removeClass('header-bottom--hover');
		resetDesktopNaviInnerListWrapper(innerListId);
		console.log(innerListId);
	}


	//
	// инициализация баннеров
	// в главной навигации
	//
	mainNavBannersHTMLWrapper();
	setMainNavBGImages();

	// убираю старые значения которые в верстке есть, в проде убрать строку
	// removeMainNavBanners();

	addMainNavBanners();

	// адаптайзер
	/*if(parseInt(window.innerWidth) > 999) {
		addMainNavBanners();
	} else {
		removeMainNavBanners();
	}

	$(window).on('resize', function () {
		if(parseInt(window.innerWidth) > 999) {
			addMainNavBanners();
		} else {
			removeMainNavBanners();
		}
	});*/


	// (2) hover
	// (3) hover
	// (4) hover
	// для naviInnerListWrapper
	$naviInnerListWrapper.hover(showInnerListForDesktop, resetNaviInnerList);



	// ---------
	// ADAPTIZER
	// ---------
	$(window).on('resize', function () {
		if(parseInt(window.innerWidth) > 1024) {
			resetTouchNavi();
		}
	});





});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// ====================
// = ПОДБОР УКРАШЕНИЯ =
// ====================
;$(function () {
	var tab = 'index-filter__header',
		$tab = $('.' + tab),
		active = tab + '--active',

		filter = 'filter-mini',
		$filter = $('.' + filter),
		opened = filter + '--opened';

	$tab.on('click', function () {
		if($filter.hasClass(opened)) {
			$filter.removeClass(opened);
			$tab.removeClass(active);
		}
		else {
			$filter.addClass(opened);
			$tab.addClass(active);
		}
	});
});
//
//
//
// =======================
// = ФИЛЬТР ДЛЯ КАТАЛОГА =
// =======================
;$(function() { // фильтр для каталога
	$('.js-filter-group-scroll-pane').jScrollPane({
		autoReinitialise : true,
		verticalDragMinHeight: 9,
		verticalDragMaxHeight: 9,
		horizontalDragMinWidth: 9,
		horizontalDragMaxWidth: 9
	});

	// открытие закрытие фильтра
	$('#catalog-filter-change-button').on('click', function (event) {
		event.preventDefault();
		$('.filter').hasClass('filter--closed') ? $('.filter').removeClass('filter--closed') : $('.filter').addClass('filter--closed');
	});

	// кнопка reset фильтра
	$('#catalog-filter-reset-button').on('click', function (event) {

	});

	// кнопка submit фильтра
	$('#catalog-filter-submit-button').on('click', function (event) {
		event.preventDefault();

		//
		// отправка значений с формы фильтра на сервер
		//

		$('.filter').addClass('filter--closed');
	});

	// кнопка с выбранным тегом поиска
	$('.filter-tags__tab').on('click', function (event) {
		$(this).remove();
	});
});
// Юля Остапенко
$(function(){
	$('#catalog_filter_form .js-scroll-pane').jScrollPane(
		{
			autoReinitialise : true,
			verticalDragMinHeight: 9,
			verticalDragMaxHeight: 9,
			horizontalDragMinWidth: 9,
			horizontalDragMaxWidth: 9
		}
	);
});
//
//
//
// =======================
// = Включение горизонтального скролла на тач устройствах =
// =======================
$(function() {
	if( $('.js-scroll-touch').length > 0 ) {
		if(parseInt(window.innerWidth) < 1024) {
			$('.js-scroll-touch').jScrollPane({
				autoReinitialise : true,
			});
		} else {
			$('.js-scroll-touch').jScrollPane().data('jsp').destroy();
		}

		$(window).on('resize', function () {
			if(parseInt(window.innerWidth) < 1024) {
				$('.js-scroll-touch').jScrollPane({
					autoReinitialise : true,
				});
			} else {
				$('.js-scroll-touch').jScrollPane().data('jsp').destroy();
			}
		});
	}
});
//
//
//
// ===========================
// = Нижний попап с бонусами =
// ===========================
$(function() {
	var $contentSect = $('.section.content');
	var $bonusCont = $('.footer-bonus');
	var docHeight = $(document).height();
	var contentOffset = $contentSect.length ? $contentSect.offset().top : 0;
	var checkHeight = (docHeight - contentOffset) / 2;
	var bonusCheck = false;
	var bonusCookie = $.cookie('foot-bonus-closed');

	if ($bonusCont.length == 0 || bonusCookie) {
		return false;
	}

	$(window).on('scroll', function() {
		var winScroll = $(window).scrollTop();

		if (bonusCheck === true) {
			return false;
		}

		// если доскролили до середины контента показываем блок и пишем куку на день
		if (winScroll > checkHeight) {
			$bonusCont.fadeIn(250);
			$.cookie('foot-bonus-closed', 'yes', { expires: 1 });
			bonusCheck = true;
		}
	});

	// Закрываем блок, записываем куку на 7 дней
	$('.js-footer-bonus__close').on('click', function () {
		$(this).closest('[data-wrap]').hide();
		$.cookie('foot-bonus-closed', 'yes', { expires: 7 });
	});
});

// ===========================
// = Корзина =
// ===========================
if (window.frameCacheVars !== undefined) {
	BX.addCustomEvent('onFrameDataReceived' , function(json) {
		Z585.basket.init();
	});
} else {
	BX.ready(function() {
		Z585.basket.init();
	});
}
