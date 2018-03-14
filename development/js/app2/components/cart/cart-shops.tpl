<modal name="cart-shops" :adaptive="true" width="900" height="540" @opened="opened">
	<div class="modal__info">
		<div class="modal-shops">
			<div class="modal-shops__toggles">
				<div class="active">СПИСКОМ</div>
				<div>НА КАРТЕ</div>
			</div>

			<div class="modal-shops__shopList">
				<div class="modal-shops__title">Выберите магазин:</div>

				<div 
					v-for="shop, index in itemShops" 
					@click="selectShop(shop.xml_id)"
					:class="[
						'modal-shops__item',
						{
							'modal-shops__item--active': shopid == shop.xml_id
						}
					]"
				>
					<div class="modal-shops__shopAddress">{{ shop.address }}</div>
					<!--
					<span class="red">В наличии</span>
					<div class="modal-shops__day">
						Можно забрать: <span>Сегодня</span>
					</div>
					-->
				</div>

				<!--
				<div class="modal-shops__title modal-shops__title--big">изделия Под заказ</div>

				<div class="modal-shops__item">
					<div class="modal-shops__shopAddress">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum tempora</div>
					<span>Под заказ</span>
					<div class="modal-shops__day">
						Можно забрать: <span>29 сентября</span>
					</div>
				</div>
				<div class="modal-shops__item">
					<div class="modal-shops__shopAddress">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum tempora</div>
					<span>Под заказ</span>
					<div class="modal-shops__day">
						Можно забрать: <span>29 сентября</span>
					</div>
				</div>
				<div class="modal-shops__item">
					<div class="modal-shops__shopAddress">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum tempora</div>
					<span>Под заказ</span>
					<div class="modal-shops__day">
						Можно забрать: <span>29 сентября</span>
					</div>
				</div>
				<div class="modal-shops__item">
					<div class="modal-shops__shopAddress">Lorem ipsum dolor sit amet</div>
					<span>Под заказ</span>
					<div class="modal-shops__day">
						Можно забрать: <span>29 сентября</span>
					</div>
				</div>
				<div class="modal-shops__item">
					<div class="modal-shops__shopAddress">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum tempora</div>
					<span>Под заказ</span>
					<div class="modal-shops__day">
						Можно забрать: <span>29 сентября</span>
					</div>
				</div>
				-->
			</div>
			<div class="modal-shops__map">
				<div class="modal-shops__title">ваш город: <span>{{ city }}</span></div>
				<div id="shops-map" class="basket-shops__map"></div>
			</div>
		</div>
	</div>

	<button class="modal__close-but" @click="close(false)"></button>
</modal>