<template>
  <div>
    <div id="content" v-if="wishListId[0]">
      <div class="route">
        <div class="container">
          <router-link to="/">首頁</router-link><span class="routeDivider">/</span><span class="current">願望清單</span>
        </div>
      </div>
      <div class="container">
        <div class="wishlist-mobile d-lg-none">
          <div class="container">
            <div class="wish" v-for="item in wishList" :key="item.id">
              <div class="container">
                <div class="row mb-4">
                  <div class="col-4 px-0">
                    <router-link :to="{ name : 'ShopItem' , params:{ id : item.id}}" class="d-block">
                      <img :src="item.imageUrl" alt="" class="img-fluid">
                    </router-link>
                  </div>
                  <div class="col-8">
                    <div class="container">
                      <div class="row">
                        <div class="col-12">
                          <router-link :to="{ name : 'ShopItem' , params:{ id : item.id}}">
                          {{item.title}}
                          </router-link>
                        </div>
                        <div class="col-12"><span>{{item.price}}</span><span>{{item.origin_price}}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row flex-nowrap">
                  <div class="col-6 pl-0 input-wrap d-flex align-items-center justify-content-start">
                    <div class="reduce" @click="item.num--">
                      <button class="btn btn-outline-primary btn-sm" :disabled="item.num<=1">-</button>
                    </div>
                    <input type="text" class="form-control" disabled :value=item.num>
                    <div class="add" @click="item.num++">
                      <button class="btn btn-outline-primary btn-sm">+</button>
                    </div>
                  </div>
                  <div class="col-6 d-flex justify-content-between">
                    <a href="#" class="btn btn-primary btn-sm d-flex justify-content-center align-items-center" @click.prevent="addToCart(item.id , item.num)">
                      <i class="fas fa-cart-arrow-down"></i>
                    </a>
                    <a href="#" class="btn btn-outline-secondary btn-sm d-flex justify-content-center align-items-center"
                    @click.prevent="removeWishListItem(item.id)">
                      <i class="far fa-trash-alt"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="wishlist d-none d-lg-block mt-5">
          <table class="table table-bordered text-center">
            <thead>
              <tr>
                <th scope="col">商品圖片</th>
                <th scope="col">商品名稱</th>
                <th scope="col">價格</th>
                <th scope="col">數量</th>
                <th scope="col">加入購物車</th>
                <th scope="col">刪除</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in wishList" :key="item.id">
                <td scope="col">
                  <router-link  :to="{ name : 'ShopItem' , params:{ id : item.id}}" class="d-block"><img :src="item.imageUrl" alt=""></router-link>
                </td>
                <td scope="col">
                  <div class="row">
                    <router-link :to="{ name : 'ShopItem' , params:{ id : item.id}}">
                    <div class="col-12">{{item.title}}</div>
                    </router-link>
                  </div>
                </td>
                <td scope="col">
                  <div class="row">
                    <div class="col-12">{{item.price | currency}}</div>
                  </div>
                  </td>
                <td scope="col">
                  <div class="input-wrap d-flex align-items-center justify-content-center">
                    <div class="reduce" @click="item.num--">
                      <button class="btn btn-outline-primary btn-sm" :disabled="item.num<=1">-</button>
                    </div>
                    <input type="text" class="form-control" disabled :value=item.num>
                    <div class="add" @click="item.num++">
                      <button class="btn btn-outline-primary btn-sm">+</button>
                    </div>
                  </div>
                </td>
                <td scope="col">
                  <a href="#" class="btn btn-primary btn-sm" @click.prevent="addToCart(item.id , item.num)">
                    <i class="fas fa-cart-arrow-down"></i>
                  </a>
                </td>
                <td scope="col">
                  <a href="#" class="btn btn-outline-secondary btn-sm"
                  @click.prevent="removeWishListItem(item.id)">
                    <i class="far fa-trash-alt"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="no-wish" v-else>
      <div class="container position-relative">
        <div class="row justify-content-center">
          <img src="../../assets/img/wishBackground.jpg" class="img-fluid col-12" alt="">
        </div>
        <div class="text-wrap">
          <div class="title">目前沒有願望清單喔！</div>
          <router-link to="/shoppage" class="btn btn-primary btn-lg">馬上購物</router-link>
        </div>
      </div>
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

  #content .wishlist td{
    vertical-align: middle;
  }

  #content .wishlist tbody img{
    width: 200px;
  }

  #content  .input-wrap{
    max-width: 120px;
    margin: 0 auto;
  }

  #content  .input-wrap .add,#content  .input-wrap .reduce{
    height: 38px;
  }

  #content  .input-wrap input{
    border-radius:0;
    width: 50px;
    text-align: center;
    font-weight: 500;
  }

  #content  .input-wrap button{
    width: 35px;
    height: 100%;
  }

  #content  .form-control:disabled{
    background: white;
  }

  #content .wishlist-mobile .wish{
    max-width: 500px;
    margin: 25px auto;
    border-bottom: 1px solid #eee;
    padding-bottom: 25px;
  }

  #content .wishlist-mobile .wish .input-wrap{
    max-width: initial;
    margin: 0px;
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
    width: 200px;
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
  data(){
    return {
      sideMenu:false,
      wishListId:JSON.parse(localStorage.getItem('wishId')) || [],
      wishList:JSON.parse(localStorage.getItem('wished')) || [],
      pagination: {},
      isLoading: false,
      cartLength:"",
    }
  },
  methods:{
    addToCart(id , qty = 1){
      const vm =this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const cart = {
        product_id:id,
        qty
      };
      this.$http.post(url, { data:cart}).then((response) => {
        console.log(response,"id",id);
        //刪除加入購物車的願望清單
        vm.getCartLength();
        vm.removeWishListItem(id);
      });
    },
    removeWishListItem(id){
      let vm =this;
      let deleteTarget = vm.wishListId.findIndex(item => item == id)
      vm.wishListId.splice(deleteTarget,1);
      vm.wishList.splice(deleteTarget,1);
      //更新Local storage
      localStorage.setItem('wished',JSON.stringify(vm.wishList));
      localStorage.setItem('wishId',JSON.stringify(vm.wishListId));
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
    }
  },
  created(){
    let vm =this;
    vm.$bus.$on("updateWishList", (products,Ids) => {
      console.log(products,Ids);
      vm.wishList = products;
      vm.wishListId = Ids;
    })
    this.getCartLength();
  },
  destroyed() {
    let vm =this;
    vm.$bus.$off('updateWishList');
  },
}
</script>