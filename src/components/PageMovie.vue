<template>
  <section class="container" style="margin-top: 3em">
    <div class="tile is-vertical is-ancestor">
      <div class="tile box">
        <div class="tile is-8 is-vertical is-parent">
          <div class="tile is-child">
            <h1 class="title">{{ movie.title }} ({{ movie.year }})</h1>
            <table class="table is-striped">
              <tbody>
                <template v-for="detail in details">
                  <tr>
                    <td>{{ detail.text }}</td>
                    <td>:</td>
                    <td>{{ Array.isArray(movie[detail.value]) ? movie[detail.value].join(', ') : movie[detail.value] }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
        <div class="tile is-4">
          <div class="tile is-child box">
            <figure class="image">
                <img :src="movie.poster" alt="">
            </figure>
          </div>
        </div>
      </div>
      <div class="tile box">
        <div class="tile is-child">
          <h2 class="subtitle">Files</h2>
          <button class="button is-success" @click="modal = true" v-if="isAdmin">Tambah</button>
          <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th>Nama File</th>
              <th>Ukuran</th>
              <th>Uploader</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="file in movie.files" :key="file.id">
              <td>{{ movie.files.indexOf(file) + 1}}</td>
              <td>{{ file.name }}</td>
              <td>{{ humanFilesize(file.size) }}</td>
              <td>
                <router-link :to="{name: 'PageUser', params: {id: file.uploader._id }}">{{ file.uploader.username }}</router-link>
              </td>
              <td>{{ (new Date(file.date)).toLocaleString('id-ID') }}</td>
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
      </div>
    </div>
    <modal-add-file :active.sync="modal" @submit="onModalSubmit" v-if="isAdmin" />
  </section>
</template>

<script>
import filesize from 'filesize'
import serverUrl from '../helpers/backend-url'
import ModalAddFile from './ModalAddFile'

export default {
  data () {
    return {
      movie: {},
      details: [
        {text: 'Judul', value: 'title'},
        {text: 'Tahun', value: 'year'},
        {text: 'Genre', value: 'genre'},
        {text: 'Negara', value: 'country'},
        {text: 'Bahasa', value: 'language'},
        {text: 'Sutradara', value: 'director'},
        {text: 'Penulis', value: 'writer'},
        {text: 'Synopsis', value: 'plot'},
        {text: 'Pemeran', value: 'cast'}
      ],
      modal: false
    }
  },
  computed: {
    isAdmin () {
      return this.$store.state.auth.user.admin
    },
    serverUrl () {
      return serverUrl
    }
  },
  props: ['id'],
  components: {ModalAddFile},
  methods: {
    humanFilesize (bytes) {
      return filesize(bytes)
    },
    onModalSubmit (fileId) {
      const data = {
        movieId: this.id,
        fileId
      }
      fetch(serverUrl + 'api/movie/add-file', {
        method: 'POST',
        mode: 'cors',
        headers: new Headers({
          'x-access-token': this.$store.state.auth.token
        }),
        body: new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'})
      })
        .then(response => response.json())
        .then(json => {
          if (json.success) {
            console.log(json.message)
          }
        })
    }
  },
  mounted () {
    fetch(serverUrl + 'api/movie/' + this.id, {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
        'x-access-token': this.$store.state.auth.token
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          this.movie = json.data.movie
        }
      })
  }
}
</script>
