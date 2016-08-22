<template>
<div class="container">
  <hello></hello><br>
  首页时间戳 ： {{new Date() | getLastTimeStr}}
  {{productData.interestStartModeName}}
</div>
</template>
<script>
import Vue from 'vue';
import Hello from '../components/Hello'
export default {
  components: {Hello},
  data: function () {
    return {
      greeting: true,
      message: 'Hello world',
      todos: [
        {test: '1'},
        {test: '2'},
        {test: '3'}
      ],
      productData: {}
    }
  },
  ready () {
    this.getProdductData();
    this.getStatisticData();
  },
  methods: {
    getProdductData: function () {
      let self = this;
      Vue.snb.sendData(_publicConfig.baseUrl+'/products/1012',{
        method : 'GET',
        headers: {},
      },function(data){
        console.log(data);
        self.productData = data
      });
    },
    getStatisticData: function () {
      let self = this;
      Vue.snb.sendData(_publicConfig.baseUrl+'/members/login',{
        method : 'POST',
        headers: {},
        body   : "username=13520300801&password=7cbb3252ba6b7e9c422fac5334d22054"
      },function(data){
        console.log(data);
        self.productData = data
      });
    }
  }
}
</script>

