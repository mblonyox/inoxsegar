<template>
  <section id="new-movie" class="container">
    <h1 class="title">Tambah Movie</h1>
    <form @submit.prevent="onSubmit">
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
                <div class="field">
                  <input type="text" class="input" v-model="year">
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label">
                <label for="released" class="label">Tanggal Rilis</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <input type="text" class="input" v-model="released">
                </div>
              </div>
            </div>
          
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label for="runtime" class="label">Durasi Tayang</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <input type="text" class="input" v-model="runtime">
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

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label for="movie-rating" class="label">Rating</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <input type="text" class="input" v-model="rating">
                </div>
                <div class="field is-horizontal">
                  <div class="field-label">
                    <label for="movie-votes" class="label">Votes</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <input type="text" class="input" v-model="votes">
                    </div>
                  </div>
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
        <div class="field is-grouped is-grouped-centered">
          <div class="control">
            <button type class="button is-link">Submit</button>
          </div>
          <div class="control">
            <button class="button is-text">Cancel</button>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
  import { WithToken } from '../helpers/api-service'
  import noPoster from '../assets/no-poster.jpg'
  import apiKey from '../assets/omdb-api-key'

  export default {
    data() {
      return {
        imdb: null,
        title: null,
        year: null,
        released: null,
        runtime: null,
        genre: null,
        country: null,
        language: null,
        director: null,
        writer: null,
        plot: null,
        cast: null,
        poster: null,
        rating: null,
        votes: null
      }
    },
    computed: {
      shownPoster() {
        return this.poster || noPoster
      }
    },
    methods: {
      getMovieInfo(id) {
        fetch('https://www.omdbapi.com/?apikey=' + apiKey + '&i=' + id)
          .then(res => res.json())
          .then(data => {
            this.title = data.Title
            this.year = data.Year
            this.released = data.Released
            this.runtime = data.Runtime
            this.genre = data.Genre
            this.country = data.Country
            this.language = data.Language
            this.director = data.Director
            this.writer = data.Writer
            this.plot = data.Plot
            this.cast = data.Actors
            this.poster = data.Poster
            this.rating = data.imdbRating
            this.votes = data.imdbVotes
          })
      },
      onImdbIdChange(e) {
        let foundId = e.target.value.match(/tt\d+/)
        if (foundId !== null) {
          this.imdb = foundId[0]
          this.getMovieInfo(foundId[0])
        }
      },
      onSubmit() {
        const data = {
          imdb: this.imdb,
          title: this.title,
          year: this.year,
          released: this.released,
          runtime: this.runtime,
          genre: this.genre,
          country: this.country,
          language: this.language,
          director: this.director,
          writer: this.writer,
          plot: this.plot,
          cast: this.cast,
          poster: this.poster,
          rating: this.rating,
          votes: this.votes
        }
        WithToken.doRequest({
          url: 'movie',
          method: 'POST',
          body: data
        })
          .then(state => state.result.body)
          .then(body => {
            if (body.success) {
              this.$router.push('/movie')
            }
          })
      }
    }
  }
</script>

<style>
  #new-movie {
    margin-top: 3rem;
  }
</style>