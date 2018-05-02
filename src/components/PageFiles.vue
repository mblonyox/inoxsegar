<template>
  <section id="files" class="container">
    <h1 class="title">File yang diunggah.</h1>
    <h2 class="subtitle">Menampilkan file-file yang diunggah oleh semua pengguna. File yang telah dimasukkan dalam koleksi juga dapat diakses dari laman koleksi tersebut.</h2>
    <hr>
    <div class="box">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>Nama File</th>
            <th>Ukuran</th>
            <th>Uploader</th>
            <th>Tanggal</th>
            <th>Koleksi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="file in files" :key="file._id">
            <td>{{ files.indexOf(file) + 1}}</td>
            <td>{{ file.name }}</td>
            <td>{{ humanFilesize(file.size) }}</td>
            <td> <router-link :to="{name: 'PageUser', params: {id: file.uploader._id }}" v-if="file.uploader">{{ file.uploader.username }}</router-link> </td>
            <td>{{ (new Date(file.date)).toLocaleString('id-ID') }}</td>
            <td><router-link :to="file.koleksi.tipe + '/' + file.koleksi.data._id" v-if="file.koleksi && file.koleksi.data">{{file.koleksi.data.title}} ({{file.koleksi.data.year}})</router-link><span v-else>Non-koleksi</span></td>
            <td>
              <span class="icon">
                <i class="fa fa-thumbs-o-up"></i>
              </span>
              <span class="icon">
                <i class="fa fa-thumbs-o-down"></i>
              </span>
              <a :href="`/api/download/${file._id}?token=${getToken}`">
                <span>
                  <i class="fa fa-download"></i>
                </span>
              </a>
              <span class="icon" v-if="isAdmin">
                <i class="fa fa-wrench"></i>
              </span>
            </td>
          </tr>
          <tr>
            <td colspan="7">
              <infinite-loading @infinite="infiniteHandler" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import { NoNotify } from '../helpers/api-service'
import filesize from 'filesize'

export default {
  data () {
    return {
      files: [],
      page: 0
    }
  },
  methods: {
    humanFilesize (bytes) {
      return filesize(bytes)
    },
    infiniteHandler ($state) {
      this.page++
      NoNotify.doRequest({
        url: 'file',
        query: {
          page: this.page
        }
      })
        .then(status => status.result.body)
        .then(body => {
          if (body.success) {
            this.files = this.files.concat(body.data.files)
            $state.loaded()
            if (body.data.files.length < 20) {
              $state.complete()
            }
          }
        })
    }
  },
  computed: {
    isAdmin () {
      return this.$store.state.auth.admin
    },
    getToken () {
      return this.$store.state.auth.token
    }
  },
  components: {
    InfiniteLoading
  }
}
</script>

<style>
#files {
  margin-top: 3rem;
}
</style>

