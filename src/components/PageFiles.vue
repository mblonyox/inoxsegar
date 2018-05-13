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
          </tr>
        </thead>
        <tbody>
          <tr v-for="file in files" :key="file._id">
            <td>{{ files.indexOf(file) + 1}}</td>
            <td>
              <card-file-list :file="file" @updateFile="handleUpdateFile" />
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
import CardFileList from './CardFileList'
import InfiniteLoading from 'vue-infinite-loading'
import { NoNotify } from '../helpers/api-service'

export default {
  data() {
    return {
      files: [],
      page: 0
    }
  },
  methods: {
    handleUpdateFile(newFile) {
      let index = this.files.findIndex(files => files._id === newFile._id)
      this.files.splice(index, 1, newFile)
    },
    infiniteHandler($state) {
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
  components: {
    InfiniteLoading,
    CardFileList
  }
}
</script>

<style>
#files {
  margin-top: 3rem;
}
</style>

