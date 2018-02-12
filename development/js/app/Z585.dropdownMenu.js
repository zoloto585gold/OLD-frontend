(function () {
	'use strict';

	var dropdownMenu = Z585.define('Z585.dropdownMenu');

 	dropdownMenu.dropdown = function () {

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

 		// при клике на кнопку открытия меню
 		openBut.on( "click", function() {
		  	headerMenu.prepend('<div class="close-zone"></div>');

		  	headerMenu.addClass('active');
		  	menuInner.addClass('active');
		  	
		  	// запрещает скрол сайта
		  	$('body').addClass('body-fixed');

			$('.close-zone').click(function() {
				menuInner.removeClass('active');
				
		  		$(this).remove();				
		  		setTimeout(function(){
		  			headerMenu.removeClass('active');	
		  			$('body').removeClass('body-fixed');
		  		},450);
			});
		});

		// при клике на тёмную область
		
		
		



 	}

 	$(document).ready(function(){
 		Z585.dropdownMenu.dropdown();	
 	});

	

} ());