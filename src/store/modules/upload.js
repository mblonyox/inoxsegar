import tus from 'tus-js-client'
import serverUrl from '../../helpers/backend-url'

const uploadEndpoint = serverUrl + 'upload'

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
  addUpload ({state, commit}, file) {
    const name = file.name
    const upload = new tus.Upload(file, {
      endpoint: uploadEndpoint,
      retryDelays: [0, 1000, 5000],
      metadata: {
        filename: file.name,
        size: file.size,
        type: file.type,
        modified: file.lastModified
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
      commit('setQueueError', {index: state.queue.indexOf(queue), value: error})
    }

    function onProgressCallback (bytesUploaded, bytesTotal) {
      commit('setQueueProgress', {index: state.queue.indexOf(queue), value: (bytesUploaded / bytesTotal * 100).toFixed(2)})
    }

    function onSuccessCallback () {
      commit('setQueueStatus', {index: state.queue.indexOf(queue), value: 'completed'})
    }

    commit('addUploadQueue', queue)
  },
  clearEmptyFileQueue ({state, commit}) {
    for (let index = state.queue.length - 1; index >= 0; index--) {
      const queue = state.queue[index]
      if (queue.upload === undefined || queue.upload.file === undefined || queue.upload.file.name === undefined) commit('removeUploadQueue', queue)
    }
  },
  startUpload ({state, commit}) {
    state.queue.forEach(queue => {
      queue.upload.start()
      commit('setQueueStatus', {index: state.queue.indexOf(queue), value: 'started'})
    })
  },
  pauseUpload ({state, commit}) {
    state.queue.forEach(queue => {
      queue.upload.abort()
      commit('setQueueStatus', {index: state.queue.indexOf(queue), value: 'paused'})
    })
  }
}

export default {
  state,
  mutations,
  actions
}
