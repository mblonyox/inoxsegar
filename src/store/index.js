import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// Import modules
import auth from './modules/auth'
import upload from './modules/upload'
import ui from './modules/ui'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    upload,
    ui
  },
  plugins: [createPersistedState({
    key: 'v-0.0.1'
  })]
})

export default store
