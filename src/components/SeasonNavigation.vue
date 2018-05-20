<template>
  <div class="columns">
    <div class="column is-2">
      <h2 class="subtitle">Seasons</h2>
      <div class="aside">
        <button
          class="button is-fullwidth item"
          :class="{'is-active': index === seasonSelected}"
          v-for="(season, index) in series.seasons"
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
              <td>{{ index + 1 }}</td>
              <td>
                <card-file-list 
                  :file="file" 
                  :hideKoleksi="true" 
                  :expandDefault="true"
                  @updateFile="handleUpdateFile(index, $event)"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          class="button is-fullwidth item"
          v-if="isAdmin"
          @click="modal = true"
        >+</button>
      </div>
    </div>
    <modal-add-file :active.sync="modal" @submit="onAddFileSubmit" v-if="isAdmin" />
  </div>
</template>

<script>
  import { NoNotify, WithToken } from '../helpers/api-service'
  import CardFileList from './CardFileList'
  import ModalAddFile from './ModalAddFile'

  export default {
    data: () => ({
      modal: false,
      seasonSelected: 0,
      episodeSelected: 0
    }),
    computed: {
      isAdmin() {
        return this.$store.state.auth.user.admin
      },
      seasonActive() {
        return this.series.seasons ? this.series.seasons[this.seasonSelected] : {}
      },
      episodeActive() {
        return this.seasonActive.episodes ? this.seasonActive.episodes[this.episodeSelected] : {}
      }
    },
    components: {
      CardFileList,
      ModalAddFile
    },
    props: ['series'],
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
                    <input class='input' type='text' id='add-season-number' value='${this.series.seasons.length + 1}'>
                  </div>
                </div>
              </div>
              <div class='field is-horizontal'>
                <div class='field-label'>
                  <label class='label'>Nama</label>
                </div>
                <div class='field-body'>
                  <div class='field'>
                    <input class='input' type='text' id='add-season-name' value='Season  ${this.series.seasons.length + 1}'>
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
                  url: 'series/' + this.series._id + '/seasons',
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
      onAddFileSubmit(fileId) {
        const seriesId = this.series._id
        const seasonId = this.seasonActive._id
        const episodeId = this.episodeActive._id

        WithToken.doRequest({
          url: 'series/:seriesId/seasons/:seasonId/episodes/:episodeId',
          method: 'POST',
          params: {
            seriesId,
            seasonId,
            episodeId
          },
          body: {fileId}
        })
          .then(state => state.result.body)
          .then(body => {
            if (body.success) {
              const updatedSeries = {...this.series}
              updatedSeries
                .seasons[this.seasonSelected]
                .episodes[this.episodeSelected]
                .files
                .push(body.data.file)
              this.updateSeries(updatedSeries)
            }
          })
      },
      handleUpdateFile(index, newFile) {
        const updatedSeries = {...this.series}
        updatedSeries
          .seasons[this.seasonSelected]
          .episodes[this.episodeSelected]
          .files[index] = newFile
        this.updateSeries(updatedSeries)
      },
      updateSeries(series) {
        this.$emit('update:series', series)
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