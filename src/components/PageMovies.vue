<template>
  <section id="movies" class="container">
    <h1 class="title">Koleksi Movies
      <router-link class="button is-success" to="/movie/new">
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
