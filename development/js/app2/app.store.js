import Vue from 'vue/dist/vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		App: {
			namespaced: true,
			state() {
				return {
					modal: {
						show: false,
						content: ''
					}
				};
			},
			mutations: {
				showModal(state, payload) {
					const newState = state;
					newState.modal.show = true;
					newState.modal.content = payload.content;
				}
			}
		}
	}
});
