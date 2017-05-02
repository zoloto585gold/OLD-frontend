$.templates({ 'basket-list-template': ' \
	<div class="basket-list">\
		{^{for #data}}\
			<article id="basket-item__{{:ITEM_ID}}" data-id="{{:ITEM_ID}}" class="basket-item" data-cost="{{:COST*AMOUNT}}">\
				<a href="{{:HREF}}" class="basket-item__pic"><img src="{{:IMAGE}}" alt="alt" width="48" height="48"></a>\
				<div class="basket-item__info">\
					<h2 class="basket-item__title">{{:TITLE}}</h2>\
					<div class="basket-item__store">{{:STORE}}</div>\
					<div class="basket-item__amount">{{:AMOUNT}} шт.</div>\
					<div class="basket-item__cost">{{:COST*AMOUNT}} РУБ.</div>\
					<button class="b-button  basket-item__button  js-basket-change-store">Изменить магазин</button>\
					<button class="b-button  b-button--white  basket-item__button  basket-item__button--remove  js-basket-item-remove" data-id="{{:ITEM_ID}}">Удалить</button>\
				</div>\
			</article>\
		{{/for}}\
	</div>\
'});

/***HTML SAMPLE
<div class="basket-list">

	<article class="basket-item">
		<a href="#" class="basket-item__pic"><img src="https://zoloto585.ru/upload/resize_cache/iblock/5f4/999_999_2/IMG_26504s.jpg" alt="alt" width="48" height="48"></a>
		<div class="basket-item__info">
			<h2 class="basket-item__title">Кольцо с одним камнем (бриллиант) из красного золота 585 пробы</h2>
			<div class="basket-item__store">Армавир, ул.Щорса, 54</div>
			<div class="basket-item__amount">1 шт.</div>
			<div class="basket-item__cost">9 910 РУБ.</div>
			<button class="b-button  basket-item__button  js-basket-change-store-button">Изменить магазин</button>
			<button class="b-button  b-button--white  basket-item__button  basket-item__button--remove">Удалить</button>
		</div>
	</article>

</div>
 */