<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div id="content" v-if="cart.total!==0">
      <div class="route">
        <div class="container">
          <router-link to="/">首頁</router-link><span class="routeDivider">/</span><span class="current">購物車</span>
        </div>
      </div>
      <div class="cart-products">
        <div class="container">
          <div class="row">
            <div class="col-12 mb-5 border-bottom my-2 d-lg-none" v-for="item in cart.carts" :key="item.id">
              <div class="container">
                <div class="row">
                  <div class="col-4 pr-0">
                    <a href="#" class="d-block"><img :src="item.product.imageUrl" class="img-fluid" alt=""></a>
                  </div>
                  <div class="col-8 d-flex text-right justify-content-end align-items-center">
                    <a href="#" class="btn btn-outline-danger btn-lg d-flex"
                    @click.prevent="removeCartItem(item.id)">
                      <i class="far fa-trash-alt"></i>
                    </a>
                  </div>
                </div>
                <div class="row">
                  <div class="col-7 pr-0">
                    <a href="#" class="d-block text-black"><div class="product-text">{{ item.product.title}}</div></a>
                  </div>
                  <div class="col-5 text-right font-weight-bold">
                    <div>X{{ item.qty}}</div>
                    <div :class="{'line-through' : item.total!==item.final_total}">{{item.total | currency}}</div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-7 pr-0 text-success" v-if="item.coupon">
                    已套用優惠券
                  </div>
                  <div class="col-5 text-right font-weight-bold text-success" v-if="item.coupon">
                    {{item.final_total | currency}}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 row mb-5 d-none d-lg-block lg-show">
              <div class="table-wrap">
                <table class="table table-bordered text-center">
                  <thead>
                    <tr>
                      <th scope="col">商品圖片</th>
                      <th scope="col">商品名稱</th>
                      <th scope="col">價格</th>
                      <th scope="col">數量</th>
                      <th scope="col">總金額</th>
                      <th scope="col">刪除</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in cart.carts" :key="item.id">
                      <td scope="col"><a class="d-block" href="#"><img :src="item.product.imageUrl" alt=""></a></td>
                      <td scope="col">
                        <div class="row">
                          <div class="col-12">{{item.product.title}}</div>
                          <div class="col-12 text-success" v-if="item.total!==item.final_total">已套用優惠券</div>
                        </div>
                      </td>
                      <td scope="col">
                        <div class="row">
                          <div class="col-12" :class="{'line-through' : item.total!==item.final_total}">{{item.product.price | currency}}</div>
                          <div class="col-12 text-success" v-if="item.total!==item.final_total">{{`${item.final_total/item.qty}` | currency}}</div>
                        </div>
                        </td>
                      <td scope="col">{{item.qty}}</td>
                      <td scope="col">
                        <div class="row">
                          <div class="col-12" :class="{'line-through' : item.total!==item.final_total}">{{item.total | currency}}</div>
                          <div class="col-12 text-success" v-if="item.total!==item.final_total">{{item.final_total | currency}}</div>
                        </div>
                      </td>
                      <td scope="col">
                        <a href="#" class="btn btn-outline-danger btn-sm"
                        @click.prevent="removeCartItem(item.id)">
                          <i class="far fa-trash-alt"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="coupon-gocheck">
        <div class="container">
          <div class="row">
            <div class="col-12 col-lg-6 refresh">
              <div class="container mb-4">
                <div class="row">
                  <div class="col-12 col-md-6 mb-3">
                    <a class="btn btn-primary btn-sm btn-block btn-set text-white" @click.prevent="getCart">更新購物車列表</a>
                  </div>
                  <div class="col-12 col-md-6">
                    <router-link to="/shoppage" class="btn btn-outline-primary btn-sm btn-block btn-set">繼續購物</router-link>
                  </div>
                </div>
              </div>
              <div class="row coupon">
                <div class="col-12">
                  <label for="coupon" class="coupon-title">優惠券</label>
                  <p>如果您有優惠券，請在下方輸入優惠券代碼</p>
                </div>
                <div class="col-12 col-lg-8 mb-3">
                  <input type="text" id="coupon" v-model="coupon_code" placeholder="請輸入優惠券代碼" class="form-control py-3">
                </div>
                <div class="col-12 col-lg-4">
                  <button class="btn btn-primary btn-sm" @click.prevent="addCouponCode">套用優惠券</button>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 pl-lg-5 pay-info">
              <div class="container">
                <div class="row justify-content-end">
                  <div class="col-12 col-lg-8">
                    <div class="row">
                      <div class="col-12 text-right border-bottom mb-4 pb-2 title">付款資訊</div>
                    </div>
                    <div class="row mb-2">
                      <div class="col-6 subtitle">訂單金額</div>
                      <div class="col-6 text-right price">{{ cart.total}}</div>
                    </div>
                    <div class="row mb-4">
                      <div class="col-6 text-success subtitle" v-if="cart.final_total !== cart.total">折後訂單金額</div>
                      <div class="col-6 text-right price text-success" v-if="cart.final_total !== cart.total">{{ cart.final_total | priceFloor}}</div>
                    </div>
                    <div class="row mb-2">
                      <div class="container">
                        <div class="col-12">
                          <router-link to="/checkout" class="btn btn-primary btn-lg btn-block py-3">前往結帳</router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="no-wish" v-else>
      <div class="container position-relative">
        <div class="row justify-content-center">
          <img src="../../assets/img/wishBackground.jpg" class="img-fluid col-12" alt="">
        </div>
        <div class="text-wrap">
          <div class="title">目前購物車沒有商品喔！</div>
          <router-link to="/shoppage" class="btn btn-primary btn-lg">馬上購物</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .text-black{
    color: black;
  }

  .line-through{
    text-decoration: line-through;
  }

  #content .route{
    background-color: #eee;
    padding: 15px 0px;
  }

  #content .route .routeDivider{
    margin: 0px 8px;
  }

  #content .cart-products{
    margin: 40px 0px;
  }

  #content .cart-products td{
    vertical-align: middle;
  }

  #content .cart-products tbody img{
    width: 200px;
  }

  #content .coupon-gocheck .btn-set{
    padding: 10px 20px;
  }

  #content .coupon-gocheck .coupon-title{
    font-size: 24px;
  }

  #content .coupon-gocheck .coupon p{
    color: #8c92a0;
    font-size: 16px;
  }

  #content .coupon-gocheck .pay-info .title{
    font-size: 24px;
  }

  #content .coupon-gocheck .pay-info .subtitle{
    font-size: 16px;
  }

  #content .coupon-gocheck .pay-info .price{
    font-size: 16px;
  }

  .no-wish img {
    max-width: 600px;
  }

  .no-wish .text-wrap{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 250px;
  }

  .no-wish .text-wrap .title{
    font-size: 20px;
    color: white;
    margin-bottom: 15px;
  }
</style>

<script>
import Pagination from '@/components/Pagination'

export default {
  components:{
    Pagination,
  },
  data() {
    return {
      sideMenu:false,
      cart:[],
      pagination: {},
      isLoading: false,
      coupon_code:'',
      cartLength:"",
    }
  },
  methods:{
    getCart(){
      const vm =this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.cart = response.data.data;
        console.log(response);
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
    removeCartItem(id){
      const vm =this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.isLoading = true;
      this.$http.delete(url).then((response) => {
        console.log(response);
        this.getCart();
        this.getCartLength();
        vm.isLoading = false;
      })
    },
    addCouponCode(){
      const vm =this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.coupon_code
      };
      vm.isLoading = true;
      this.$http.post(url , { data:coupon}).then((response) => {
        console.log(response);
        vm.isLoading = false;
        vm.getCart();
      })
    },
  },
  created() {
    this.getCart();
    this.getCartLength();
  },
  mounted() {
  window.scrollTo(0, 0)
  }
}
</script>