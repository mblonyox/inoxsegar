<template>
  <div class="card">
    <header class="card-header" @click="expand = !expand">
      <p class="card-header-title">
        {{ file.name }}
      </p>
      <a href="#" class="card-header-icon" aria-label="more options">
        <span class="icon">
          <i class="fa fa-angle-down" aria-hidden="true" v-if="expand"></i>
          <i class="fa fa-angle-up" aria-hidden="true" v-else></i>
        </span>
      </a>
    </header>
    <div class="card-content" v-show="expand">
      <table class="table is-striped is-fullwidth">
        <tbody>
          <tr>
            <td>Nama File</td>
            <td>:</td>
            <td>{{ file.name }}</td>
          </tr>
          <tr>
            <td>Ukuran File</td>
            <td>:</td>
            <td>{{ humanFilesize(file.size) }}</td>
          </tr>
          <tr>
            <td>Pengunggah</td>
            <td>:</td>
            <td>
              <router-link 
                :to="{name: 'PageUser', params: {id: file.uploader._id }}" 
                v-if="file.uploader">
                {{ file.uploader.username }}
              </router-link>
            </td>
          </tr>
          <tr>
            <td>Waktu Unggah</td>
            <td>:</td>
            <td>{{ (new Date(file.date)).toLocaleString('id-ID') }}</td>
          </tr>
          <tr v-if="!hideKoleksi">
            <td>Koleksi</td>
            <td>:</td>
            <td>
              <router-link 
                :to="file.koleksi.tipe + '/' + file.koleksi.data._id"
                v-if="file.koleksi && file.koleksi.data"
                >
                {{file.koleksi.data.title}} ({{file.koleksi.data.year}})
              </router-link>
              <span v-else>Non-koleksi</span>
            </td>
          </tr>
          <tr>
            <td>Suka</td>
            <td>:</td>
            <td>
              {{ file.metadata.likes.length }} <i class="fa fa-thumbs-o-up"></i>
            </td>
          </tr>
          <tr>
            <td>Tidak Suka</td>
            <td>:</td>
            <td>
              {{ file.metadata.dislike.length }} <i class="fa fa-thumbs-o-down"></i>
            </td>
          </tr>
          <tr>
            <td>Diunduh</td>
            <td>:</td>
            <td>
              {{ file.metadata.downloads.length }} <i class="fa fa-download"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <button 
        class="button"
        @click="toggleLike"
        :class="{'is-success': isLiked}"
        v-if="isLiked || !isDisliked"
      >
        <span>
          <i class="fa fa-thumbs-up"></i>
          {{ isLiked ? 'Batal Suka' : 'Suka' }}
        </span>
      </button>
      <button 
        class="button" 
        @click="toggleDislike" 
        :class="{'is-danger': isDisliked}"
        v-if="isDisliked || !isLiked"
      >
        <span>
          <i class="fa fa-thumbs-down"></i>
          {{ isDisliked ? 'Batal Tidak Suka' : 'Tidak Suka' }}
        </span>
      </button>
      <a :href="`/api/download/${file._id}?token=${getToken}`" class="button is-primary">
        <span>
          <i class="fa fa-download"></i>
          Unduh
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import filesize from 'filesize'
import { NoNotify } from '../helpers/api-service'

export default {
  data: () => ({
    expand: false
  }),
  computed: {
    userId () {
      return this.$store.state.auth.user.id
    },
    getToken () {
      return this.$store.state.auth.token
    },
    isLiked () {
      return this.file.metadata.likes.includes(this.userId)
    },
    isDisliked () {
      return this.file.metadata.dislike.includes(this.userId)
    }
  },
  methods: {
    humanFilesize (bytes) {
      return filesize(bytes)
    },
    toggleLike () {
      NoNotify.doRequest({
        url: 'file/' + this.file._id + '/like',
        method: 'POST',
        body: {
          action: 'like',
          cancel: this.isLiked
        }
      })
        .then(state => state.result.body)
        .then(body => {
          if (body.success) this.updateFile(body.data.file)
        })
    },
    toggleDislike () {
      NoNotify.doRequest({
        url: 'file/' + this.file._id + '/like',
        method: 'POST',
        body: {
          action: 'dislike',
          cancel: this.isDisliked
        }
      })
        .then(state => state.result.body)
        .then(body => {
          if (body.success) this.updateFile(body.data.file)
        })
    },
    updateFile (newFile) {
      this.$emit('updateFile', newFile)
    }
  },
  props: ['file', 'hideKoleksi']
}
</script>
