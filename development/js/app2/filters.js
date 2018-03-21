import Vue from 'vue/dist/vue'

/**
 * Склонение существительного после числительного
 * {{ count | plural(['магазин', 'магазинов']) }}
 * {{ count | plural(['магазин', 'магазина', 'магазинов']) }}
 */
Vue.filter('plural', (value, forms) => {
	let n = Math.abs(+value);
	
	n %= 100

	if (n >= 5 && n <= 20) return forms[2] || forms[1]

	n %= 10

	if (n === 1) return forms[0]
	if (n >= 2 && n <= 4) return forms[1]

	return forms[2] || forms[1]
})

/**
 * Разделитель тысяч в ценах
 */
Vue.filter('thousandSeparator', (value) => {
	return value
		.toString()
		.replace(/\..+$/, '')
		.replace(/\D+/g, '')
		.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
})
