<style>
.mod-form{text-align:center;}
.form-item{padding:10px 0;}
.form-item input{border:1px solid #ccc; padding:3px 5px;}
.custom-active{color:#3385ff;}
</style>
<template>
<div class="tc"><br>
<a v-link="{path:'/sign', exact: true}">登录</a>  .  <a v-link="{path:'/sign/signup', exact: true}">注册</a>
<router-view></router-view>
</div>
</template>

