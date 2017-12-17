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
                </span>
                <span class="file-name"></span>
              </label>
            </div>
          </div>
        </div>
        <hr>
        <div class="box">
          <div class="field">
            <a @click="startAll" class="button is-primary is-large" v-if="!started" key="startBtn"><i class="fa fa-play"></i></a>
            <a @click="pauseAll" class="button is-danger is-large" v-else key="pauseBtn"><i class="fa fa-pause"></i></a>
          </div>
        </div>
        <div class="box" v-for="item in queue">
          <h1>{{ item.name }}</h1>
          <progress class="progress" :class="{'is-info': item.progress < 100, 'is-success': item.progress == 100}" v-if="item.progress" :value="item.progress" max="100">{{ item.progress }}%</progress>          
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
      started () {
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
      startAll () {
        this.$store.dispatch('startUpload')
      },
      pauseAll () {
        this.$store.dispatch('pauseUpload')
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
