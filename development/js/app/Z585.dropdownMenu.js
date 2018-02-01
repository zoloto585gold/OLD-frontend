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
  		


 	}

 	$(document).ready(function(){
 		Z585.dropdownMenu.dropdown();	
 	});

	

} ());