<template>
  <section class="container" style="margin-top: 3em">
    <div class="tile is-vertical is-ancestor">
      <div class="tile box">
        <div class="tile is-8 is-vertical is-parent">
          <div class="tile is-child">
            <h1 class="title">{{ series.title }} ({{ series.year }})</h1>
            <table class="table is-striped">
              <tbody>
                <template v-for="detail in details">
                  <tr :key="detail.valuet">
                    <td>{{ detail.text }}</td>
                    <td>:</td>
                    <td>{{ Array.isArray(series[detail.value]) ? series[detail.value].join(', ') : series[detail.value] }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
            <div class="is-flex" style="align-items: center; justify-content: center;">
              <star-rating :star-size="32" :max-rating="10" :increment="0.1" :fixed-points="1" :rating="series.imdbRating" :read-only="true"
                :border-width="1" :rounded-corners="true" />
              <div style="padding-left: 20px;">
                ({{series.imdbVotes}} votes)
              </div>
            </div>
          </div>
        </div>
        <div class="tile is-4">
          <div class="tile is-child box">
            <figure class="image">
              <img :src="series.poster" alt="">
            </figure>
          </div>
        </div>
      </div>
      <div class="tile box">
        <div class="tile is-child">
          <season-navigation :series.sync="series"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import StarRating from 'vue-star-rating'
  import { NoNotify } from '../helpers/api-service'
  import CardFileList from './CardFileList'
  import SeasonNavigation from './SeasonNavigation'

  export default {
    data: () => ({
      series: {},
      details: [
        { text: 'Judul', value: 'title' },
        { text: 'Tahun', value: 'year' },
        { text: 'Rilis', value: 'released' },
        { text: 'Durasi', value: 'runtime' },
        { text: 'Genre', value: 'genre' },
        { text: 'Negara', value: 'country' },
        { text: 'Bahasa', value: 'language' },
        { text: 'Sutradara', value: 'director' },
        { text: 'Penulis', value: 'writer' },
        { text: 'Synopsis', value: 'plot' },
        { text: 'Pemeran', value: 'cast' }
      ]
    }),
    props: ['id'],
    components: {
      CardFileList,
      SeasonNavigation,
      StarRating
    },
    mounted() {
      NoNotify.doRequest({
        url: 'series/' + this.id
      })
        .then(state => state.result.body)
        .then(body => {
          if (body.success) {
            this.series = body.data.series
          }
        })
    }
  }
</script>