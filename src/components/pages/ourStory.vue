<template>
  <div>
    <div id="content">
      <div class="route">
        <div class="container">
          <router-link to="/">首頁</router-link><span class="routeDivider">/</span><span class="current">關於我們</span>
        </div>
      </div>
      <div class="intro">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="title">關於我們</div>
              <p>我們相信「健康的寵物食品不是奢侈品，要能讓每隻毛小孩長期享用」，致力於「打造頂級、營養又平易近人的濕食」，所有食品皆由專業獸醫師、營養配方師精心調配把關，希望「讓毛孩吃得更好，陪我們一起慢慢變老。」</p>
              <p>團隊中有專業獸醫師、營養配方師、設計師兼中途…等夥伴，有人專於研究犬貓的營養與健康、有人擬定產品策略、有人善於畫畫設計、有人少女心與母愛爆棚、還有人是天生容易撿到浪浪的神秘體質（?）</p>
              <p>每個夥伴來自不同地方、有著不同性格、專於不同領域，但相同的是那份對毛孩的喜歡與真心，也因為這份喜歡與真心，讓我們熱衷於打造更加安全、健康且適合毛孩的產品，希望能陪伴每一隻毛孩健健康康呷百二！</p>
            </div>
            <div class="d-none d-md-block col-md-6 intro-picture">
              <img src="@/assets/img/about.jpg" class="img-fluid" alt="">
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="features">
        <div class="container">
          <div class="row">
            <div class="feature col-12 col-md-6 col-lg-4">
              <div class="icon"><i class="fas fa-carrot"></i></div>
              <div class="feature-title">營養均衡</div>
              <p>無穀、動物性成份高達95%，並同時符合NRC和AAFCO成幼犬貓營養標準，以天然食材作為營養來源，為毛小孩打好健康基礎 !</p>
            </div>
            <div class="feature col-12 col-md-6 col-lg-4">
              <div class="icon"><i class="fas fa-paw"></i></div>
              <div class="feature-title">安全第一</div>
              <p>採用超高壓滅菌技術，無需擔心寄生蟲和禽流感病毒，生菌數為最高標準沙西米等級，讓毛孩子可以放心食用 !</p>
            </div>
            <div class="feature col-12 col-md-6 col-lg-4">
              <div class="icon"><i class="fas fa-search-plus"></i></div>
              <div class="feature-title">公開透明</div>
              <p>食材來源與食品安全檢驗報告全部公開透明，並投保新光產品責任險3000萬，讓您餵得安心 ; 毛小孩吃得開心。</p>
            </div>
          </div>
        </div>
      </div>
      <hr class="divider">
      <div class="team">
        <div class="container">
          <div class="title text-center">團隊</div>
          <div class="row">
            <div class="member1 text-center col-12 col-md-6 col-lg-4">
              <div class="picture"></div>
              <div class="name">Aatik Tasneem</div>
              <div class="position">創辦人</div>
              <p>在一個契機下，萌生了創立致力於開發健康、無負擔的貓食公司，在親朋好友的鼓勵下義無反顧的投入創業，就此踏入貓咪的世界。</p>
            </div>
            <div class="member2 text-center col-12 col-md-6 col-lg-4">
              <div class="picture"></div>
              <div class="name">Brooke Cagle</div>
              <div class="position">研發</div>
              <p>不是在跟貓咪玩，就是在去找貓咪的路上。</p>
            </div>
            <div class="member3 text-center col-12 col-md-6 col-lg-4">
              <div class="picture"></div>
              <div class="name">Averie woodard</div>
              <div class="position">行銷</div>
              <p>把值得大家信賴的產品，讓更多貓奴知道。</p>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <hr class="divider">
      <Categories></Categories>
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

  hr.divider{
    width: 60px;
    height: 2px;
    border: none;
    background: #b8860b;
    margin-top: 50px;
    margin-bottom: 30px;
  }

  #content .intro{
    padding: 50px 0px;
  }

  #content .intro .title{
    font-size: 30px;
    font-weight: 900;
    margin-top: 40px;
    position:relative;
  }
  
  #content .intro .title:before{
    content: "";
    width: 60px;
    height: 3px;
    background-color: #b8860b;
    position: absolute;
    bottom: 0;
  }

  #content .intro p{
    margin-top: 25px;
    color: #8c92a0;
  }

  #content .intro .intro-picture img{
    max-height: 500px;
    margin: 0 auto;
    display: block;
  }

  #content .features{
    padding: 50px 0px;
  }

  #content .features .feature{
    position: relative;
  }

  #content .features .feature .icon{
    position: absolute;
    font-size: 25px;
    color: #b8860b;
  }

  #content .features .feature .feature-title{
    font-size: 25px;
    padding-left: 35px;
  }

  #content .features .feature p{
    margin: 15px 0px;
  }

  #content .team{
    margin-bottom: 50px;
  }

  #content .team .title{
    font-size: 30px;
    font-weight: 900;
    margin-bottom: 30px;
  }

  #content .team .picture{
    background-image: url("../../assets/img/member1.jpg");
    background-size: cover;
    background-position:50%;
    margin: 0 auto;
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  #content .team .member1 .picture{
    background-image: url("../../assets/img/member1.jpg");
  }

  #content .team .member2 .picture{
    background-image: url("../../assets/img/member2.jpg");
  }

  #content .team .member3 .picture{
    background-image: url("../../assets/img/member3.jpg");
  }

  #content .team .name{
    font-size: 24px;
    margin-top: 15px;
  }

  #content .team .position{
    font-size: 15px;
    color: #b3b3b3;
  }

  #content .team p{
    color: #8c92a0;
    font-size: 16px;
    margin-top: 15px;
  }

  #content .categories{
    margin: 70px 0px;
  }
</style>

<script>
import Categories from "@/components/categories.vue"

export default {
  components: {
    Categories,
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
  mounted() {
  window.scrollTo(0, 0)
  }
};
</script>