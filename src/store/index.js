import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		isModalVisible: false,
	},
	modules: {
	},
	getters: {
		modalState: state => {
			return state.isModalVisible; 
		}
	},
	mutations: {
		closeModal: state => {
			state.isModalVisible = false;
			console.log('state.isModalVisible', state.isModalVisible)
		},
		openModal: state => {
			state.isModalVisible = true;
			console.log('state.isModalVisible', state.isModalVisible)
		}
	},
	actions: {
		
	}
})
