<template>
  <div id="app">
    <header-nav></header-nav>
      <div class="col-sm-1"></div>
      <div class="col-sm-11">
      <router-view
        transition="fade"
        transition-mode="out-in"
        keep-alive
        >
      </router-view>
      </div>
    <p class="text-center">
      Copyright 2017 <a href="https://github.com/kentangsjtu" target="_blank">kentangSJTU</a>.
    </p>
  </div>
</template>

<script>
  import Sidebar from './components/Sidebar.vue'
  import HeaderNav from './components/Header.vue'
  export default {
    components:{
      'header-nav': HeaderNav,
      'side-bar': Sidebar
    }
  }
</script>


<style lang="stylus">
@import "./stylus/_syntax.styl"
</style>
