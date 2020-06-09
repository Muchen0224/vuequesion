import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faAlignLeft, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap'


import router from './router'
import App from './App.vue'
import './bus'
import currencyFilter from './filters/currency'
import dateFilter from './filters/date'

library.add(faUserSecret,faSpinner, faAlignLeft)
Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false
Vue.use(VueAxios, axios)

Vue.component('Loading', Loading)
Vue.filter('currency',currencyFilter)
Vue.filter('date' , dateFilter)

axios.defaults.withCredentials = true;

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
