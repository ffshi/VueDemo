<template>
<form class="mod-form">
  <div class="form-item"><input type="text" placeholder="请输入邮箱"></div>
  <div class="form-item"><input type="password" placeholder="密码总得填的"></div>
  <div class="form-item"><input type="button" value="登录"></div>
  <div><input type="checkbox" name=""><label>自动登录</label></div>
  <div><a>忘记密码？</a>    <a href="#" v-link="{path:'/'}">返回首页</a></div>
  <p>确认遵守用户协议</p>
</form>
</template>
