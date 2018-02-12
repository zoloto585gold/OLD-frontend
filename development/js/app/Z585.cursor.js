// Анимированный курсор

(function () {
	'use strict';

	var cursor = Z585.define('Z585.cursor');

	cursor.animateCursor = function() {

		var zone = $('body');
		var xPos;
		var yPos;
		var posObjx;
		var posObjy;
		var scaleVal;
		var mouseOver = false;

		var mainmenu = $('.header-bottom');

		mainmenu.hover(
			function() {
				mouseOver = true;
				//console.log(mouseOver);
			},
			function() {
				mouseOver = false;
				//console.log(mouseOver);
			}
		);

		// период появленя элементов

		var timer = setInterval(randomElements, 25);		

		// узнаём положение мышки и сохраняем в переменную

		zone.mousemove(function(event) {

				xPos = event.pageX;
				yPos = event.pageY;
				
		});

		

		function randomElements() {



			if ((xPos - posObjx) == 0 && (yPos - posObjy) == 0 || mouseOver == true) {

				// Если мышь не двигается

 			} else {

 				// Если мышь в движении
 				
 				posObjx = xPos;
      			posObjy = yPos;	
      			scaleVal = 0;

      			var element = $('<span class="heart"></span>');
      			zone.append(element);
				
				// рандомное число от 1 до 10
				var rand = Math.floor((Math.random() * 20) + 1);
				
				element.css({
					'top': yPos - rand,
					'left': xPos - rand
				});

				var p = setTimeout(function() {
					element.addClass('heart-min');
					clearTimeout(p);
				},10);

				var t = setTimeout(function() {
					element.remove();
					clearTimeout(t);
				},1500);

      			//console.log(posObjx+' : '+posObjy);
 			}

		}

		
	}

	// запуск функции после загрузки страницы
	$(document).ready(function() {

		//cursor.animateCursor();

	});



} ());