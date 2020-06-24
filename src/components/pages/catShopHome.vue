<template>
  <div>
    <div id="content">
      <div class="slider">
        <div class="container">
          <div class="row align-items-center justify-content-center">
            <div class="text-wrap">
              <div class="title">貓咪星球</div>
              <div class="subtitle">Cat World</div>
              <p>一起在貓咪星球探索吧</p>
              <div class="buy-now">
                <router-link to="/shoppage" class="btn btn-primary">立即購買</router-link>
                <!-- <a href="#" class="btn btn-primary"></a>  -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="divider">
      <Categories></Categories>
      <hr class="divider">
      <div class="new-sale">
        <div class="container">
          <div class="title">新品上市</div>
          <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="item in newProduct" :key="item.id">
              <router-link  :to="{ name : 'ShopItem' , params:{ id : item.id}}">
                <img :src="item.imageUrl" class="d-block w-100" alt="...">
              </router-link>
              <div class="text-wrap text-center">
                <router-link :to="{ name : 'ShopItem' , params:{ id : item.id}}">
                  <h5>{{item.title}}</h5>
                </router-link>
                <div class="price">{{item.price | currency}}</div>
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #content .slider{
  background-image: url("../../assets/img/slider.jpg");
  width: 100%;
  background-size: cover;
  background-position: 50% 50%;
  }

  #content .slider .row{
  min-height: 600px;
  }

  #content .slider .row .text-wrap{
    transform: translateY(-50%);
    text-align: center;
  }

  #content .slider .row .text-wrap .title{
    font-size: 30px;
    font-weight: 900;
    letter-spacing: 4px;
  }

  #content .slider .row .text-wrap .subtitle{
    font-size: 20px;
    font-weight: 900;
  }

  #content .slider .row .text-wrap p{
    letter-spacing: 4px;
  }

  #content .slider .row .text-wrap .buy-now{
    margin-top: 100px;
  }

  hr.divider{
    width: 60px;
    height: 2px;
    border: none;
    background: #b8860b;
    margin-top: 50px;
    margin-bottom: 30px;
  }

  #content .new-sale .title{
    text-align: center;
    font-size: 30px;
    font-weight: 900;
    margin-bottom: 15px;
  }

  #content .new-sale .text-wrap{
    margin-top: 20px;
  }

  #content .new-sale .carousel-caption{
    position: static;
    color: black;
  }

  #content .new-sale  .price{
    font-size: 20px;
    color: #b8860b;
    font-weight: 700;
  }

  .swiper-pagination{
    position: static;
  }

  @media(min-width:768px){
    #content .new-sale .carousel-control-prev-icon, #content .new-sale .carousel-control-next-icon{
      top: 40%;
    }
  }
</style>

<script>
import $ from 'jquery'
import Categories from '@/components/categories.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'




export default {
  components:{
    Categories,
    Swiper,
    SwiperSlide
  },
  data(){
    return {
      sideMenu:false,
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
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
      cartLength:"",
      newProductList:['乾貓草-貓薄荷棒','主食生肉餐','消臭抗菌噴霧','火箭貓抓板'],
      newProduct:[],
    }
  },
  methods:{
    getCartLength(){
      const vm =this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.cartLength = response.data.data.carts.length;
        vm.isLoading = false;
      })
    },
    getNewProducts() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      const vm = this;
      this.$http.get(api).then(response => {
        console.log("getNewProducts",response.data);
        vm.newProduct = response.data.products.filter( item => {
          let index = vm.newProductList.findIndex( item1 => item1===item.title);
          if(index==-1){
            return false;
          }else{
            return true;
          }
        })
        console.log('new',vm.newProduct);
      });
    }
  },
  created(){
    this.getCartLength();
    this.getNewProducts();
  },
  mounted() {
  window.scrollTo(0, 0)
  }
}
</script>