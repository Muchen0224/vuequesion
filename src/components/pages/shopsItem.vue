<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div id="content">
      <div class="route">
        <div class="container">
          <router-link to="/">首頁</router-link><span class="routeDivider">/</span>
          <router-link to="/shoppage">商品列表</router-link><span class="routeDivider">/</span>
          <span class="current">{{product.title}}</span>
        </div>
      </div>
      <div class="productItem">
        <div class="container">
          <div class="row mt-4">
            <div class="col-12 col-md-6 mb-3">
              <img :src="product.imageUrl" class="img-fluid" alt="">
            </div>
            <div class="col-12 col-md-6">
              <div class="title mb-1 mb-lg-2">{{product.title}}</div>
              <div class="container mb-1 mb-lg-3">
                <div class="row align-items-center justify-content-start">
                <div class="price mr-4">{{product.price | currency}}</div>
                <div class="origin-price">{{product.origin_price | currency}}</div>
                </div>
              </div>
              <div class="input-wrap d-flex align-items-center justify-content-start mb-2 mb-lg-4">
                <div class="reduce" @click="product.num--">
                  <button class="btn btn-outline-primary btn-sm" :disabled="product.num<=1">-</button>
                </div>
                <input type="text" class="form-control" disabled :value=product.num>
                <div class="add" @click="product.num++">
                  <button class="btn btn-outline-primary btn-sm">+</button>
                </div>
              </div>
              <div class="container">
                <div class="row align-items-center">
                  <button class="btn btn-outline-primary btn-lg" @click.prevent="addToCart(product.id , product.num)">
                    <i class="fas fa-shopping-cart" v-if="!status.loadingItem"></i>
                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem=== product.id"></i>
                    加入購物車
                  </button>
                  <div class="like" @click.prevent="changeWish(product)">
                    <div class="row like-control justify-content-center align-items-center">
                      <i class="far fa-heart" v-if="wishId.indexOf(product.id)==-1"></i>
                      <i class="fas fa-heart" v-else></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="description">
            <ul class="nav nav-tabs pb-2">
              <li class="nav-item">
                <a class="nav-link" :class="{'active': tabActive==='tab-1'}" href="#" @click.prevent="tabActive='tab-1'">產品內容</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" :class="{'active': tabActive==='tab-2'}" href="#" @click.prevent="tabActive='tab-2'">商品資訊</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" :class="{'active': tabActive==='tab-3'}" href="#" @click.prevent="tabActive='tab-3'">常見問題</a>
              </li>
            </ul>
            <div class="tab-content position-relative">
              <div class="nav-content" :class="{'active': tabActive==='tab-1'}">
                {{product.content}}
              </div>
              <div class="nav-info" :class="{'active': tabActive==='tab-2'}">
                <table class="table table-striped">
                  <tr>
                    <th scope="row">製作方式</th>
                    <td>自動化機械無塵無菌設備</td>
                  </tr>
                  <tr>
                    <th scope="row">商品產地</th>
                    <td>台灣新北市</td>
                  </tr>
                  <tr>
                    <th scope="row">分類</th>
                    <td>{{product.category}}</td>
                  </tr>
                  <tr>
                    <th scope="row">單位</th>
                    <td>{{product.unit}}</td>
                  </tr>
                </table>
              </div>
              <div class="nav-question" :class="{'active': tabActive==='tab-3'}">
                <div class="title">購買商品、付款相關</div>
                <ul><li class="question">冷凍常溫可以常溫可以合併購買嗎？</li></ul>
                <p>無法合併配送，需麻煩分開下單喔！因為配合黑貓物流調整運送規範，2019 年 5 月起，汪喵常溫與冷凍品項採分開配送，在官網購買冷凍商品（如汪喵沙西米、生食新手包）與常溫商品（如罐罐、凍乾、零嘴、保健品）需要請毛拔麻分開下單喔！</p>
                <div class="question">有哪些付款方式呢？</div>
                <p>【 信用卡 】【 LINE PAY 】【 超商代碼繳費 】【 ATM 轉帳 】【 宅配貨到付款 】</p>
                <div class="title">運費、配送時間、其他物流相關</div>
                <ul><li class="question">商品多久會到呢？</li></ul>
                <p>宅配 約 1～3 天；超商取件 約 2～4 天(自出貨通知時間起算)<br>
                  【 貓咪星球出貨時間與異動 】
                  汪喵的出貨時間為 平日早上 10:00，宅配方式最快，出貨隔天可以收到，實際配送時間依黑貓為主，提醒毛拔麻可提早訂貨避免毛孩斷糧哦！
                  <br>
                  【 配送時段說明 】
                  官網有提供收件時段給選擇〔宅配〕的 毛拔麻參考，超商取貨、港澳的訂單則無法指定收件時段喔！
                  目前宅配可選擇的黑貓配送時段：
                  <br>
                  早配為早上的9點～13點
                  晚配為下午的14點～18點
                  不指定時段
                  <br>
                  ※以上時段為「建議到貨時間」，僅供毛拔麻參考，實際配送狀況依貨運大哥的路線安排為準，亦無法指定時間點喔！（例如 09:00整、14:30前皆為無效的指定喲）
                  ※週一到週六的晚間18點後及週日整天都不進行配送喔！
                  ※如遇〔連續假期〕或〔國定假日〕，請盡量提早下單，避免因為貨量過多延誤配送，造成毛孩食糧短缺狀況。
                  ※如在不方便的時間點收到電話通知到貨，可以另外跟貨運大哥約時間收貨，或是確認管理室是否能協助代收，另外，也可以跟黑貓大哥約附近的「黑貓站所」領取包裹(站所營業時間皆為週一到週六早上9點～19點)。
                  ◎ 黑貓站所查詢可參考此網站： https://ppt.cc/fsimGx</p>
                <ul><li class="question">冷凍生食可以超商取貨嗎？</li></ul>
                <p>冷凍商品可以使用全家超商取貨喔！
                  生食全程低溫冷凍配送至門市，並存放在門市冷凍庫，毛拔麻可以放心喲！
                  ※由於每間門市的冷凍庫庫存狀況不一，若遇到門市庫存空間不足的情況，可能會無法順利下單，可以改其他全家門市取件喔！</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="divider">
      <div class="sameClassItem mt-5">
        <div class="container">
          <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="item in sameClassProduct" :key="item.id">
              <a href="#" @click.prevent="changeProductPage(item.id)" class="d-block"><img :src="item.imageUrl" class="d-block w-100" alt="..."></a>
              <div class="text-wrap text-center">
                <a href="#" @click.prevent="changeProductPage(item.id)">
                  <h5>{{item.title}}</h5>
                </a>
                <div class="price">{{item.price | currency}}</div>
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        </div>
      </div>
      <Categories class="mt-5"></Categories>
    </div>
  </div>
</template>

<style scoped>
  hr.divider{
    width: 60px;
    height: 2px;
    border: none;
    background: #b8860b;
    margin-top: 50px;
    margin-bottom: 30px;
  }

  #content .route{
    background-color: #eee;
    padding: 15px 0px;
  }

  #content .route .routeDivider{
    margin: 0px 8px;
  }

  #content .route{
    background-color: #eee;
    padding: 15px 0px;
  }

  #content .route .routeDivider{
    margin: 0px 8px;
  }

  #content .productItem .title{
    font-size: 38px;
    font-weight: 800;
  }

  #content .productItem .price{
    font-size: 34px;
    color: #b8860b;
  }

  #content .productItem .origin-price{
    font-size: 24px;
    text-decoration: line-through;
    color: #8c92a0;
  }

  #content .productItem .like{
    font-size: 25px;
    margin-left: 40px;
    color: red;
    cursor: pointer;
    transition: 0.5s all;
  } 

  #content .productItem .like .like-control{
    background-color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 12px
  }

  #content .productItem .description .nav-tabs .nav-link.active{
    border: 1px solid #eee;
    background-color: #b8860b;
    color: white;
    font-weight: 700;
  }

  #content .productItem .description .tab-content{
    width: 70vw;
  }

  #content .productItem .description .tab-content .nav-content{
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  #content .productItem .description .tab-content .nav-info{
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  #content .productItem .description .tab-content .nav-question{
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  #content .productItem .description .tab-content>div.active{
    opacity: 1;
    position: static;
    transition: opacity 0.5s linear;

  }

  #content .productItem .description .tab-content>div.active .opacity-control{
    opacity: 1;
    transition: opacity 1s linear;
  }

  #content .productItem .description .tab-content .nav-question .title{
    font-size: 25px;
    border-bottom: 1px solid #eee;
    padding: 10px 0px;
    margin-bottom: 10px;
  }

  #content .productItem .description .tab-content .nav-question .question{
    font-size: 20px;
    list-style: inside;
  }

  #content .productItem .description .tab-content .nav-question p{
    color: #343a40;
    font-size: 16px;
  }

  #content  .input-wrap{
    max-width: 120px;
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

  #content .sameClassItem .title{
    text-align: center;
    font-size: 30px;
    font-weight: 900;
    margin-bottom: 15px;
  }

  #content .sameClassItem .text-wrap{
    margin-top: 20px;
  }

  #content .sameClassItem .carousel-caption{
    position: static;
    color: black;
  }

  #content .sameClassItem  .price{
    font-size: 20px;
    color: #b8860b;
    font-weight: 700;
  }

  .swiper-pagination{
    position: static;
  }
</style>

<script>
import HomeNav from "@/components/homeNav.vue";
import Footer from "@/components/footer.vue";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import Categories from '@/components/categories.vue'


export default {
  components: {
    HomeNav,
    Footer,
    Swiper,
    SwiperSlide,
    Categories,
  },
  data(){
    return {
      sideMenu:false,
      isLoading:false,
      cartLength:"",
      id:"",
      product:{},
      sameClassProduct:[],
      wishId:JSON.parse(localStorage.getItem('wishId')) || [],
      wished:JSON.parse(localStorage.getItem('wished')) || [],
      tabActive:"tab-1",
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        // loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          }
        }  
      },
      status:{
        loadingItem:''
      }
    }
  },
  methods:{
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
    getProduct(id){
      const vm =this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        response.data.product.num = 1;
        vm.product =  response.data.product;
        console.log('product',response);
        vm.getSameProducts();
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
    changeTab(tab){
      let vm=this;
      vm.tabControl.tab
    },
    getSameProducts() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log("getProducts",response.data);
        this.sameClassProduct = response.data.products.filter( item => {
          return item.category === vm.product.category;
        }) 
        console.log("同類產品",vm.sameClassProduct)
        vm.isLoading = false;
      });
    },
    changeProductPage(id){
      let vm =this;
      console.log(id);
      vm.getProduct(id);
      window.scrollTo(0, 0);
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
      vm.status.loadingItem = "";
      });
    }
  },
  created(){
    this.getCartLength();
    console.log(this.$route.params.id);
    this.id = this.$route.params.id
    this.getProduct(this.id);
    // this.getProducts();
  },
  mounted(){
  window.scrollTo(0, 0);
  }
}
</script>