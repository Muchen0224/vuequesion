import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Dashboard from '@/components/Dashboard.vue'
import Login from '@/components/pages/Login.vue'
import Products from '@/components/pages/products'
import Orders from '@/components/pages/orders'
import Coupons from '@/components/pages/coupons'





Vue.use(VueRouter)

  const routes = [
  {
    //避免用戶進入不存在的頁面
    path:'*',
    redirect:'/login'
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  //   meta: { requiresAuth: true },
  // },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path: '/admin',
    name: 'Home',
    component: Dashboard,
    children:[
      {
        path:'products',
        name:'products',
        component:Products,
        meta: { requiresAuth: true },
      },
      {
        path:'orders',
        name:'orders',
        component:Orders,
        meta: { requiresAuth: true },
      },
      {
        path:'coupons',
        name:'coupons',
        component:Coupons,
        meta: { requiresAuth: true },
      }
    ],
  }
]

const router = new VueRouter({
  routes
})

export default router
