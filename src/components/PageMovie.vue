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
                  <tr :key="detail.valuet">
                    <td>{{ detail.text }}</td>
                    <td>:</td>
                    <td>{{ Array.isArray(movie[detail.value]) ? movie[detail.value].join(', ') : movie[detail.value] }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
            <div class="is-flex" style="align-items: center; justify-content: center;">
              <star-rating
                :star-size="32"
                :max-rating="10"
                :increment="0.1"
                :fixed-points="1"
                :rating="movie.imdbRating"
                :read-only="true"
                :border-width="1"
                :rounded-corners="true"
              />
              <div style="padding-left: 20px;">
                ({{movie.imdbVotes}} votes)
              </div>
            </div>
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
            </tr>
          </thead>
          <tbody>
            <tr v-for="file in movie.files" :key="file._id">
              <td>{{ movie.files.indexOf(file) + 1}}</td>
              <td>
                <card-file-list :file="file" @updateFile="handleUpdateFile" :hideKoleksi="true" :expandDefault="true" />
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
import StarRating from 'vue-star-rating'
import CardFileList from './CardFileList'
import { WithToken, NoNotify } from '../helpers/api-service'
import ModalAddFile from './ModalAddFile'

export default {
  data() {
    return {
      movie: {},
      details: [
        {text: 'Judul', value: 'title'},
        {text: 'Tahun', value: 'year'},
        {text: 'Rilis', value: 'released'},
        {text: 'Durasi', value: 'runtime'},
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
    isAdmin() {
      return this.$store.state.auth.user.admin
    }
  },
  props: ['id'],
  components: {
    ModalAddFile,
    CardFileList,
    StarRating
  },
  methods: {
    fetchData() {
      NoNotify.doRequest({
        url: 'movie/' + this.id
      })
        .then(state => state.result.body)
        .then(body => {
          if (body.success) {
            this.movie = body.data.movie
            window.document.title += ` ${this.movie.title} (${this.movie.year})`
          }
        })
    },
    handleUpdateFile(newFile) {
      let index = this.movie.files.findIndex(files => files._id === newFile._id)
      this.movie.files.splice(index, 1, newFile)
    },
    onModalSubmit(fileId) {
      const data = {
        movieId: this.id,
        fileId
      }
      WithToken.doRequest({
        url: 'movie/add-file',
        method: 'POST',
        body: data
      })
        .then(state => state.result.body)
        .then(body => {
          if (body.success) {
            this.movie.files.push(body.data.file)
          }
        })
    }
  },
  created() {
    this.fetchData()
  }
}
</script>
