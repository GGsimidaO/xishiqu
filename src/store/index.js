import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import axios from 'axios'
const store=new Vuex.Store({
	state:{
		datalist:null,
	},
	getters:{
		ticketlist:function(state){
			return state.datalist?state.datalist.result:{};
		}
	},
	actions:{
		getTicketlist(store,payload){
			axios.get(payload).then(res=>{
				console.log(res.data)
				store.commit('ticketlist',res.data)
			})
		}
	},
	mutations:{
		ticketlist(state,payload){
			state.datalist=payload;
		},
	}
});
export default store;