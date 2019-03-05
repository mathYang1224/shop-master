import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Main from '@/components/pages/Main'
import User from '@/components/pages/User'
import Search from '@/components/pages/Search'
import goodsBySearch from '@/components/pages/goodsBySearch'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'Main',component: Main,
      children:[
        {path: '/',name: 'ShoppingMall',component: ShoppingMall},
        {path: '/categoryList',name: 'CategoryList',component: CategoryList},
        {path: '/cart',name: 'Cart',component: Cart},
        {path: '/user',name: 'User',component: User},
      ]
    },
    {path: '/register',name: 'Register',component: Register},
    {path: '/login',name: 'Login',component: Login},
    {path: '/goods',name: 'Goods',component: Goods},
    {path: '/search',name: 'Search',component: Search},
    {path: '/goodsBySearch',name: 'goodsBySearch',component: goodsBySearch},
  ]
})
