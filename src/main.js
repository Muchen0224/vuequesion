import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'


import router from './router'
import App from './App.vue'


Vue.config.productionTip = false

Vue.use(VueAxios, axios)

axios.defaults.withCredentals = true;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


router.beforeEach((to, from, next) => {
  console.log('to',to,'from',from,'next',next);
  if(to.meta.requiresAuth){
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then((response) =>{
      console.log(response.data);
      if(response.data.success){
        next();
      }else{
        next({
          path:'/login',
        })
      }
    })
  } else{
    next();
  }
})
