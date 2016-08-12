<style>
</style>


<template>
<Navbar></Navbar>
<div class="p-10 clearfix">
  <Sidebar class="fl col-md-3 p-10"></Sidebar>
  <Container class="fr col-md-9 p-10"></Container>
</div>
</template>



<script>
import Navbar from './components/common/header'
import Sidebar from './components/common/sider'
import Container from './components/common/container'
import Hello from './components/Hello'

export default {
  components: {
    Hello,
    Navbar,
    Sidebar,
    Container
  }
}
</script>
