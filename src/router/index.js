import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
		{path:'/',name:'Index',component:()=> import('@/views/index/index'),hidden:true,meta:{index:0},},
  ]
})
