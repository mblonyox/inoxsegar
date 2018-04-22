import tus from 'tus-js-client'
import serverUrl from '../../helpers/backend-url'
import { RefreshToken } from '../../helpers/api-service'

const uploadEndpoint = serverUrl + 'api/upload'

const state = {
  queue: [],
  error: null
}

const mutations = {
  addUploadQueue (state, newFile) {
    state.queue.push(newFile)
  },
  removeUploadQueue (state, item) {
    state.queue.splice(state.queue.indexOf(item), 1)
  },
  setQueueProgress (state, progress) {
    state.queue[progress.index].progress = progress.value
  },
  setQueueStatus (state, status) {
    state.queue[status.index].status = status.value
  },
  setQueueError (state, error) {
    state.queue[error.index].error = error.value
  }
}

const actions = {
  addUpload ({state, commit, rootState, dispatch}, file) {
    const name = file.name
    const upload = new tus.Upload(file, {
      endpoint: uploadEndpoint,
      retryDelays: [0, 1000, 5000],
      headers: {
        'x-access-token': rootState.auth.token
      },
      metadata: {
        filename: file.name,
        size: file.size,
        type: file.type,
        modified: file.lastModified,
        uploader: rootState.auth.user.id
      },
      onError: onErrorCallback,
      onProgress: onProgressCallback,
      onSuccess: onSuccessCallback
    })

    const queue = {
      name,
      upload,
      status: 'paused',
      progress: 0,
      error: null
    }

    function onErrorCallback (error) {
      const index = state.queue.indexOf(queue)
      commit('setQueueStatus', {index, value: 'paused'})
      commit('setQueueError', {index, value: error})
      if (error.message.includes('jwt expired')) {
        RefreshToken.doSingleRequest({})
          .then(({success}) => {
            if (success) {
              dispatch('startUploadSingle', queue)
            }
          })
      } else {
        dispatch('notifyError', 'Kesalahan unggah pada file: "' + name + '".')
      }
    }

    function onProgressCallback (bytesUploaded, bytesTotal) {
      commit('setQueueProgress', {index: state.queue.indexOf(queue), value: (bytesUploaded / bytesTotal * 100).toFixed(2)})
    }

    function onSuccessCallback () {
      commit('setQueueStatus', {index: state.queue.indexOf(queue), value: 'completed'})
      dispatch('notifySuccess', 'Unggah berhasil atas file: "' + name + '".')
    }

    commit('addUploadQueue', queue)
  },
  clearEmptyFileQueue ({state, commit}) {
    for (let index = state.queue.length - 1; index >= 0; index--) {
      const queue = state.queue[index]
      if (queue.upload === undefined || queue.upload.file === undefined || queue.upload.file.name === undefined) commit('removeUploadQueue', queue)
    }
  },
  startUploadSingle ({state, commit, rootState}, queue) {
    if (queue && queue.status === 'paused') {
      queue.upload.options.headers['x-access-token'] = rootState.auth.token
      queue.upload.start()
      commit('setQueueStatus', {index: state.queue.indexOf(queue), value: 'started'})
    }
  },
  pauseUploadSingle ({state, commit, rootState}, queue) {
    if (queue && queue.status === 'started') {
      queue.upload.abort()
      commit('setQueueStatus', {index: state.queue.indexOf(queue), value: 'paused'})
    }
  },
  startUploadAll ({state, dispatch}) {
    state.queue.forEach(queue => {
      dispatch('startUploadSingle', queue)
    })
  },
  pauseUploadAll ({state, dispatch}) {
    state.queue.forEach(queue => {
      dispatch('pauseUploadSingle', queue)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
