import Vue from 'vue'
import VueRouter from 'vue-router'
import CustomerOrders from '@/components/pages/customerOrders'
import CustomerCheckout from '@/components/pages/customerCheckout'


Vue.use(VueRouter)

  const routes = [
  {
    //避免用戶進入不存在的頁面
    path:'*',
    redirect:'/login'
  },
  {
    path:'/login',
    name:'Login',
    component: () => import('@/components/pages/Login'),
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('@/components/Dashboard'),
    children:[
      {
        path:'products',
        name:'products',
        component: () => import('@/components/pages/products'),
        meta: { requiresAuth: true },
      },
      {
        path:'orders',
        name:'orders',
        component: () => import('@/components/pages/orders'),
        meta: { requiresAuth: true },
      },
      {
        path:'coupons',
        name:'coupons',
        component: () => import('@/components/pages/coupons'),
        meta: { requiresAuth: true },
      }
    ],
  },
  {
    path: '/catshop_home',
    alias:'/',
    name: 'catShop',
    component: () => import('@/components/pages/catShop'),
    children:[
      {
        path: '/catshop_home',
        name: 'shopHome',
        component: () => import('@/components/pages/catShopHome'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/components/pages/ourStory'),
      },
      {
        path: '/shoppage',
        name: 'ShopPage',
        component: () => import('@/components/pages/shoppage'),
      },
      {
        path:'/shopItem/:id',
        name:'ShopItem',
        component: () => import('@/components/pages/shopsItem'),
      },
      {
        path: '/location',
        name: 'Location',
        component: () => import('@/components/pages/location'),
      },
      {
        path:'/wishlist',
        name:'WishList',
        component: () => import('@/components/pages/wishList'),
      },
      {
        path:'/cart',
        name:'Cart',
        component: () => import('@/components/pages/cart'),
      },
      {
        path:'/checkout',
        name:'Check',
        component: () => import('@/components/pages/checkout'),
      },
      {
        path:'/payment/:orderId',
        name:'Payment',
        component: () => import('@/components/pages/payment'),
      },
    ]
  },
  {
    path:'/customer_orders',
    name:'CustomerOrders',
    component:CustomerOrders,
  },
  {
    path:'/customer_checkout/:orderId',
    name:'CustomerCheckout',
    component:CustomerCheckout,
  },
]

const router = new VueRouter({
  routes
})

export default router
