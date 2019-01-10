import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import loading from './modules/loading.js';

export default new vuex.Store({
	state:{
		show:false
	},
	modules:{
		loading:loading
	}
})
