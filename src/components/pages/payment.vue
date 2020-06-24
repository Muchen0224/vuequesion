<template>
  <div>
    <div id="content">
      <div class="route">
        <div class="container">
          <router-link to="/">首頁</router-link><span class="routeDivider">/</span><span class="current">完成訂單</span>
        </div>
      </div>
      <div class="thanks">
        <div class="container">
          <h1 v-if="order.is_paid===true" class="text-center mt-5">感謝您的購買！</h1>
        </div>
      </div>
      <div class="my-5 row justify-content-center">
        <form class="col-md-6" @submit.prevent="payOrder">
          <table class="table">
            <thead>
              <th>品名</th>
              <th class="text-center">數量</th>
              <th class="text-right">單價</th>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle text-center">{{ item.qty }}</td>
                <td class="align-middle text-right">{{ item.final_total }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right font-weight-bold">總計</td>
                <td class="text-right font-weight-bold">{{ order.total }}</td>
              </tr>
            </tfoot>
          </table>

          <table class="table">
            <tbody>
              <tr>
                <th>Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>收件人電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
                  <span v-else class="text-success">付款完成</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-right my-3" v-if="order.is_paid === false">
            <div class="row justify-content-center">
            <button class="btn btn-danger col-6">確認付款去</button>
            </div>
          </div>
        </form>
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
</style>

<script>
export default {
  data(){
    return {
      order:{
        user:{}
      },
      orderId: ""
    }
  },
  methods:{
    getOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        this.order = response.data.order;
        console.log(response);
        vm.isLoading = false;
      });
    },
    payOrder(){
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.post(url).then(response => {
        console.log(response);
        if(response.data.success){
          vm.getOrder();
        }
        vm.isLoading = false;
      });
    }
  },
  created(){
    this.orderId = this.$route.params.orderId;
    console.log(this.orderId);
    this.getOrder();
  }
}
</script>