<template>
<div class="container">
  <hello></hello><br>
  <h3 class="fb f-16 pt-10">双向数据绑定测试示例</h3>
  <div>{{message}} <br><input type="text" v-model="message" v-on:keyup.enter="addTodo"></div>
  {{message + ' vue is awesome!'}} <br>
  {{'翻转后的结果: ' +message.split('').reverse().join('') }}

  <h3 class="fb f-16 pt-10">循环：v-for</h3>
  <ul>
    <li v-for="item in todos">序列-{{item.test}} <button v-on:click="removeTodo($index)">delete</button></li>
  </ul>

  <h3 class="fb f-16 pt-10">处理用户输入</h3>
  <button v-on:click="reverseMessage">reverse Message</button>

  <h3 class="fb f-16 pt-10">If</h3>
  <p v-if="greeting">test if</p>


</div>
</template>
<script>
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
      ]
    }
  },
  ready () {

  },
  methods: {
    submit: function (msg, e) {
      e.stopPropagation()
    },
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    },
    removeTodo: function (index) {
      this.todos.splice(index, 1)
    },
    addTodo: function () {
      if (this.message.trim()) {
        this.todos.push({test: this.message.trim()})
      }
    }

  }
}
</script>
