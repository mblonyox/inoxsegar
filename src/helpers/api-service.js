import { ApiService } from '@apicase/core'
import fetch from '@apicase/adapter-fetch'

import store from '../store'
import serverUrl from './backend-url'
import vm from '../main'

export const BaseService = new ApiService({adapter: fetch,
  url: serverUrl + 'api'
})
  .on('start', () => { store.dispatch('pendingStart') })
  .on('error', errorLogger)
  .on('fail', failLogger)
  .on('done', doneLogger)
  .on('finish', () => { store.dispatch('pendingDone') })

const RefreshToken = BaseService.extend({
  url: 'refresh_token',
  hooks: {
    before ({payload, meta, next}) {
      const token = store.state.auth.token
      next({...payload, body: { token }})
    }
  }
}).on('done', res => {
  store.commit('setToken', res.body.token)
})

export const WithToken = BaseService.extend({
  hooks: {
    before ({payload, meta, next}) {
      if (!meta.requiresAuth) return next(payload)
      const token = store.state.auth.token
      next({...payload, headers: { 'x-access-token': token }})
    },
    async fail ({meta, result, payload, next, retry}) {
      if (!meta.requiresAuth) return next(result)
      if (result.status !== 401) return next(result)
      const { success } = await RefreshToken.doSingleRequest()
      if (success) {
        retry(payload)
      } else {
        next(result)
      }
    }
  }
})

function doneLogger (result) {
  if (result.body.success) store.dispatch('notifySuccess', result.body.message)
  else store.dispatch('notifyWarning', result.body.message)
}

function failLogger (result) {
  store.dispatch('notifyError', result.body.message)
}

function errorLogger (err) {
  vm.$swal('Oops!!', err.message, 'error')
}
