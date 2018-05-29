import vm from '../../main'

const state = {
  notifications: [],
  pending: false,
  subscriptions: []
}

const getters = {
  isSubscribed: (state) => (topic) => {
    return state.subscriptions.includes(topic)
  }
}

const mutations = {
  pushNotification(state, notification) {
    state.notifications.push(notification)
  },
  removeNotification(state, notification) {
    state.notifications.splice(state.notifications.indexOf(notification), 1)
  },
  clearNotification(state) {
    state.notification = []
  },
  setPending(state, isPending) {
    state.pending = !!isPending
  },
  setSubscription(state, subscriptions) {
    state.subscriptions = subscriptions || []
  },
  pushSubscription(state, topic) {
    state.subscriptions.push(topic)
  },
  removeSubscription(state, topic) {
    state.subscriptions.splice(state.subscriptions.indexOf(topic), 1)
  }
}

const actions = {
  notifySuccess({commit}, message) {
    const notification = {
      group: 'system',
      type: 'success',
      title: 'Sukses!',
      text: message
    }
    commit('pushNotification', notification)
    vm.$notify(notification)
  },
  notifyWarning({commit}, message) {
    const notification = {
      group: 'system',
      type: 'warning',
      title: 'Peringatan!',
      text: message
    }
    commit('pushNotification', notification)
    vm.$notify(notification)
  },
  notifyInfo({commit}, message) {
    const notification = {
      group: 'system',
      type: 'info',
      title: 'Info!',
      text: message
    }
    commit('pushNotification', notification)
    vm.$notify(notification)
  },
  notifyError({commit}, message) {
    const notification = {
      group: 'system',
      type: 'error',
      title: 'Error!',
      text: message
    }
    commit('pushNotification', notification)
    vm.$notify(notification)
  },
  pendingStart({commit}) {
    commit('setPending', true)
    if (vm) vm.$nprogress.start()
  },
  pendingDone({commit}) {
    commit('setPending', false)
    if (vm) vm.$nprogress.done()
  },
  resetUi({commit}) {
    commit('setPending', false)
    commit('clearNotification')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
