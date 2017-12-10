<template>
  <div id="app">
    <nprogress-container/>
    <router-view/>
  </div>
</template>

<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'

export default {
  components: {
    NprogressContainer
  }
}
</script>

<style>
.nprogress-container {
  position: static !important;
}
</style>

