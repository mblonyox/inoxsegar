// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import nprogress from './helpers/nprogress'
import './helpers/notification'
import './helpers/sweetalert2'

// Import bulma css
import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.css'

Vue.config.productionTip = false

window.swal = Vue.swal

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  nprogress,
  template: '<App/>',
  components: { App }
})
