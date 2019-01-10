export default{
	state:{
		show:false
	},
	mutations:{
		switch_loading(state){
			state.show = state.show?false:true;
		}
	},
	actions:{
		switch_loading(content){
			content.commit('switch_loading')
		},
	},
	getters:{
		not_show(state){
			return !state.show;
		}
	}
}
