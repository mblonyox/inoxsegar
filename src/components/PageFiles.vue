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
          <tr v-for="file in files" :key="file.id">
            <td>{{ files.indexOf(file) + 1}}</td>
            <td>{{ file.name }}</td>
            <td>{{ humanFilesize(file.size) }}</td>
            <td>{{ file.uploader }}</td>
            <td>{{ (new Date(file.date)).toLocaleString('id-ID') }}</td>
            <td>{{ file.koleksi ? file.kolesi.title : 'Uncategorized'}}</td>
            <td>
              <span class="icon">
                <i class="fa fa-thumbs-o-up"></i>
              </span>
              <span class="icon">
                <i class="fa fa-thumbs-o-down"></i>
              </span>
              <a :href="serverUrl + file.uploaded_path + '/' + file.id + '/' + file.name">
                <span>
                  <i class="fa fa-download"></i>
                </span>
              </a>
              <span class="icon" v-if="$store.state.auth.admin">
                <i class="fa fa-wrench"></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import serverUrl from '../helpers/backend-url'
import filesize from 'filesize'

export default {
  data () {
    return {
      files: []
    }
  },
  methods: {
    humanFilesize (bytes) {
      return filesize(bytes)
    }
  },
  computed: {
    serverUrl () {
      return serverUrl
    }
  },
  mounted () {
    let httpHeaders = new Headers({
      'x-access-token': this.$store.state.auth.token
    })
    fetch(serverUrl + 'api/files', {
      method: 'GET',
      mode: 'cors',
      headers: httpHeaders
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          this.files = json.data.files
        }
      })
  }
}
</script>

<style>
#files {
  margin-top: 3rem;
}
</style>

