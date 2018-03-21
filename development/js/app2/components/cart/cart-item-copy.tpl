<modal name="item-copy" :adaptive="true" width="700" height="auto" @opened="opened">
	<div class="modal__info" v-if="item.price">
		<div class="basket-pcard-modal">
			<div class="basket-pcard-modal__title" v-html="title"></div>
			<div class="basket-pcard-modal__row">
				<div class="basket-pcard-modal__img">
					<img :src="item.img" alt="">
				</div>

				<div class="basket-pcard-modal__info">
					<div class="basket-pcard-modal__prices" v-if="prices.price">
						<div class="basket-pcard-modal__price-col">
							<div class="basket-pcard-modal__price / basket-pcard-modal__price--old">
								<div>Старая цена</div>
								<span>{{ prices.price | thousandSeparator }}</span>
							</div>
						</div>
						<div class="basket-pcard-modal__price-col">
							<div class="basket-pcard-modal__price">
								<div>Новая цена</div>
								<span>{{ prices.discount_price | thousandSeparator }} Р</span>
							</div>
						</div>
						<div class="basket-pcard-modal__price-col">
							<div class="basket-pcard-modal__price / basket-pcard-modal__price--bonus">
								<div>По бонусной карте</div>
								<span>{{ prices.price_bc | thousandSeparator }} Р</span>
							</div>
						</div>
					</div>

					<div class="basket-pcard-modal__fitting" v-if="offers">
						<template v-if="type == 'SIZE'">
							<h3>Выберите размер:</h3>

							<div class="basket-pcard-modal__fitting-list">
								<button 
									v-for="(offer, index) in offers" 
									:data-selected="index == selected" 
									@click.prevent="selectOffer(index)"
								>
									{{ offer.SIZE }}
								</button>
							</div>
						</template>
						<template v-else-if="offers.length > 1">
							<select class="basket-pcard-modal__fitting-selector" @change="selectOffer($event.target.value)">
								<option value="0" disabled selected>Выберите вес...</option>
								<option 
									v-for="(offer, index) in offers" 
									:selected="index == selected" 
									:value="index"
								>
									{{ offer.WEIGHT_WITH_INSERTS }} г
								</option>
							</select>
						</template>
					</div>

					<button class="basket-pcard-modal__buy" @click.prevent="addToCart">Добавить в корзину</button>
				</div>
			</div>

			<!--
			<div class="basket-pcard-modal__info2">
				<b>Металл:</b> золото.
				<b>Проба:</b> 375.
				<b>Цвет металла:</b> красный.
				<b>Вставка:</b> фианит.
				<b>Хар-ка камня:</b> Swawrovski
			</div>
			-->
		</div>
	</div>

	<button class="modal__close-but" @click="$modal.hide('item-copy')"></button>
</modal>