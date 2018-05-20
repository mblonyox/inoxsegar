<template>
  <div class="columns">
    <div class="column is-2">
      <h2 class="subtitle">Seasons</h2>
      <div class="aside">
        <button
          class="button is-fullwidth item"
          :class="{'is-active': index === seasonSelected}"
          v-for="(season, index) in seasons"
          @click="seasonSelected = index; episodeSelected = 0"
        >
          {{season.name}}
        </button>
        <button 
          class="button is-fullwidth item"
          @click="addNewSeason"
          v-if="isAdmin"
        >+</button>
      </div>
    </div>
    <div class="column is-3">
      <h2 class="subtitle">Episodes</h2>
      <div class="aside">
        <button 
          class="button is-fullwidth item"
          :class="{'is-active': index === episodeSelected}"
          v-for="(episode, index) in seasonActive.episodes"
          @click="episodeSelected = index"
        >
          {{episode.name}}
        </button>
        <button class="button is-fullwidth item" v-if="isAdmin">+</button>
      </div>
    </div>
    <div class="column is-7">
      <h2 class="subtitle">Details</h2>
      <div class="box">
        <p>{{seasonActive.name}}</p>
        <p>{{episodeActive.name}}</p>
        <p>Tanggal tayang : {{episodeActive.aired}}</p>
        <p>{{episodeActive.overview}}</p>
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th>Nama File</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(file, index) in episodeActive.files" :key="file._id">
              <td>{{ index }}</td>
              <td>
                <card-file-list :file="file" :hideKoleksi="true" :expandDefault="true" />
              </td>
            </tr>
          </tbody>
        </table>
        <button class="button is-fullwidth item" v-if="isAdmin">+</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { NoNotify } from '../helpers/api-service'
  import CardFileList from './CardFileList'

  export default {
    data: () => ({
      seasonSelected: 0,
      episodeSelected: 0
    }),
    computed: {
      isAdmin() {
        return this.$store.state.auth.user.admin
      },
      seasonActive() {
        return this.seasons ? this.seasons[this.seasonSelected] : {}
      },
      episodeActive() {
        return this.seasonActive.episodes ? this.seasonActive.episodes[this.episodeSelected] : {}
      }
    },
    components: {
      CardFileList
    },
    props: ['seasons', 'seriesId'],
    methods: {
      addNewSeason() {
        this.$swal({
          title: 'Tambah Season Baru!',
          html: `
            <div>
              <div class='field is-horizontal'>
                <div class='field-label'>
                  <label class='label'>Nomor</label>
                </div>
                <div class='field-body'>
                  <div class='field'>
                    <input class='input' type='text' id='add-season-number' value='${this.seasons.length + 1}'>
                  </div>
                </div>
              </div>
              <div class='field is-horizontal'>
                <div class='field-label'>
                  <label class='label'>Nama</label>
                </div>
                <div class='field-body'>
                  <div class='field'>
                    <input class='input' type='text' id='add-season-name' value='Season  ${this.seasons.length + 1}'>
                  </div>
                </div>
              </div>
              <div class='field is-horizontal'>
                <div class='field-label'>
                  <label class='label'>Eps</label>
                </div>
                <div class='field-body'>
                  <div class='field'>
                    <input class='input' type='text' id='add-season-episodes' value='12'>
                  </div>
                </div>
              </div>
            </div>
          `,
          preConfirm: () => ({
            number: document.getElementById('add-season-number').value,
            name: document.getElementById('add-season-name').value,
            episodes: document.getElementById('add-season-episodes').value
          })
        })
          .then(form => {
            if (!form.value) return
            this.$swal({
              title: 'Memproses!',
              text: 'Tunggu proses...',
              onOpen: () => {
                this.$swal.showLoading()
                NoNotify.doRequest({
                  url: 'series/' + this.seriesId + '/seasons',
                  method: 'POST',
                  body: form.value
                })
                  .then(state => state.result.body)
                  .then(body => {
                    if (body.success) {
                      this.updateSeries(body.data.series)
                    }
                    this.$swal.close()
                  })
              }
            })
          })
      },
      updateSeries(series) {
        this.$emit('update', series)
      }
    }
  }
</script>

<style scoped>
.aside .item {
  margin: 10px;
}
.is-active {
  background-color: #b6b6b6;
}
</style>