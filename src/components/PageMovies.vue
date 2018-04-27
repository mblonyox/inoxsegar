<template>
  <section id="movies" class="container">
    <h1 class="title">Koleksi Movies
      <router-link class="button is-success" to="/movie/new" v-if="isAdmin">
        <span class="icon">
          <i class="fa fa-plus"></i>
        </span>
        <span>Baru</span>
      </router-link>
    </h1>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input type="text" class="input" placeholder="Cari...">
            </p>
            <p class="control">
              <button class="button">
                Cari
              </button>
            </p>
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="select">
            <select>
              <option value="">Urutkan</option>
              <option value="donwload">Unduhan</option>
              <option value="released">Tgl Rilis</option>
              <option value="added">Tgl Ditambahkan</option>
              <option value="rating">Rating IMDB</option>
              <option value="like">Suka</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="columns is-multiline">
        <div class="column is-one-quarter" v-for="movie in movies">
          <router-link :to="{name: 'PageMovie', params: {id: movie._id}}">
            <div class="card">
              <div class="card-image">
                <figure class="image">
                  <img :src="movie.poster">
                </figure>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <infinite-loading @infinite="infiniteHandler" />
    </div>
  </section>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import { NoNotify } from '../helpers/api-service'

export default {
  data () {
    return {
      movies: [],
      page: 1
    }
  },
  computed: {
    isAdmin () {
      return this.$store.state.auth.user.admin
    }
  },
  methods: {
    getInitialData () {
      NoNotify.doRequest({
        url: 'movie'
      })
        .then(({result}) => result.body)
        .then(body => {
          if (body.success) {
            this.movies = body.data.movies
          }
        })
    },
    infiniteHandler ($state) {
      this.page++
      NoNotify.doRequest({
        url: 'movie',
        query: {
          page: this.page
        }
      })
        .then(({result}) => result.body)
        .then(body => {
          if (body.success) {
            this.movies = this.movies.concat(body.data.movies)
            $state.loaded()
            if (body.data.movies.length < 20) {
              $state.complete()
            }
          }
        })
    }
  },
  mounted () {
    this.getInitialData()
  },
  components: {
    InfiniteLoading
  }
}
</script>

<style>
  #movies {
    margin-top: 3rem;
  }
</style>
