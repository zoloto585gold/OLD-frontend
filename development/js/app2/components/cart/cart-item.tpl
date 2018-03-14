<div class="cart__item cart-item list-item">
	<a :href="href" class="cart-item__title" v-html="title"></a>
	<div class="cart__row">
		<a 
			href="#" 
			class="cart-item__remove" 
			@click.prevent="showModal('remove-confirm', index)" 
			v-if="!shopLoading" 
			:data-id="bxid" 
			:data-uuid="uuid" 
			:data-sap="sapcode" 
			:data-price="sanitizedPrice" 
			:data-size="sanitizedSize" 
		>X</a>

		<div class="cart-item__img">
			<img :src="'https://zoloto585.ru' + img" alt="">
			<a href="#" @click.prevent="showModal('item-copy', index)">+ 1 изделие</a>
		</div>

		<div class="cart-item__prices">
			<div class="cart-item__price cart-item__price--old">
				<small>Старая цена</small>
				<s>{{ price | thousandSeparator }} Р</s>
			</div>
			<div class="cart-item__price cart-item__price--new">
				<small>новая цена</small>
				{{ discountPrice }} Р
			</div>
			<div class="cart-item__price cart-item__price--bonus">
				<small>по бонусной карте</small>
				{{ bonusCardCheck ? discountPrice : priceBc | thousandSeparator }} Р
			</div>
		</div>

		<div v-if="shopLoading" class="cart-item__city">
			Загрузка магазина...
		</div>
		<div v-else-if="shopid" class="cart-item__city">
			<span class="cart-item__street">{{ getShopAddr(itemid, shopid) }}</span><br>
			<!--самовывоз: сегодня<br>-->
			<a 
				href="#" 
				class="cart-item__changeCity" 
				@click.prevent="showModal('cart-shops', index)"
			>
				Изменить магазин
			</a>
		</div>
		<div v-else class="cart-item__city">
			<span>ваш город: {{ city }}</span>
			<a 
				v-if="getShopsCount(itemid)" 
				href="#" 
				class="cart-item__chooseCity" 
				@click.prevent="showModal('cart-shops', index)"
			>
				выбери из {{ getShopsCount(itemid) }} {{ getShopsCount(itemid) | plural(['магазина', 'магазинов']) }}
			</a>
			<div v-if="shopid"><span>Магазин успешно выбран</span></div>
		</div>
	</div>
</div>