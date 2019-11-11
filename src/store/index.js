import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		isModalVisible: false,
	},
	mutations: {
		// showModal(isModalVisible) {
		// 	this.isModalVisible = true;
		// },
		// closeModal(isModalVisible) {
		// 	this.isModalVisible = false;
		// },
	},
	actions: {
		// closeModal (context) {
		// 	context.commit('closeModal')
		// },
	},
	modules: {
	},
	computed: {
	}
})
