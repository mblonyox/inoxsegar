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
              <input type="text" class="input" v-model="searchInput" @keyup.enter="goSearch" placeholder="Cari...">
            </p>
            <p class="control">
              <button class="button" @click="goSearch">
                Cari
              </button>
            </p>
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <subscribe-button topic="movie" />
        </div>
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
        <div class="column is-one-quarter" v-for="movie in movies" :key="movie._id">
          <router-link :to="{name: 'PageMovie', params: {id: movie._id}}">
            <div class="card">
              <div class="card-image">
                <figure class="image">
                  <v-lazy-image 
                    :src="movie.poster"
                    :src-placeholder="noPoster"
                  />
                </figure>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading"/>
    </div>
  </section>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import { NoNotify } from '../helpers/api-service'
import noPoster from '../assets/no-poster.jpg'
import VLazyImage from 'v-lazy-image'
import SubscribeButton from './SubscribeButton'

export default {
  data() {
    return {
      movies: [],
      searchInput: '',
      page: 0
    }
  },
  computed: {
    isAdmin() {
      return this.$store.state.auth.user.admin
    },
    noPoster() {
      return noPoster
    }
  },
  methods: {
    infiniteHandler($state) {
      this.page++
      NoNotify.doRequest({
        url: 'movie',
        query: {
          search: this.$route.query.search || '',
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
    },
    goSearch() {
      this.$router.push({name: 'PageMovies', query: {search: this.searchInput}})
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.movies = []
    this.page = 0
    this.$nextTick(() => {
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      next()
    })
  },
  components: {
    InfiniteLoading,
    VLazyImage,
    SubscribeButton
  }
}
</script>

<style>
  #movies {
    margin-top: 3rem;
  }

  .v-lazy-image {
    filter: blur(5px);
    transition: filter 0.5s;
    transition-timing-function: cubic-bezier(0.95, 0.05, 0.795, 0.035);
  }
  .v-lazy-image-loaded {
    filter: blur(0px);
  }
</style>
