<style>
.header{width:100%; padding:10px;}
.site-menu h1{vertical-align:middle;}
.site-menu h1,
.site-menu ul,
.site-menu ul li{display:inline-block; line-height:60px; font-size:18px; padding:0 10px;}
</style>
<template>
<div class="header clearfix">
  <div class="site-menu fl">
    <h1><a v-link="{name:'home'}"><img src="../../assets/logo.png" width="60"></a></h1>
    <ul>
      <li><a v-link="{name:'home'}">首页</a></li>
      <li><a>组件</a></li>
      <li><a>定制</a></li>
      <li><a>实例</a></li>
    </ul>
  </div>
  <div class="fr quickoption">
    <ul><li><a v-link="{name: 'sign'}">登录</a></li></ul>
  </div>
</div>
</template>
