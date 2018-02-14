Vue.component('cart', {
	data() {
		return { 
			items: [
				{
					title: 'СЕРЬГИ-КОНГО БЕЗ ВСТАВОК ИЗ КРАСНОГО ЗОЛОТА 585 ПРОБЫ. РАЗМЕР: 40',
					img: 'https://zoloto585.ru/upload/resize_cache/iblock/148/300_300_2/4300068311.jpg',
					price1: '14 000',
					price2: '12 400', 
					price3: '2 100', 
				}
			]
		};
	},

	methods: {
		addTodo() {
			let dt = new Date();

			this.todos.push({ text: 'new el '+ dt.getTime() })
		} 
	}
})
