import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Detail from '@/components/detail'
import Category from '@/components/category'
import Search from '@/components/search'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/detail/:id',
      component: Detail
    },
    {
      path:'/category/:type',
      component:Category
    },
    {
      path:'/category',
      component:Category
    },
    {
      path:'/search',
      component:Search
    },
    {
      path:"*",
      redirect:"/"
    },
  ]
})
