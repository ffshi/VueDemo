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
      <li><a v-link="{name:'index', exact: true}">首页</a></li>
      <li><a v-link="{name:'project', exact: true}">details</a></li>
      <li><a>about</a></li>
      <li><a v-link="{name: 'signin'}">login</a></li>
    </ul>
  </div>
  <div class="fr quickoption">
    <ul><li><a v-link="{name: 'signin'}">登录</a></li></ul>
  </div>
</div>
</template>
