$.templates({ 'shop-page-template': ' \
	<div class="section shop-info__header">\
		<div class="section__inner">\
			<h1 class="shop-info__title">Магазин 585Gold</h1>\
			<div class="shop-info__availability">в магазине  сейчас в наличии<br>более 1000 ювелирных изделий</div>\
		</div>\
	</div>\
	<div class="section__inner">\
		<div class="shop-info__slider">\
			<div class="fotorama" data-width="100%" data-arrows="false" data-raw="{{:GALLERY}}">\
				{^{for GALLERY}}\
					<img src="https://zoloto585.ru{{:}}" itemprop="image">\
				{{/for}}\
			</div>\
		</div>\
		<div class="shop-info__locations">\
			<ul class="shop-info__info-list">\
			<li class="shop-info__list-item">\
			<i class="shop-icon shop-icon--point"></i>\
			<span>город:</span>\
			<a href="#">{{:CITY}}</a>\
			</li>\
			<li class="shop-info__list-item"><span>Адрес:</span>{{:ADDRESS.STREET}}, {{:ADDRESS.HOUSE_FLAT}}</li>\
			<li class="shop-info__list-item"><i class="shop-icon shop-icon--clock"></i><span>режим работы:</span>{{:SCHEDULE_PREPARE}}</li>\
			<li class="shop-info__list-item shop-info__list-item--phone"><i class="shop-icon shop-icon--phone"></i>+ 7 000 00 00 00<br><a href="#">заказать обратный звонок</a></li>\
			</ul>\
		</div>\
	</div>\
	<div class="shop-location">\
		<div class="section shop-location__top">\
			<div class="section__inner">\
			<ul>\
			<li class="shop-info__list-item shop-info__list-item--text"><b>Как к нам добраться:</b></li>\
			<li class="shop-info__list-item"><i class="shop-icon shop-icon--yandex"></i><a  href="http://maps.yandex.ru/?rtext=~{{:GPS_N}}%2C{{:GPS_S}}" target="_blank">построить маршрут<br>на яндекс картах</a></li>\
			<li class="shop-info__list-item shop-info__list-item--gps"><i class="shop-icon shop-icon--gps"></i><b>GPS координаты:</b><br>({{:GPS_N}}, {{:GPS_S}})</li>\
			<li class="shop-info__list-item">\
				<!-- ({{:GPS_N}}, {{:GPS_S}}) -->\
				<textarea class="store-item__gps-clipboard  js-clipboard-buffer" data-clipboard-id="123">{{:GPS_N}} {{:GPS_S}}</textarea>\
				<button id="copy-gpscoords-button" class="b-button  button  js-clipboard-button" data-clipboard-id="123">скопировать GPS координаты ></button>\
				<button id="copy-gpscoords-button" class="b-button  store-item__button  store-item__button--gps" data-coords-gps_n="{{:GPS_N}}" data-coords-gps_s="{{:GPS_S}}">Скопировать GPS координаты</button>\</li>\
			</ul>\
			</div>\
		</div>\
		<div class="shop-location__text js-toggle-parent">\
			<div class="section js-toggle-btn">\
				<div class="section__inner">\
				подробное описание:\
				</div>\
			</div>\
			<div class="section js-toggle-content">\
				<div class="section__inner">\
					{{:WAY}}\
				</div>\
			</div>\
		</div>\
		<div class="shop-location__map-block js-toggle-parent">\
			<div class="section shop-location__map-header js-toggle-btn">\
				<div class="section__inner">\
				на карте\
				</div>\
			</div>\
			<div class="shop-location__map js-toggle-content">\
			Карта\
			</div>\
		</div>\
	</div>\
'});