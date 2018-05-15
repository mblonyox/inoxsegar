<template>
  <section id="new-series" class="container">
    <h1 class="title">Tambah Series</h1>
    <form @submit.prevent="onSubmit">
      <div class="box">
        <div class="columns">
          <div class="column is-9">
            <div class="field is-horizontal">
              <div class="field-label">
                <label for="category" class="label"> Kategori</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="select">
                    <select v-model="category">
                      <option 
                        v-for="cat in categories" 
                        :key="'option-'+cat.slug"
                        :value="cat.slug"
                      >
                        {{cat.name}}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label">
                    <label for="status" class="label">Status</label>
                  </div>
                  <div class="field-body">
                    <div class="field is-expanded">
                      <div class="select">
                        <select v-model="status">
                          <option 
                            v-for="status in statuses" 
                            :key="'option-'+status.slug"
                            :value="status.slug"
                          >
                            {{status.name}}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr>
            <div class="field is-horizontal">
              <div class="field-label">
                <label for="imdb-id" class="label">IMDB</label>
              </div>
              <div class="field-body">
                <div class="field is-narrow">
                  <input type="text" class="input" v-model="imdb" @change="onImdbIdChange">
                </div>
                <div class="field is-horizontal">
                  <div class="field-label">
                    <label for="tvdb-id" class="label">TVDB</label>
                  </div>
                  <div class="field-body">
                    <div class="field is-narrow">
                      <input type="text" class="input" v-model="tvdb">
                    </div>
                    <div class="field is-horizontal">
                      <div class="field-label">
                        <label for="mal-id" class="label">MAL</label>
                      </div>
                      <div class="field-body">
                        <div class="field is-narrow">
                          <input type="text" class="input" v-model="mal">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label for="title" class="label">Judul</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <input type="text" class="input" v-model="title">
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label for="year" class="label">Tahun</label>
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
                <label for="genre" class="label">Genre</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <input type="text" class="input" v-model="genre">
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label for="country" class="label">Negara</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <input type="text" class="input" v-model="country">
                </div>
                <div class="field is-horizontal">
                  <div class="field-label">
                    <label for="language" class="label">Bahasa</label>
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
                <label for="director" class="label">Sutradara</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <input type="text" class="input" v-model="director">
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label for="writer" class="label">Penulis</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <input type="text" class="input" v-model="writer">
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label for="synopsis" class="label">Sinopsis</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <textarea class="textarea" v-model="plot"></textarea>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label for="cast" class="label">Pemeran</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <input type="text" class="input" v-model="cast">
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label for="poster" class="label">Poster</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <input type="text" class="input" v-model="poster">
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label for="rating" class="label">Rating</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <input type="text" class="input" v-model="rating">
                </div>
                <div class="field is-horizontal">
                  <div class="field-label">
                    <label for="votes" class="label">Votes</label>
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
      category: null,
      status: null,
      imdb: null,
      tvdb: null,
      mal: null,
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
    categories() {
      return this.$store.state.metadata.categories
    },
    statuses() {
      return this.$store.state.metadata.statuses
    },
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
        category: this.category,
        status: this.status,
        imdb: this.imdb,
        tvdb: this.tvdb,
        mal: this.mal,
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
        votes: this.votes.replace(/,/g, '')
      }
      WithToken.doRequest({
        url: 'series',
        method: 'POST',
        body: data
      })
        .then(state => state.result.body)
        .then(body => {
          if (body.success) {
            this.$router.push('/series')
          }
        })
    }
  }
}
</script>

<style>
#new-series {
  margin-top: 3rem;
}
</style>