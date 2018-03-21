<div class="basket-finishList__itemBottom">
	<div class="section__inner">
		<div class="basket-finishList__flex">
			<div class="basket-finishList__flexItem">
				<div class="basket-finishList__shop">
					<b>Магазин для выдачи</b>
					<div>{{ details.name }}</div>
					<span>Доступно в магазине — Завтра</span>
				</div>
			</div>
			<div class="basket-finishList__flexItem">
				<div class="basket-finishList__time">
					<b>режим работы:</b>
					<div>{{ details.schedule }}</div>
				</div>
			</div>
			<div class="basket-finishList__flexItem">
				<a :href="yamapRoute" class="btn" target="_blank">маршрут на яндекс картах</a>
			</div>
			<div class="basket-finishList__flexItem">
				<button class="btn" @click.prevent="copyCoords(details.gps.lat +' '+ details.gps.lon, $event)">скопировать GPS координаты</button>
			</div>
		</div>
	</div>
</div>