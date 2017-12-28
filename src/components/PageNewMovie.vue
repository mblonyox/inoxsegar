<template>
  <section id="new-movie" class="container">
    <h1 class="title">Tambah Movie</h1>
    <div class="box">
      <div class="columns">
        <div class="column is-9">
          <div class="field is-horizontal">
            <div class="field-label">
              <label for="imdb-id" class="label">IMDB</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <input type="text" class="input" v-model="imdb" @change="onImdbIdChange">
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label for="movie-title" class="label">Judul</label>
            </div>
            <div class="field-body">
              <div class="field">
                <input type="text" class="input" v-model="title">
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label for="movie-year" class="label">Tahun</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <input type="text" class="input" v-model="year">
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label for="movie-genre" class="label">Genre</label>
            </div>
            <div class="field-body">
              <div class="field">
                <input type="text" class="input" v-model="genre">
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label for="movie-country" class="label">Negara</label>
            </div>
            <div class="field-body">
              <div class="field">
                <input type="text" class="input" v-model="country">
              </div>
              <div class="field is-horizontal">
                <div class="field-label">
                  <label for="movie-language" class="label">Bahasa</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <input type="text" class="input" v-model="language">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label for="movie-director" class="label">Sutradara</label>
            </div>
            <div class="field-body">
              <div class="field">
                <input type="text" class="input" v-model="director">
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label for="movie-writer" class="label">Penulis</label>
            </div>
            <div class="field-body">
              <div class="field">
                <input type="text" class="input" v-model="writer">
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label for="movie-synopsis" class="label">Sinopsis</label>
            </div>
            <div class="field-body">
              <div class="field">
                <textarea class="textarea" v-model="plot"></textarea>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label for="movie-cast" class="label">Pemeran</label>
            </div>
            <div class="field-body">
              <div class="field">
                <input type="text" class="input" v-model="cast">
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label for="movie-poster" class="label">Poster</label>
            </div>
            <div class="field-body">
              <div class="field">
                <input type="text" class="input" v-model="poster">
              </div>
            </div>
          </div>
        </div>
        <div class="column is-3">
          <figure class="image">
            <img :src="shownPoster">
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import noPoster from '../assets/no-poster.jpg'
import apiKey from '../assets/omdb-api-key'

export default {
  data () {
    return {
      imdb: null,
      title: null,
      year: null,
      genre: null,
      country: null,
      language: null,
      director: null,
      writer: null,
      plot: null,
      cast: null,
      poster: null
    }
  },
  computed: {
    shownPoster () {
      return this.poster || noPoster
    }
  },
  methods: {
    getMovieInfo (id) {
      fetch('http://www.omdbapi.com/?apikey=' + apiKey + '&i=' + id)
        .then(res => res.json())
        .then(data => {
          this.title = data.Title
          this.year = data.Year
          this.genre = data.Genre
          this.country = data.Country
          this.language = data.Language
          this.director = data.Director
          this.writer = data.Writer
          this.plot = data.Plot
          this.cast = data.Actors
          this.poster = data.Poster
        })
    },
    onImdbIdChange (e) {
      let foundId = e.target.value.match(/tt\d+/)
      if (foundId !== null) {
        this.imdb = foundId[0]
        this.getMovieInfo(foundId[0])
      }
    }
  }
}
</script>

<style>
#new-movie {
  margin-top: 3rem;
}
</style>