<template>
  <div>
    <div id="side-mobile-menu">
      <div class="side-wrap">
        <div class="site-logo"><router-link to="/" class="d-block"><img src="@/assets/img/logo.png" alt=""></router-link></div>
        <div class="site-nav">
          <ul class="ml-4">
            <li><span @click="ToggleSideMenu"><router-link to="/">首頁</router-link></span></li>
            <li><span @click="ToggleSideMenu"><router-link to="/about">關於我們</router-link></span></li>
            <li><span @click="ToggleSideMenu"><router-link to="/shoppage">商品列表</router-link></span></li>
            <li><span @click="ToggleSideMenu"><router-link to="/location">實體店面</router-link></span></li>
          </ul>
        </div>
        <div class="site-divider">
          <span><i class="fas fa-paw"></i></span>
          <hr>
        </div>
        <div class="site-user ml-4">
          <i class="fas fa-user mr-2"></i>登入
        </div>
        <div class="wish-list ml-4"  @click="ToggleSideMenu"><router-link to="/wishlist"><i class="far fa-heart mr-2"></i>關注商品</router-link></div>
        <div class="close" @click="ToggleSideMenu"><i class="fas fa-window-close"></i></div>
      </div>
    </div>
    <div class="side-menu-background" @click="ToggleSideMenu"></div>
    <!--Header-->
    <div id="header">
      <div class="container">
        <div class="row align-items-center">
          <div id="logo" class="col-6 col-md-3"><router-link to="/" class="d-block"><img src="@/assets/img/logo.png" class="img-fluid" alt=""></router-link></div>
          <div class="nav d-none d-md-block col-md-6 text-md-right">
            <ul>
              <li><router-link to="/">首頁</router-link></li>
              <li><router-link to="/about">關於我們</router-link></li>
              <li><router-link to="/shoppage">商品列表</router-link></li>
              <li><router-link to="/location">實體店面</router-link></li>
            </ul>
          </div>
          <div class="userarea col-6 col-md-3">
            <ul class="d-flex justify-content-end">
              <li class="d-none d-md-block">
                <ul>
                  <li><router-link to="/login"><i class="fas fa-user"></i></router-link></li>
                  <li class="md-margin"><router-link to="/wishlist"><i class="far fa-heart"></i></router-link></li>
                </ul>
              </li>
              <li><router-link to="/cart" class="position-relative"><i class="fas fa-shopping-cart"></i><span class="cart-num d-flex justify-content-center align-items-center" v-if="cartLength>0">{{cartLength}}</span></router-link></li>
              <li class="d-md-none"><a @click.prevent="ToggleSideMenu" href="#"><i class="fas fa-bars"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #side-mobile-menu{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 270px;
  height: 100%;
  background-color: #f8f8f8;
  z-index: 100;
  transform: translateX(270px);
  }



  .side-menu-background{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  background-color: rgba(0,0,0,.5);
  z-index: 10;
  visibility: hidden;
  }

  .site-wrap.side-open .side-menu-background{
    visibility: visible;
  }

  #side-mobile-menu .site-logo img{
    width: 60px;
    height: 60px;
    margin: 15px auto 0px;
    display: block;
  }

  #side-mobile-menu .site-nav{
    margin-top: 20px;
    margin-bottom: 20px;
  }

  #side-mobile-menu .site-nav ul li{
    font-size: 20px;
    line-height: 3;
  }

  #side-mobile-menu .site-nav ul li a{
    color: #777;
  }

  #side-mobile-menu .site-divider{
    position: relative;
  }

  #side-mobile-menu .site-divider span{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 46px;
    height: 46px;
    border-radius: 23px;
    border: 1px solid #e6e6e6;
    background-color: #f8f8f8;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #side-mobile-menu .site-user , #side-mobile-menu .wish-list{
    font-size: 20px;
    color: #808080;
  }

  #side-mobile-menu .site-user{
    padding-top: 15px;
  }

  #side-mobile-menu .wish-list{
    margin-top: 15px;
    color: #808080;
  }

  #side-mobile-menu .wish-list a{
    color: #808080;
  }

  #side-mobile-menu .close{
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  #header{
    padding: 20px 0px;
  }

  #header .row #logo img{
    width: 65px;
    height: 65px;
  }

  #header .row .nav ul li{
    display: inline-block;
    margin: 0 10px;
    font-size: 15px;
  }

  #header .row .nav ul li a{
    color: #25262a;
  }

  #header .userarea ul li{
    display: inline-block;
    margin-right: 17px;
  }

  #header .userarea i{
    font-size: 25px;
    color: #868995;
  }

  #header .userarea ul li a{
    display: block;
  }

  .cart-num{
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: red;
    right: -44%;
    top: -12px;
    color: white;
  }

  @media(min-width:768px){
    #header .userarea .md-margin{
      margin: 0px;
    }
  }

</style>

<script>
export default {
  props:[
    // 'cartLength'
  ],
  data(){
    return {
      sideMenu:false,
      cartLength:""
    }
  },
  methods:{
    ToggleSideMenu() {
      this.$emit("openSideMenu");
    },
    getCartLength(){
      const vm =this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.cartLength = response.data.data.carts.length;
        vm.isLoading = false;
      })
    }
  },
  created(){
    let vm =this;
    vm.getCartLength();
  },
  mounted(){
    let vm =this;
    vm.$bus.$on("updateCartNum", num => {
      console.log("Cartnum",num);
      vm.cartLength = num;
    })
  }
}
</script>