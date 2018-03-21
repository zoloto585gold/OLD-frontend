import Vue from 'vue/dist/vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		App: {
			namespaced: true,
			state() {
				return {
					preloader: false,
					alert: {
						show: false,
						title: '',
						text:  '',
					},
					modal: {
						show: false,
						content: ''
					}
				};
			},
			mutations: {
				setAlert(state, payload) {
					state.alert = payload;
				},

				setPreloader(state, payload) {
					state.preloader = payload;
				}
			}
		}
	}
})
