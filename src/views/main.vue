<template>
<div class="container">
  <hello></hello><br>
  首页时间戳 ： {{new Date() | getLastTimeStr}}
  {{productData.interestStartModeName}}
</div>
</template>
<script>
import Hello from '../components/Hello'
import fetch from 'isomorphic-fetch'
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
      productData: {},
      productData2: {}
    }
  },
  ready () {
    this.getProdductData()
  },
  methods: {
    getProdductData: function () {
      let self = this
      fetch('http://bohaifae.com/rest/products/1012').then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data)
            // self.productData = data
          })
        } else {
          console.log('Looks like the response wasn’t perfect, got status', response.status)
        }
      })
    },
    getProdductData2: function () {
      // let self = this
      // this.$http.get('http://bohaifae.com/rest/products/1013').then(function (response) {
      //   console.log(response.data)
      //   self.productData2 = response.data
      // }, function (response) {
      //     // error callback
      // })
    }
  }
}
</script>
