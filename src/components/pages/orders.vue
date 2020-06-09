<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item , key) in sortOrder" :key="key">
          <td>{{ item.create_at | date }}</td>
          <td>{{ item.user.email}}</td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-center">{{ item.total | currency}}</td>
          <td>
            <span v-if="item.is_paid" class="text-success">已付款</span>
            <span v-else class="text-muted">未付款</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pagination='pagination' @turnPage="getOrders"></Pagination>
  </div>
</template>

<script>

import Pagination from '@/components/Pagination'

export default {
  data(){
    return {
      orders:[],
      pagination:{},
      isLoading: false,
    }
  },
  components:{
    Pagination
  },
  methods:{
    getOrders( Page = 1){
        const vm = this;
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${Page}`;
        vm.isLoading = true;
        this.$http.get(url, vm.tempProduct).then((response) => {
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
        console.log(response);
      });
    },
  },
  computed:{
    sortOrder(){ 
      const vm =this;
      let newOrder = [];
      if(vm.orders.length){
        newOrder = vm.orders.sort((a,b) => {
          const aIsPaid = a.is_paid ? 1 : 0;
          const bIsPaid = b.is_paid ? 1 : 0;
          return bIsPaid - aIsPaid;
        })
      }
      return newOrder;
    }
  },
  created() {
    this.getOrders();
  }
}

</script>