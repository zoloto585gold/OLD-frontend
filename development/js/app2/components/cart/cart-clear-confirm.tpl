<modal name="clear-confirm" :adaptive="true" width="700" height="auto">
	<h2 class="modal__header">Очистить корзину?</h2>

	<p class="modal__info">Вы уверены, что хотите удалить все товары из корзины?</p>
	
	<button @click="close(true)"  class="modal__button modal__button--ok">ОК</button>
	<button @click="close(false)" class="modal__button">Отмена</button>

	<button class="modal__close-but" @click="close(false)"></button>
</modal>