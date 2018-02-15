Vue.component('com-test1', {
	data() {
		return { 
			todos: [
				{ text: 'a' },
				{ text: 'b' },
				{ text: 'c' } 
			]
		}
	},

	methods: {
		addTodo() {
			let dt = new Date();

			this.todos.push({ text: 'new el '+ dt.getTime() })
		} 
	}
})
