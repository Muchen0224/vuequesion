<template>
  <div>
    <div id="content">
      <div class="route">
        <div class="container">
          <router-link to="/">首頁</router-link><span class="routeDivider">/</span><span class="current">確認訂單</span>
        </div>
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <div class="purchase-info py-5">
          <div class="container">
            <div class="row">
              <div class="col-12 col-lg-6 buyer-info">
                <div class="title my-3">購買人資訊</div>
                <div class="border p-5">
                  <div class="row justify-content-center">
                    <form class="col-12">
                      <div class="form-group">
                        <label for="useremail" class="font-weight-bold">信箱*</label>
                        <ValidationProvider name="email" rules="required|email" v-slot="{ errors , classes }">
                          <div :class="classes">
                            <input type="email" class="form-control" id="useremail" v-model="form.user.email"
                            placeholder="example@gamil.com">
                            <span class="text-danger">{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider>
                      </div>

                      <div class="form-group">
                        <label for="username"  class="font-weight-bold">收件人姓名*</label>
                        <ValidationProvider rules="required" v-slot="{ errors ,classes }">
                          <div :class="classes">
                            <input type="text" class="form-control"  id="username"
                            v-model="form.user.name" placeholder="輸入姓名">
                            <span class="text-danger">{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider>
                      </div>
                    
                      <div class="form-group">
                        <label for="usertel"  class="font-weight-bold">收件人電話*</label>
                        <ValidationProvider rules="required" v-slot="{ errors ,classes }">
                          <div :class="classes">
                            <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
                            <span class="text-danger">{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider>
                      </div>
                    
                      <div class="form-group">
                        <label for="useraddress"  class="font-weight-bold">收件人地址*</label>
                        <ValidationProvider rules="required" v-slot="{ errors ,classes }">
                          <div :class="classes">
                            <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
                            placeholder="請輸入地址">
                            <span class="text-danger">{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider>
                      </div>
                    
                      <div class="form-group">
                        <label for="comment"  class="font-weight-bold">留言</label>
                        <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"
                        placeholder="給我們訂單訊息或是注意事項"></textarea>
                      </div>
                      <!-- <div class="text-right">
                        <button class="btn btn-danger">送出訂單</button>
                      </div> -->
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-6 order-info">
                <div class="title my-3">訂單明細</div>
                <div class="border p-5">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>產品名稱</th>
                        <th class="text-center">數量</th>
                        <th class="text-right">價格</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in cart.carts" :key="item.id">
                        <td class="text-primary">
                          {{item.product.title}}
                          <div class="text-success" v-if="item.total!==item.final_total">已套用優惠券</div>
                          <div class="text-secondary" v-if="item.total==item.final_total">未套用優惠券</div>
                        </td>
                        <td class="text-center">{{item.qty}}</td>
                        <td class="text-right">
                          {{item.total}}
                          <div class="text-success" v-if="item.total!==item.final_total">{{item.final_total}}</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="table">
                    <tbody>
                      <tr>
                        <td class="font-weight-bold">總金額</td>
                        <td class="text-right font-weight-bold" v-if="cart.total==cart.final_total">{{cart.total}}</td>
                        <td class="text-right text-success font-weight-bold" v-if="cart.total!==cart.final_total">{{cart.final_total}}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="create-order">
                    <div class="container">
                      <div class="row">
                        <button class="btn btn-primary btn-lg col-12 justify-content-center"
                        @click.prevent="handleSubmit(createOrder)">確認訂單</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ValidationObserver>
      
      
    </div>
  </div>
</template>

<style scoped>
  #content .route{
    background-color: #eee;
    padding: 15px 0px;
  }

  #content .route .routeDivider{
    margin: 0px 8px;
  }

  #content .purchase-info .buyer-info .title,#content .purchase-info .order-info .title{
    font-size: 28px;
    font-weight: 800;
  }

  .invalid {
  color: #EB0600;
  }
  .invalid input {
    border: 1px #EB0600 solid
  }
  .valid {
    color: green;
  }
  .valid input {
    border: 1px solid green
  }
</style>

<script>
export default {
  data(){
    return {
      form:{
        user:{
          name:'',
          email:'',
          tel:'',
          address:''
        },
        message:''
      },
      isLoading:false,
      cartLength:"",
      cart:[],
    }
  },
  methods:{
    createOrder(){
      const vm =this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      const order = vm.form;
      vm.isLoading = true;
      this.$http.post(url , { data:order}).then((response) => {
        console.log('訂單已建立',response);
        vm.getCartLength();
        if(response.data.success){
          vm.$router.push(`/payment/${response.data.orderId}`)
        }
        vm.isLoading = false;
      })
    },
    getCartLength(){
      const vm =this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.cartLength = response.data.data.carts.length;
        vm.$bus.$emit('updateCartNum',vm.cartLength);
        vm.isLoading = false;
      })
    },
    getCart(){
      const vm =this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.cart = response.data.data;
        console.log(response);
        vm.isLoading = false;
      })
    }
  },
  created() {
    this.getCartLength();
    this.getCart();
  },
  mounted() {
  window.scrollTo(0, 0)
  }
}
</script>