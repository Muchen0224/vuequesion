<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div id="content">
      <div class="route">
        <div class="container">
          <router-link to="/">首頁</router-link><span class="routeDivider">/</span><span class="current">商品列表</span>
        </div>
      </div>
      <div class="classification d-block d-lg-none mt-4">
        <div class="container">
          <div class="border">
            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseProductClass" aria-expanded="false" aria-controls="collapseExample">
              分類
            </button>
            <div class="collapse" id="collapseProductClass">
              <div class="card card-body border-0">
                <ul class="all">
                  <li><a href="#" @click.prevent="filter ='顯示所有商品'">顯示所有商品</a></li>
                </ul>
                <ul>
                  <li><a href="#" class="d-flex" @click.prevent="filter ='貓食'"><span>貓食</span><span class="ml-auto">3</span></a></li>
                  <li><a href="#" class="d-flex" @click.prevent="filter ='貓抓板'"><span>貓抓板</span><span class="ml-auto">3</span></a></li>
                  <li><a href="#" class="d-flex" @click.prevent="filter ='寵物周邊'"><span>寵物周邊</span><span class="ml-auto">3</span></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="d-none d-lg-block col-lg-3">
          <div class="border side-category">
            <div class="title">分類</div>
            <ul>
              <li><a href="#" @click.prevent="filter ='顯示所有商品'">顯示所有商品</a></li>
            </ul>
            <ul>
              <li><a href="#" class="d-flex" @click.prevent="filter ='貓食'"><span>貓食</span><span class="ml-auto">3</span></a></li>
              <li><a href="#" class="d-flex" @click.prevent="filter ='貓抓板'"><span>貓抓板</span><span class="ml-auto">3</span></a></li>
              <li><a href="#" class="d-flex" @click.prevent="filter ='寵物周邊'"><span>寵物周邊</span><span class="ml-auto">3</span></a></li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-lg-9">
          <div class="product-list">
            <div class="container">
              <div class="filter-text mt-4">分類: {{filter}}</div>
              <div class="row mt-4">
                <div class="col-12 col-lg-6 col-xl-4 mb-4" v-for="(item,key) in filterData" :key="key">
                  <div class="card border-0 shadow-sm">
                    <router-link :to="{ name : 'ShopItem' , params:{ id : item.id}}" class="d-block">
                      <div style="height: 150px; background-size: cover; background-position: center"
                      :style="{backgroundImage:`url(${item.imageUrl})`}">
                      </div>
                    </router-link>
                    <div class="card-body">
                      <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                      <h5 class="card-title">
                        <router-link :to="{ name : 'ShopItem' , params:{ id : item.id}}" class="text-dark">
                          {{item.title}}
                        </router-link>
                      </h5>
                      <p class="card-text">{{item.description}}</p>
                      <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h5" v-if="!item.price">售價{{item.origin_price}}</div>
                        <div class="h6 line-through"  v-if="item.price">原價{{item.origin_price}}</div>
                        <div class="h5" v-if="item.price">售價{{item.price}}</div>
                      </div>
                    </div>
                    <div class="card-footer d-flex">
                      <router-link :to="{ name : 'ShopItem' , params:{ id : item.id}}" class="btn btn-outline-secondary btn-sm">
                        <i class="fas fa-info-circle">查看更多</i>
                      </router-link>
                      <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
                      @click="addToCart(item.id)">
                        <i class="fas fa-shopping-cart" v-if="!status.loadingItem"></i>
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem=== item.id"></i>
                        加到購物車
                      </button>
                    </div>
                    <div class="like" @click.prevent="changeWish(item)">
                      <div class="row justify-content-center align-items-center">
                        <i class="far fa-heart" v-if="wishId.indexOf(item.id)==-1"></i>
                        <i class="fas fa-heart" v-else></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Pagination :pagination='pagination' @turnPage="getProducts"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #content .product-list .like{
    position: absolute;
    right: 2%;
    top: 2%;
    color: red;
    font-size: 20px;
  }

  #content .route{
    background-color: #eee;
    padding: 15px 0px;
  }

  #content .route .routeDivider{
    margin: 0px 8px;
  }

  #content .side-category{
    margin-top: 50px;
    margin-left: 20px;
    padding: 15px;
    font-size: 16px;
  }

  #content .side-category ul{
    margin: 5px 0px;
  }

  #content .side-category .title{
    font-size: 20px;
  }

  #content .classification .border{
    padding: 30px;
  }

  #content .classification button{
    width: 95%;
    display: block;
    margin: 0 auto;
    font-size: 18px;
  }

  #content .classification button:hover{
    box-shadow: 0 5px 20px -7px rgba(0,0,0,.9)
  }

  #content .classification ul li{
    line-height: 2;
  }

  #content .classification .all{
    margin-bottom: 15px;
  }

  #content .filter-text{
    font-size: 20px;
    font-weight: 600;
  }

  #content .product-list .like{
    width: 30px;
    height: 30px;
    background-color: white;
    border-radius: 50%;
    cursor: pointer;
  }

  #content .product-list .like .row{
    width: 100%;
    height: 100%;
    margin: 0px;
  }
</style>

<script>

import $ from "jquery";
import Pagination from '@/components/Pagination'



export default {
  components:{
    Pagination,
  },
  data() {
    return {
      sideMenu:false,
      products: [],
      cart:[],
      pagination: {},
      isLoading: false,
      status:{
        loadingItem:''
      },
      wishId:JSON.parse(localStorage.getItem('wishId')) || [],
      wished:JSON.parse(localStorage.getItem('wished')) || [],
      likeClass:{
        far:true,
        fas:false
      },
      filter:"顯示所有商品",
      cartLength:"",
      coupon_code:'',
      
    }
  },
  methods:{
    getProducts( page = 1 ) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log("getProducts",response.data);
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    addToCart(id , qty = 1){
      const vm =this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id:id,
        qty
      };
      this.$http.post(url, { data:cart}).then((response) => {
        console.log("addToCart",response);
        vm.getCartLength();
        vm.status.loadingItem = '';
      });
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
    changeWish(product) {
      let vm =this;
      vm.wishId =vm.wished.map( item =>{ return item.id});
      let index = vm.wishId.findIndex(id =>{
        return product.id=== id;
      })
      console.log(index);
      if(index == -1){
        vm.wished.push(product);
        vm.wishId.push(product.id);
      }else{
        vm.wished.splice(index,1);
        vm.wishId.splice(index,1)
      }
      console.log(vm.wished);
      vm.wished.forEach( item =>{ //把wished中的num修改成1
        item.num=1;
      })
      localStorage.setItem('wished',JSON.stringify(vm.wished));
      localStorage.setItem('wishId',JSON.stringify(vm.wishId));
    },
    sendWishList(){
      let vm =this;
      vm.$bus.$emit("updateWishList",vm.wished,vm.wishId);
    },
  },
  computed:{
    filterData(){
      let vm =this;
      if(vm.filter ==""){
        return vm.products;
      }else if(vm.filter == "顯示所有商品"){
        return vm.products;
      }else{
        return vm.products.filter(item =>{
          if(vm.filter == item.category){
            return true;
          }else{
            return false;
          }
        })
      }
    },
  },
  created() {
    let vm=this;
    vm.$bus.$on("changeFilter", category => {
      console.log("here",category);
      vm.filter = category;
    });
    this.getProducts();
    this.getCartLength();
  },
  mounted() {
  window.scrollTo(0, 0)
  },
  beforeDestroy() {
    this.sendWishList();
  },
  destroyed() {
    let vm =this;
    vm.$bus.$off('changeFilter');
  },
}
</script>