<div class="basket-finishList__item">
	<div class="basket-finishList__itemTop">
		<div class="section__inner">
			<ul>
				<li class="basket-finishList__flex basket-finishList__flex--first">
					<div class="basket-finishList__flexItem">
						<span class="basket-finishList__nubmer">
							<b>{{ index + 1 }}. Заказ</b> № {{ getOrderNum(orderid) }}
						</span>
					</div>
					<div class="basket-finishList__flexItem">Размер</div>
					<div class="basket-finishList__flexItem">Цена</div>
					<div class="basket-finishList__flexItem">Итого</div>
				</li>

				<li v-for="item, j in orderItems" class="basket-finishList__flex">
					<div class="basket-finishList__flexItem" v-html="item.title"></div>
					<div class="basket-finishList__flexItem">
						<div class="show-touch">размер</div>
						<span>{{ item.size }}</span>
					</div>
					<div class="basket-finishList__flexItem">
						<div class="show-touch">цена</div>
						<span>{{ item.total_price | thousandSeparator }}</span> РУБ
					</div>
					<div v-if="j == 0" class="basket-finishList__flexItem">
						<span>
							<b>{{ getOrderSum(orderid) | thousandSeparator }}</b> руб
						</span>
					</div>
				</li>
			</ul>
			<div class="basket-finishList__total show-touch">
				<b>Итого</b>
				<span>
					<b>{{ getOrderSum(orderid) | thousandSeparator }}</b> руб
				</span>
			</div>
		</div>
	</div>

	<cart-order-shop :details="getShopDetails(orderid)"></cart-order-shop>
</div>