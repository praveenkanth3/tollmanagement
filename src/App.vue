<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
html,body {
  height: 100%;
}
body {
  overflow: hidden;
  margin: 0;
}
#app {
  height: 100%;
}
</style>
