<template>
  <section id="upload" class="container">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <div class="box">
          <div class="field">
            <div class="file is-centered is-boxed is-large has-name">
              <label class="file-label">
                <input type="file" class="file-input" name="file-selector" @change="handleFile" id="file-input">
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fa fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Pilih file...
                  </span>
                </span>
                <span class="file-name"></span>
              </label>
            </div>
          </div>
        </div>
        <hr>
        <div class="box">
          <div class="field">
            <a @click="startAll" class="button is-primary is-large" v-if="!startedAll" key="startBtn"><i class="fa fa-play"></i></a>
            <a @click="pauseAll" class="button is-warning is-large" v-else key="pauseBtn"><i class="fa fa-pause"></i></a>
          </div>
        </div>
        <div class="box" v-for="item in queue">
          <p class="is-size-5">{{ item.name }}</p>
          <div class="is-clearfix">
              <progress class="progress is-pulled-left" :class="{'is-info': item.progress < 100, 'is-success': item.progress == 100}" v-if="item.progress" :value="item.progress" max="100">{{ item.progress }}%</progress>
              <a @click="startSingle(item)" v-if="item.status === 'paused'" class="button is-primary"><i class="fa fa-play"></i></a>
              <a @click="pauseSingle(item)" v-if="item.status === 'started'"class="button is-warning"><i class="fa fa-pause"></i></a>
              <a @click="removeSingle(item)" class="button is-danger  is-pulled-right"><i class="fa fa-remove"></i></a>    
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    computed: {
      queue () {
        return this.$store.state.upload.queue
      },
      startedAll () {
        for (let index = 0; index < this.queue.length; index++) {
          if (this.queue[index].status === 'started') return true
        }
        return false
      }
    },
    methods: {
      handleFile (event) {
        const file = event.target.files[0]
        this.$store.dispatch('addUpload', file)
      },
      removeSingle (queue) {
        this.pauseSingle(queue)
        this.$store.commit('removeUploadQueue', queue)
      },
      startSingle (queue) {
        this.$store.dispatch('startUploadSingle', queue)
      },
      pauseSingle (queue) {
        this.$store.dispatch('pauseUploadSingle', queue)
      },
      startAll () {
        this.$store.dispatch('startUploadAll')
      },
      pauseAll () {
        this.$store.dispatch('pauseUploadAll')
      }
    },
    mounted () {
      this.$store.dispatch('clearEmptyFileQueue')
    }
  }
</script>

<style>
  #upload .columns {
    margin: 3rem 0;
  }
</style>
