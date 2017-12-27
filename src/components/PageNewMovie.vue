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
                <input type="text" class="input">
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label for="movie-title" class="label">Judul</label>
            </div>
            <div class="field-body">
              <div class="field">
                <input type="text" class="input">
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label for="movie-year" class="label">Tahun</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <input type="text" class="input">
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label for="movie-genre" class="label">Genre</label>
            </div>
            <div class="field-body">
              <div class="field">
                <input type="text" class="input">
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label for="movie-country" class="label">Negara</label>
            </div>
            <div class="field-body">
              <div class="field">
                <input type="text" class="input">
              </div>
              <div class="field is-horizontal">
                <div class="field-label">
                  <label for="movie-language" class="label">Bahasa</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <input type="text" class="input">
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
                <input type="text" class="input">
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label for="movie-writer" class="label">Penulis</label>
            </div>
            <div class="field-body">
              <div class="field">
                <input type="text" class="input">
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label for="movie-synopsis" class="label">Sinopsis</label>
            </div>
            <div class="field-body">
              <div class="field">
                <textarea class="textarea"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-3">
          <figure class="image">
            <img src="../assets/no-poster.jpg">
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      imdb: null,
      title: null
    }
  }
}
</script>

<style>
#new-movie {
  margin-top: 3rem;
}
</style>