<template>
  <div>
    <div class="body-wrap">
      <div class="site-wrap" :class="{ 'side-open' : sideMenu}">
        <!--header-->
        <homeNav @openSideMenu="sideMenu = !sideMenu"></homeNav>
        <!--body-->
        <router-view></router-view>
        <hr class="divider">
        <!--footer-->
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .body-wrap{
  overflow: hidden;
  width: 100%;
  }

  .site-wrap{
    position: relative;
    transition: all 0.5s;
  }

  .site-wrap.side-open{
  transform: translateX(-270px);
  }
</style>

<script>
import $ from 'jquery'
import HomeNav from '@/components/homeNav.vue'
import Footer from '@/components/footer.vue'





export default {
  components:{
    HomeNav,
    Footer,
  },
  data(){
    return {
      sideMenu:false,

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
    }
  },
  created(){
    // this.getCartLength();
  },
  mounted() {
  window.scrollTo(0, 0)
  }
}
</script>