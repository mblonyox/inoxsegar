<template>
  <div id="app">
    <nprogress-container/>
    <notifications group="system" />
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

.vue-notification {
  font-size: 1rem;
  margin: 10px 15px 15px;
}

.vue-notification.success {
  background-color: #23d160;
  border-left-color: #03521f
}
</style>

