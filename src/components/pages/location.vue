<template>
  <div>
    <div id="content">
      <div class="route">
        <div class="container">
          <router-link to="/">首頁</router-link><span class="routeDivider">/</span><span class="current">實體店面</span>
        </div>
      </div>
      <div class="location">
        <div class="container">
          <div class="title">實體店面</div>
          <span class="mb-5">110台北市信義區信義路五段7號</span>
          <div class="row mt-4">
            <iframe class="col-12" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7642.329745513127!2d121.56404805448642!3d25.032643951214023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb6da9c9e1f%3A0x1206bcf082fd10a6!2zMTEw5Y-w5YyX5biC5L-h576p5Y2A5L-h576p6Lev5LqU5q61N-iZnw!5e0!3m2!1szh-TW!2stw!4v1582604750415!5m2!1szh-TW!2stw" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
            <div class="transport col-12 col-md-6 col-lg-4 position-relative mt-4">
              <div class="icon d-flex justify-content-center align-items-center"><i class="fas fa-subway"></i></div>
              <div class="method">搭乘捷運</div>
              <div class="subtitle">信義線</div>
              <p>台北101站，4 號出口</p>
              <div class="subtitle">板南線</div>
              <p>政府站，2 號出口步行約 10 分鐘</p>
            </div>
            <div class="transport col-12 col-md-6 col-lg-4 position-relative mt-4">
              <div class="icon d-flex justify-content-center align-items-center"><i class="fas fa-bus"></i></div>
              <div class="method">搭乘公車</div>
              <div class="subtitle">一般公車</div>
              <p>搭乘至市府站、世貿站、信義行政中心、君悅飯店路線之公車，均可到達貓咪星球停車站下車。</p>
              <div class="subtitle">台北觀光雙層巴士</div>
              <p>搭乘至第 12 站 「101 貓咪星球」</p>
            </div>
            <div class="transport col-12 col-md-6 col-lg-4 position-relative mt-4">
              <div class="icon d-flex justify-content-center align-items-center"><i class="fas fa-car"></i></div>
              <div class="method">自行開車</div>
              <div class="subtitle">中山高北上建國高架橋信義路出口下</div>
              <p>左轉信義路 → 左轉基隆路 → 右轉松壽路。</p>
              <div class="subtitle">中山高南下成功路出口下</div>
              <p>右轉成功路二段 → 向陽路 → 右轉忠孝東路 → 左轉松仁路 → 右轉松壽路。</p>
            </div>
            <div class="transport col-12 col-md-6 col-lg-4 position-relative mt-4">
              <div class="icon d-flex justify-content-center align-items-center"><i class="fas fa-train"></i></div>
              <div class="method">如何前往台北火車站?</div>
              <div class="subtitle">搭乘捷運</div>
              <p>「淡水信義線」至台北火車站下車。</p>
              <div class="subtitle">搭乘公車</div>
              <p>信義路五段方向，搭乘「信義幹線」於台北火車站下車。</p>
            </div>
            <div class="transport col-12 col-md-6 col-lg-4 position-relative mt-4">
              <div class="icon d-flex justify-content-center align-items-center"><i class="fas fa-plane-departure"></i></div>
              <div class="method">如何自行前往桃園機場?</div>
              <div class="subtitle">搭乘捷運</div>
              <p>「淡水信義線」轉「機場線」於第二航廈站下車。</p>
              <div class="subtitle">自行開車</div>
              <p>往基隆路一段、堤頂大道一段，走國道一號至大園區機場端出口。</p>
            </div>
          </div>
        </div>
      </div>
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

  #content .location .title{
    font-size: 30px;
    margin-top: 25px;
  }

  #content .location iframe{
    height: 400px;
  }

  #content .location .transport{
    border-bottom: 1px solid #eee;
  }

  #content .location .icon{
    position: absolute;
    top: 5%;
    left: 5%;
    font-size: 30px;
  }

  #content .location .method{
    padding-left: 45px;
    font-size: 30px;
  }

  #content .location .subtitle{
    color: #b8860b;
    font-size: 18px;
  }
</style>

<script>

export default {
  components: {
  },
  data(){
    return {
      sideMenu:false,
      cartLength:"",
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
    this.getCartLength();
  },
  mounted(){
  window.scrollTo(0, 0)
  }
}
</script>