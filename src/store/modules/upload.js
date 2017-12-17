import tus from 'tus-js-client'

const uploadEndpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/upload' : '/upload'

const state = {
  queue: [],
  error: null
}

const mutations = {
  addQueue (state, newFile) {
    state.queue.push(newFile)
  },
  removeQueue (state, item) {
    state.queue.splice(state.queue.indexOf(item), 1)
  },
  setProgress (state, progress) {
    state.queue[progress.index].progress = progress.value
  },
  setStatus (state, status) {
    state.queue[status.index].status = status.value
  },
  setError (state, error) {
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
      commit('setError', {index: state.queue.indexOf(queue), value: error})
    }

    function onProgressCallback (bytesUploaded, bytesTotal) {
      commit('setProgress', {index: state.queue.indexOf(queue), value: (bytesUploaded / bytesTotal * 100).toFixed(2)})
    }

    function onSuccessCallback () {
      commit('setStatus', {index: state.queue.indexOf(queue), value: 'completed'})
    }

    commit('addQueue', queue)
  },
  clearEmptyFileQueue ({state, commit}) {
    for (let index = state.queue.length - 1; index >= 0; index--) {
      const queue = state.queue[index]
      if (queue.upload === undefined || queue.upload.file === undefined || queue.upload.file.name === undefined) commit('removeQueue', queue)
    }
  },
  startUpload ({state, commit}) {
    state.queue.forEach(queue => {
      queue.upload.start()
      commit('setStatus', {index: state.queue.indexOf(queue), value: 'started'})
    })
  },
  pauseUpload ({state, commit}) {
    state.queue.forEach(queue => {
      queue.upload.abort()
      commit('setStatus', {index: state.queue.indexOf(queue), value: 'paused'})
    })
  }
}

export default {
  state,
  mutations,
  actions
}
