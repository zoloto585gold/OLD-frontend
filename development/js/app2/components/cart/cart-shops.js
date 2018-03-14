import Vue from 'vue/dist/vue'
import { mapState, mapGetters, mapMutations } from 'vuex'
import store from '../../app.store'

/*
|------------------------------------------------------------------------------
| Модалка со списком и картой магазинов
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Регистрация состояния компонента
|------------------------------------------------------------------------------
*/
store.registerModule('CartShops', {
	namespaced: true,
	
	state() {
		return {
			map: null,
			placemarks: [],
			selectedShop: {},
			shopid: 0,
		}
	},

	getters: {},

	mutations: {
		setShopid(state, shopid) {
			state.shopid = shopid
		}
	},
})

/*
|------------------------------------------------------------------------------
| Объявление объекта опций компонента
|------------------------------------------------------------------------------
*/
const CartShops = {	
	template: require('./cart-shops.tpl'),

	props: {
		mapid: {
			type: String,
			default: 'shops-map'
		},
		center: {
			type: Array,
			default() {
				return [55.76, 37.64] // Moscow
			}
		},
		zoom: {
			type: Number,
			default: 10
		}
	},

	computed: {
		...mapGetters('Cart', ['selectedItem', 'city']),
		...mapState('Cart', ['data', 'shops']),
		...mapState('CartShops', ['shopid', 'placemarks']),

		itemShops(state) {
			let itemid = +state.selectedItem.itemid

			return state.shops[itemid]
		},

		selectedShop(state) {
			let shopid = +state.selectedItem.shopid

			if (shopid == 0) {
				return false
			}

			return state.itemShops.filter(shop => shop.xml_id == shopid)[0]
		}
	},

	methods: {
		...mapMutations('Cart', ['setShopid']),
		...mapMutations('CartShops', ['setShopid']),

		close(selected) {
			this.$modal.hide('cart-shops')
		},

		opened(events) {
			const vm = this
			let curShop = vm.selectedShop
			let coords = vm.center

			vm.$store.commit('Cart/setShopid', 0)

			if (curShop) {
				vm.$store.commit('CartShops/setShopid', curShop.xml_id)
			} else {
				curShop = vm.itemShops[0]
			}

			coords = [ curShop.shopLat, curShop.shopLon ];

			const checkApiLoaded = setInterval(() => {
				if (typeof ymaps !== 'undefined') {
					ymaps.ready(() => {
						// инициализация карты
						vm.map = new ymaps.Map(
							vm.mapid,
							{
								center: coords,
								zoom: vm.zoom
							},
							{
								searchControlProvider: 'yandex#search'
							}
						)

						// Контролы карты
						vm.map.controls.add(new ymaps.control.ZoomControl())
						vm.map.behaviors.enable('scrollZoom')

						// Добавляем метки на карту
						let placemarkCollection = new ymaps.GeoObjectCollection()

						vm.itemShops.forEach((shop, index) => {
							let coords = [ shop.shopLat, shop.shopLon ];

							vm.placemarks[index] = new ymaps.Placemark(coords,
								{
									shopid: shop.xml_id,
									address: shop.address,
									time: shop.time,
									coords: coords,
								},
								{
									iconLayout: 'default#image',
									iconImageHref: '/bitrix/templates/zoloto/frontend/images/sprites/sprite__primary-icon-set.png',
									iconImageSize: [33, 44],
									iconImageClipRect: [[99, 393], [132, 437]],
									hideIconOnBalloonOpen: false,
									balloonOffset: [0, -100],
								}
							)

							placemarkCollection.add(vm.placemarks[index])
						})

						vm.map.geoObjects.add(placemarkCollection);

						// Добавляем баллун
						let balloonLayout = ymaps.templateLayoutFactory.createClass(require('./cart-map-balloon.tpl'),
							{
								build() {
									let parent = this.getParentElement()
									this.constructor.superclass.build.call(this)

									// Закрытие балуна
									parent.querySelector('[data-btn=close]')
										.addEventListener('click', (e) => {
											vm.map.balloon.close()
										})

									// Выбрать магазин
									parent.querySelector('[data-btn=select]')
										.addEventListener('click', (e) => {
											vm.$store.commit('Cart/setShopid', e.target.dataset.shopid)
											vm.$store.commit('CartShops/setShopid', 0)

											vm.$modal.hide('cart-shops')
										})
								},
								clear() {
									this.constructor.superclass.clear.call(this)
								},
								onCloseClick(e) {
									e.preventDefault()
									this.events.fire('userclose')
								},
							}
						)

						ymaps.layout.storage.add('my#shopsBalloon', balloonLayout);
						placemarkCollection.options.set({balloonLayout:'my#shopsBalloon'})

						// Клик по метке
						vm.map.geoObjects.events.add('click', (e) => {
							var obj = e.get('target')

							vm.map.setCenter(obj.geometry.getCoordinates(), 16)
							vm.$store.commit('CartShops/setShopid', obj.properties.get('shopid'))

							obj.balloon.close()
						});

						// Переходим к выбранному магазину, открываем баллун, центрируем
						if (vm.shopid) {
							vm.placemarks.forEach((e) => {
								if (vm.shopid == e.properties.get('shopid')) {
									e.balloon.open();
									vm.map.setCenter(e.properties.get('coords'), 16)
								}
							});
						}
					})
	
					clearInterval(checkApiLoaded)
				}
			}, 500)
		},

		selectShop(shopid) {
			const vm = this
			
			vm.$store.commit('CartShops/setShopid', shopid)

			vm.placemarks.forEach((e) => {
				if (shopid == e.properties.get('shopid')) {
					e.balloon.open();
					vm.map.setCenter(e.properties.get('coords'), 16)
				}
			});
		}
	},

	watch: {}
}

Vue.component('CartShops', CartShops)

export default CartShops


