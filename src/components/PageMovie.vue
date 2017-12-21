<template>
  <section id="movies" class="container">
    <h1 class="title">Koleksi Movies</h1>
    <div class="box">
      <div class="columns is-multiline">
        <div class="column is-one-quarter" v-for="movie in movies">
          <div class="card">
            <div class="card-image">
              <figure class="image">
                <img :src="movie.Poster">
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {Search} from '../assets/movies.json'
export default {
  data () {
    return {
      movies: Search
    }
  }
}
</script>

<style>
  #movies {
    margin-top: 3rem;
  }
</style>
