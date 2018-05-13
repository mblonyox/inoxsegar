import vm from '../../main'

const state = {
  notifications: [],
  pending: false
}

const mutations = {
  pushNotification(state, notification) {
    state.notifications.push(notification)
  },
  removeNotification(state, notification) {
    state.notifications.splice(state.notifications.findIndex(notification), 1)
  },
  clearNotification(state) {
    state.notification = []
  },
  setPending(state, isPending) {
    state.pending = !!isPending
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
  mutations,
  actions
}
