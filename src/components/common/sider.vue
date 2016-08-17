<style>
.header{width:100%; padding:10px;}
.site-menu h1{vertical-align:middle;}
.site-menu h1,
.site-menu ul,
.site-menu ul li{display:inline-block; line-height:60px; font-size:18px; padding:0 10px;}
</style>
<template>
<div class="sider">
{{msginfo}}
</div>
</template>
<script>
module.exports = {
  data: function () {
    return {
      msginfo: 'Hello'
    }
  }
}
</script>
