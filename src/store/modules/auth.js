import router from '../../router'
import { BaseService, WithToken } from '../../helpers/api-service'

const state = {
  user: {
    id: null,
    username: null,
    email: null,
    admin: false,
    active: false
  },
  token: null,
  loggedIn: false
}

const mutations = {
  setUser(state, user) {
    if (user) {
      state.user.id = user._id
      state.user.username = user.username
      state.user.email = user.email
      state.user.admin = user.admin
      state.user.active = user.active
    } else {
      state.user.id = null
      state.user.username = null
      state.user.email = null
      state.user.admin = false
      state.user.active = false
    }
  },
  setToken(state, token) {
    state.token = token
  },
  setActive(state, isActive) {
    state.user.active = isActive
  },
  setLoggedIn(state, isLoggedIn) {
    state.loggedIn = isLoggedIn
  }
}

const actions = {
  authenticate({commit}, {credentials, remember, redirectTo}) {
    BaseService.doRequest({
      url: 'authenticate',
      method: 'POST',
      body: {...credentials, remember}
    })
      .then(({result}) => {
        if (result.body.success) {
          commit('setUser', result.body.user)
          commit('setToken', result.body.token)
          commit('setLoggedIn', true)
          commit('setSubscription', result.body.user.topicSubscribed)
          if (redirectTo) router.push(redirectTo)
          else router.push('/')
        }
      })
  },
  register({commit}, data) {
    BaseService.doRequest({
      url: 'register',
      method: 'POST',
      body: data
    })
      .then(({result}) => {
        if (result.body.success) {
          commit('setUser', result.body.user)
          commit('setToken', result.body.token)
          commit('setLoggedIn', true)
          commit('setSubscription', result.body.user.topicSubscribed)
          router.push('/activate-account')
        }
      })
  },
  activate({commit, state}, kode) {
    WithToken.doRequest({
      url: 'activate',
      method: 'POST',
      body: {kode}
    })
      .then(({result}) => {
        if (result.body.success) {
          commit('setActive', true)
          router.push('/')
        }
      })
  },
  signOut({commit, dispatch}) {
    commit('setUser', false)
    commit('setToken', null)
    commit('setLoggedIn', false)
    commit('setSubscription', [])
    dispatch('notifySuccess', 'Logout berhasil!')
    router.push('/sign-in')
  }
}

export default {
  state,
  mutations,
  actions
}
