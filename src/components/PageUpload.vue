<template>
  <section id="upload" class="container">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <div class="box">
          <div class="field">
            <div class="file is-centered is-boxed is-large has-name">
              <label class="file-label">
                <input type="file" class="file-input" name="file-selector" @change="uploadFile" id="file-input">
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fa fa-upload"></i>
                  </span>
                </span>
                <span class="file-name">{{ filename }}</span>
              </label>
            </div>
          </div>
        </div>
        <progress class="progress is-info" v-if="progress" :value="progress" max="100">{{ progress }}%</progress>
      </div>
    </div>
  </section>
</template>

<script>
  import tus from 'tus-js-client'

  export default {
    data () {
      return {
        filename: null,
        progress: 0
      }
    },
    methods: {
      uploadFile (event) {
        let file = event.target.files[0]

        this.filename = file.name

        const upload = new tus.Upload(file, {
          endpoint: 'http://localhost:3000/upload',
          retryDelays: [0, 1000, 5000],
          metadata: {
            filename: file.name,
            size: file.size,
            type: file.type,
            modified: file.lastModified
          },
          onError: (error) => {
            console.log('Failed because: ' + error)
          },
          onProgress: (bytesUploaded, bytesTotal) => {
            let percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
            this.progress = percentage
          },
          onSuccess: () => {
            console.log('Download %s from %s', upload.file.name, upload.url)
          }
        })

        upload.start()
      }
    }
  }
</script>

<style>
  #upload .columns {
    margin: 3rem 0;
  }
</style>
