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
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import serverUrl from '../helpers/backend-url'

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
      ]
    }
  },
  props: ['id'],
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
