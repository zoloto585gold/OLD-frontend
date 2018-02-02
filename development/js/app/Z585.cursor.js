// Анимированный курсор

(function () {
	'use strict';

	var cursor = Z585.define('Z585.cursor');

	// запуск функции после загрузки страницы
	$(document).ready(function(e) {
	
		var a1 = document.getElementById("a1");
		var cont = document.getElementsByTagName("html");
		cont.onmousemove = moveEvent;
		var timer;	
		var xPos;
		var yPos;
		var posObjx;
		var posObjy;
		
		function moveEvent(){
			var e;
			if(!e){
				e = window.event;
			}
			
			xPos = e.clientX;
			yPos = e.clientY;
			console.log('xPos: '+xPos+' yPos:'+yPos);
			timer = setInterval(animateMove,150);
		}
		
		function animateMove(){
			posObjx = parseInt(a1.style.left);
			posObjy = parseInt(a1.style.top);
			a1.style.left = xPos + "px";
			a1.style.top = yPos + "px";
			clearInterval(timer);
		}
			
	

	});

	// функция генерирования кода окна
	cursor.animateCursor = function() {
		//alert('animate');
	}

	cursor.animateCursor();

} ());