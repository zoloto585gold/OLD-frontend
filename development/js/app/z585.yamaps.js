(function () {
	var yamaps = Z585.define('Z585.yamaps');

	yamaps.instance = function (options) {
		var self = this;

		self.myMap;
		self.options = $.extend({
			container: 'map', // id
			center: [55.76, 37.64], // moscow
			zoom: 16,
			scrollZoom: true,
			iconImageHref: '/bitrix/templates/zoloto/frontend/images/sprites/sprite__primary-icon-set.png',
			iconImageSize: [33, 44],
			iconImageClipRect: [[99, 393], [132, 437]],

			onBalloonClick: function (e, obj) {}
		}, options);

		self.placemarks = [];

		self.destroyMap = function () {
			if (typeof self.myMap !== 'undefined') {
				self.myMap.destroy();
			}
		}

		self.showMap = function (data, balloon) {
			var center = self.options.center;
			var placemarkCollection;
			var balloonLayout;
			var balloonIsObj = balloon instanceof Object;
			data = data || [];
			
			self.placemarks = [];

			if (data.length) {
				center = data[0].coords;
			}

			ymaps.ready(function () {
				
				try {

					self.myMap = new ymaps.Map(self.options.container, {
						center: center,
						zoom: self.options.zoom,
					});
					
					if (self.options.scrollZoom) {
						self.myMap.controls.add(new ymaps.control.ZoomControl());
						self.myMap.behaviors.enable('scrollZoom');
					}

					if (data.length) {
						placemarkCollection = new ymaps.GeoObjectCollection();

						for (var i = 0; i < data.length; i++) {
							self.placemarks[i] = new ymaps.Placemark(data[i]['coords'],
							{
								shopid: data[i]['shopid'],
								city: data[i]['city'],
								address: data[i]['address'],
								time: data[i]['time'],
								coords: [ data[i]['lat'], data[i]['lon'] ],
							},
							{
								iconLayout: 'default#image',
								iconImageHref: self.options.iconImageHref,
								iconImageSize: self.options.iconImageSize,
								iconImageClipRect: self.options.iconImageClipRect,
								hideIconOnBalloonOpen: false,
								balloonOffset: [0, -100],
							}
							);

							placemarkCollection.add(self.placemarks[i]);
						}
						
						self.myMap.geoObjects.add(placemarkCollection);

						if (typeof balloon !== 'undefined') {
							balloonLayout = balloonIsObj ? balloon.html() : balloon;

							balloonLayout = ymaps.templateLayoutFactory.createClass(balloonLayout,
							{
								build: function () {
									var $closeBtn;

									this.constructor.superclass.build.call(this);

									if (balloonIsObj) {
										$closeBtn = $('#' + self.options.container + ' [data-btn=close-balloon]');

										if ($closeBtn.length) {
											$closeBtn.one('click', $.proxy(this.onCloseClick, this));
										}
									}
								},
								clear: function () {
									this.constructor.superclass.clear.call(this);
								},
								onCloseClick: function (e) {
									e.preventDefault();
									this.events.fire('userclose');
								},
							}
							);
							
							ymaps.layout.storage.add('my#shopsBalloon', balloonLayout);
							placemarkCollection.options.set({balloonLayout:'my#shopsBalloon'});

							self.myMap.geoObjects.events.add('click', function (e) {
								var obj = e.get('target');

								self.setCenter(obj.geometry.getCoordinates(), 15);
								self.options.onBalloonClick.call(this, e, obj);

								if (obj.balloon.isOpen()) {
									obj.balloon.close();
								}
							});

							self.myMap.geoObjects.events.add('mouseenter', function (e) {
								var obj = e.get('target');

								obj.balloon.open();
							});
						}
					}

				} catch(e) {
					Raven.captureException(e);
				}

			}); // end ready ymaps
		}

		self.setCenter = function (coords, zoom) {
			zoom = zoom || self.options.zoom;

			self.myMap.setCenter(coords, zoom);
		}
	}
} ());
