<style>
.form-item{padding:10px 0 ;}
.form-item input{border:1px solid #ccc;}
</style>
<template>
<form class="tc">
  <br>
  <h1 class="f-16 fb">登录</h1>
  <div class="form-item"><input type="text" placeholder="请输入用户名" name=""></div>
  <div class="form-item"><input type="password" placeholder="请输入密码" name=""></div>
  <div class="form-item"><input type="button" value=" 提交 "  v-link="{name:'home'}"></div>
</form>
</template>
