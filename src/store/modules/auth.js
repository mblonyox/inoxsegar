import router from '../../router'

const apiUrl = 'http://localhost:3000/api/'

const state = {
  user: {
    username: null,
    email: null,
    firstName: null,
    lastName: null
  },
  token: null,
  loggedIn: false,
  pending: false,
  error: null
}

const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setToken (state, token) {
    state.token = token
  },
  setLoggedIn (state, isLoggedIn) {
    state.loggedIn = isLoggedIn
  },
  setPending (state, isPending) {
    state.pending = isPending
  },
  setError (state, error) {
    state.error = error
  }
}

const actions = {
  authenticate ({commit}, {credentials, redirectTo}) {
    commit('setPending', true)
    fetch(apiUrl + 'authenticate', {
      method: 'POST',
      mode: 'cors',
      body: new Blob([JSON.stringify(credentials, null, 2)], {type: 'application/json'})
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          commit('setUser', data.user)
          commit('setToken', data.token)
          commit('setLoggedIn', true)
          router.push(redirectTo)
        } else commit('setError', data.message)
      })
  }
}

export default {
  state,
  mutations,
  actions
}
