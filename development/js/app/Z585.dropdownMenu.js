(function () {
	'use strict';

	var dropdownMenu = Z585.define('Z585.dropdownMenu');

 	dropdownMenu.dropdown = function () {

 		var timer;

 		$('.main-nav-item').each(function(){
 			
 			var navItem 		= $(this).attr('id');
 			var selectMenu 		= $('#'+navItem);
 			var selectDropdown 	= $('[nav-item='+navItem+']');

 			// при наведении
 			
 			selectMenu.hover(
 				function() {
 					selectDropdown.addClass('dropdown-show');
 				},
 				function() {
 					selectDropdown.removeClass('dropdown-show');
 				}
 			);

 			// при наведении на dropdown, что бы оставался треугольник

 			selectDropdown.hover(
 				function() {
 					selectMenu.addClass('main-nav-item__current');
 				},
 				function() {
 					selectMenu.removeClass('main-nav-item__current');
 				}
 			);

 		});

 		// Mobile menu functional

 		// кнопка открытия меню
 		var openBut 		= $('.top-sandwich__button');


 		// меню
 		var headerMenu 		= $('.header-menu');
 		var menuInner 		= $('.header-menu__mobContainer');
 		

 		// setInterval(function(){
 		// 	console.log(timer);
 		// },100);

 		// при клике на кнопку открытия меню
 		openBut.on( "click", function() {
		  	headerMenu.prepend('<div class="close-zone"></div>');

		  	headerMenu.addClass('active');
		  	menuInner.addClass('active');

		  	menuInner.scrollTop(0);

		  	//document.body.addEventListener('touchmove',function(event){event.preventDefault();},false);
			
			// Запрещает скролл в мобильной версии
			//headerMenu.bind('touchmove', false);

		  	

		  	// запрещает скрол сайта
		  	$('body').addClass('body-fixed');

		  	// при клике на тёмную область
			$('.close-zone').click(function() {
				menuInner.removeClass('active');			

				// пока выполняется сворачивание меню, 
				// функция не выполняется 450 мсек
		  		timer = setTimeout(function(){
		  			
		  			// плавное исчезание тени
		  			$('.close-zone').stop().animate({
		  				'opacity' : 0
		  			}, 200, function(){ 
		  				$('body').removeClass('body-fixed');
		  				headerMenu.removeClass('active');	
		  				$(this).remove();
		  			});

		  		}, 450);
		  		
			});
		});

		function clearF() {
			clearTimeout(timer);
			//console.log('timer: '+ timer +'  | end func');
		}


 	}

 	$(document).ready(function(){
 		Z585.dropdownMenu.dropdown();	
 	});

	

} ());