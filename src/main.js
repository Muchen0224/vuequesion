import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faAlignLeft, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap'
import { ValidationObserver,ValidationProvider, extend, localize, configure } from 'vee-validate'
import { email , required } from 'vee-validate/dist/rules';
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules';

import router from './router'
import App from './App.vue'
import './bus'
import currencyFilter from './filters/currency'
import dateFilter from './filters/date'
import priceFloor from './filters/priceFloor'






for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: TW.messages[rule] // add its message
  });
}

configure({
  classes: {
    valid: 'valid',
    invalid: 'invalid'
  }
})

localize('zh_TW', TW)

extend('email', {
  ...email,　
  message: '郵件地址不正確'　//自訂的訊息
});

extend('required', { // 這邊可以改寫我們 email 告知使用者是必填欄位的提示文字
  ...required,
  message: '此欄位不可為空'
})


library.add(faUserSecret,faSpinner, faAlignLeft)

// Install components globally
Vue.component('Loading', Loading)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);


Vue.config.productionTip = false
Vue.use(VueAxios, axios)

//Filter
Vue.filter('currency',currencyFilter)
Vue.filter('date' , dateFilter)
Vue.filter('floor' , priceFloor)


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
