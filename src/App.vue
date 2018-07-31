<template>
  <div id="app">
    <router-view></router-view>
    <footer class="dgm-footer">
      <span>
        <a href="http://www.wzdgm.com/" target="_blank">
          <img src="./assets/dgm_logo.jpg" alt="" style="vertical-align: middle"></a>
        <span class="unselectable">浙江帝杰曼信息科技股份有限公司</span>
      </span>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'app',
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
  
  h1, h2 {
    font-weight: normal;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  .dgm-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: .9rem;
    color: #606266;
    line-height: 25px;
    background-color: #fff;
  }
  .unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
