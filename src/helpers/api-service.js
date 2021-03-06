import { ApiService } from '@apicase/core'
import fetch from '@apicase/adapter-fetch'

import store from '../store'
import vm from '../main'

const baseUrl = '/api'

export const BaseService = new ApiService({adapter: fetch,
  url: baseUrl,
  hooks: {
    before({payload, next}) {
      store.dispatch('pendingStart')
      next(payload)
    }
  }
})
  .on('error', errorLogger)
  .on('fail', failLogger)
  .on('done', doneLogger)
  .on('finish', () => { store.dispatch('pendingDone') })

export const RefreshToken = BaseService.extend({
  url: 'auth/refresh_token',
  method: 'POST',
  hooks: {
    before({payload, meta, next}) {
      const token = store.state.auth.token
      next({...payload, body: { token }})
    }
  }
})
  .off('done', doneLogger)
  .on('done', res => {
    store.commit('setToken', res.body.token)
  })
  .on('fail', res => {
    store.dispatch('signOut')
  })

export const WithToken = BaseService.extend({
  hooks: {
    before({payload, next}) {
      const token = store.state.auth.token
      next({...payload, headers: { 'x-access-token': token }})
    },
    async fail({result, payload, next, done, retry}) {
      if (result.status !== 401) return next(result)
      const { success } = await RefreshToken.doSingleRequest({})
      if (success) {
        retry(payload)
      } else {
        next(result)
      }
    }
  }
})

export const NoNotify = WithToken.extend({}).off('done', doneLogger)

function doneLogger(result) {
  if (result.body.success) store.dispatch('notifySuccess', result.body.message)
  else store.dispatch('notifyWarning', result.body.message)
}

function failLogger(result) {
  store.dispatch('notifyError', result.body.message)
}

function errorLogger(err) {
  vm.$swal('Oops!!', err.message, 'error')
}
